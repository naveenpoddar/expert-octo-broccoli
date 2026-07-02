import { create } from 'zustand';

export type WindowId = string;

export type AppName = 'notepad' | 'internet-explorer' | 'calculator' | 'file-explorer' | (string & {});

export interface WindowBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface OpenWindow extends WindowBounds {
  id: WindowId;
  appName: AppName;
  title: string;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  restoreBounds?: WindowBounds;
}

interface OpenAppOptions {
  id?: WindowId;
  title?: string;
  bounds?: Partial<WindowBounds>;
}

interface WindowStoreState {
  openWindows: OpenWindow[];
  nextZIndex: number;
  openApp: (appName: AppName, options?: OpenAppOptions) => WindowId;
  closeApp: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  maximizeWindow: (id: WindowId, viewport?: Pick<WindowBounds, 'width' | 'height'>) => void;
  restoreWindow: (id: WindowId) => void;
  updateWindowDimensions: (id: WindowId, bounds: Partial<WindowBounds>) => void;
}

const DEFAULT_WINDOW_BOUNDS: WindowBounds = {
  x: 120,
  y: 90,
  width: 720,
  height: 460,
};

const createWindowId = (appName: AppName) => `${appName}-${crypto.randomUUID()}`;

const resolveTitle = (appName: AppName, title?: string) => {
  if (title) return title;

  return appName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const bringToFront = (windows: OpenWindow[], id: WindowId, zIndex: number) =>
  windows.map((window) =>
    window.id === id
      ? {
          ...window,
          zIndex,
          isMinimized: false,
        }
      : window,
  );

export const useWindowStore = create<WindowStoreState>((set, get) => ({
  openWindows: [],
  nextZIndex: 10,

  openApp: (appName, options) => {
    const existingWindow = options?.id
      ? get().openWindows.find((window) => window.id === options.id)
      : undefined;

    if (existingWindow) {
      get().focusWindow(existingWindow.id);
      return existingWindow.id;
    }

    const id = options?.id ?? createWindowId(appName);
    const zIndex = get().nextZIndex;
    const windowOffset = get().openWindows.length * 24;
    const bounds = {
      ...DEFAULT_WINDOW_BOUNDS,
      x: DEFAULT_WINDOW_BOUNDS.x + windowOffset,
      y: DEFAULT_WINDOW_BOUNDS.y + windowOffset,
      ...options?.bounds,
    };

    set((state) => ({
      openWindows: [
        ...state.openWindows,
        {
          id,
          appName,
          title: resolveTitle(appName, options?.title),
          zIndex,
          isMinimized: false,
          isMaximized: false,
          ...bounds,
        },
      ],
      nextZIndex: zIndex + 1,
    }));

    return id;
  },

  closeApp: (id) => {
    set((state) => ({
      openWindows: state.openWindows.filter((window) => window.id !== id),
    }));
  },

  focusWindow: (id) => {
    const zIndex = get().nextZIndex;
    set((state) => ({
      openWindows: bringToFront(state.openWindows, id, zIndex),
      nextZIndex: zIndex + 1,
    }));
  },

  minimizeWindow: (id) => {
    set((state) => ({
      openWindows: state.openWindows.map((window) =>
        window.id === id ? { ...window, isMinimized: true } : window,
      ),
    }));
  },

  maximizeWindow: (id, viewport) => {
    set((state) => ({
      openWindows: state.openWindows.map((window) => {
        if (window.id !== id || window.isMaximized) return window;

        return {
          ...window,
          x: 0,
          y: 0,
          width: viewport?.width ?? globalThis.innerWidth,
          height: viewport?.height ?? globalThis.innerHeight - 40,
          isMaximized: true,
          isMinimized: false,
          restoreBounds: {
            x: window.x,
            y: window.y,
            width: window.width,
            height: window.height,
          },
        };
      }),
    }));
    get().focusWindow(id);
  },

  restoreWindow: (id) => {
    set((state) => ({
      openWindows: state.openWindows.map((window) => {
        if (window.id !== id) return window;
        const restoredBounds = window.restoreBounds ?? window;

        return {
          ...window,
          ...restoredBounds,
          isMaximized: false,
          isMinimized: false,
          restoreBounds: undefined,
        };
      }),
    }));
    get().focusWindow(id);
  },

  updateWindowDimensions: (id, bounds) => {
    set((state) => ({
      openWindows: state.openWindows.map((window) =>
        window.id === id
          ? {
              ...window,
              ...bounds,
              isMaximized: false,
            }
          : window,
      ),
    }));
  },
}));
