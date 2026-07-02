import { MouseEvent, TouchEvent, useState } from 'react';
import { Rnd } from 'react-rnd';
import { useWindowStore, OpenWindow } from '../../stores/windowStore';
import { FolderIcon, NotepadIcon, CalculatorIcon, InternetExplorerIcon } from '../common/Win7Icons';
import { Notepad } from '../apps/Notepad';
import { Calculator } from '../apps/Calculator';
import { InternetExplorer } from '../apps/InternetExplorer';
import { FileExplorer } from '../apps/FileExplorer';

interface WindowProps {
  window: OpenWindow;
}

const getAppIcon = (appName: string) => {
  switch (appName) {
    case 'internet-explorer':
      return <InternetExplorerIcon className="w-4 h-4" />;
    case 'notepad':
      return <NotepadIcon className="w-4 h-4" />;
    case 'calculator':
      return <CalculatorIcon className="w-4 h-4" />;
    case 'file-explorer':
    default:
      return <FolderIcon className="w-4 h-4" />;
  }
};

const renderAppContent = (appName: string, windowId: string) => {
  switch (appName) {
    case 'notepad':
      return <Notepad windowId={windowId} />;
    case 'calculator':
      return <Calculator />;
    case 'internet-explorer':
      return <InternetExplorer />;
    case 'file-explorer':
      return <FileExplorer windowId={windowId} />;
    default:
      return (
        <div className="flex-1 flex flex-col justify-center items-center text-slate-400 bg-white p-4">
          <span className="text-lg font-semibold capitalize">{appName.replace('-', ' ')}</span>
          <span className="text-xs mt-1">Application UI placeholder</span>
        </div>
      );
  }
};

export function Window({ window: win }: WindowProps) {
  const {
    focusWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    closeApp,
    updateWindowDimensions,
    setSnapPreview,
  } = useWindowStore();

  const [preSnapBounds, setPreSnapBounds] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  // If minimized, do not render to simplify mounting and coordinate tracking
  if (win.isMinimized) {
    return null;
  }

  const handlePointerDown = () => {
    focusWindow(win.id);
  };

  const handleTitleDoubleClick = () => {
    if (win.isMaximized) {
      restoreWindow(win.id);
    } else {
      maximizeWindow(win.id);
    }
  };

  const getClientCoords = (e: any) => {
    let clientX = 0;
    let clientY = 0;
    if (e.clientX !== undefined) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else if (e.touches && e.touches[0]) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
    return { clientX, clientY };
  };

  const handleDrag = (e: any) => {
    const { clientX, clientY } = getClientCoords(e);
    
    // Check if dragging near edges for Aero Snap preview
    if (clientX < 15) {
      // Snap Left Preview
      setSnapPreview({
        x: 0,
        y: 0,
        width: globalThis.innerWidth / 2,
        height: globalThis.innerHeight - 40,
      });
    } else if (clientX > globalThis.innerWidth - 15) {
      // Snap Right Preview
      setSnapPreview({
        x: globalThis.innerWidth / 2,
        y: 0,
        width: globalThis.innerWidth / 2,
        height: globalThis.innerHeight - 40,
      });
    } else if (clientY < 15) {
      // Maximize Snap Preview
      setSnapPreview({
        x: 0,
        y: 0,
        width: globalThis.innerWidth,
        height: globalThis.innerHeight - 40,
      });
    } else {
      setSnapPreview(null);
    }
  };

  const handleDragStop = (e: any, d: any) => {
    const { clientX, clientY } = getClientCoords(e);
    setSnapPreview(null);

    if (clientX < 15) {
      // Snap Left
      setPreSnapBounds({ x: win.x, y: win.y, width: win.width, height: win.height });
      updateWindowDimensions(win.id, {
        x: 0,
        y: 0,
        width: globalThis.innerWidth / 2,
        height: globalThis.innerHeight - 40,
      });
    } else if (clientX > globalThis.innerWidth - 15) {
      // Snap Right
      setPreSnapBounds({ x: win.x, y: win.y, width: win.width, height: win.height });
      updateWindowDimensions(win.id, {
        x: globalThis.innerWidth / 2,
        y: 0,
        width: globalThis.innerWidth / 2,
        height: globalThis.innerHeight - 40,
      });
    } else if (clientY < 15) {
      // Snap Top (Maximize)
      maximizeWindow(win.id);
    } else {
      // Normal Drag Stop
      updateWindowDimensions(win.id, { x: d.x, y: d.y });
    }
  };

  // Rendering for Maximized Window (standard absolute div for performance and bug-free snapping)
  if (win.isMaximized) {
    return (
      <div
        className="win7-window maximized fixed inset-0 bottom-[40px] flex flex-col"
        style={{ zIndex: win.zIndex }}
        onMouseDown={handlePointerDown}
      >
        {/* Titlebar */}
        <div
          className="win7-window-titlebar select-none"
          onDoubleClick={handleTitleDoubleClick}
        >
          <span className="mr-2 text-sm">{getAppIcon(win.appName)}</span>
          <span className="win7-window-title">{win.title}</span>
          
          <div className="win7-window-controls">
            <button
              className="win7-window-btn btn-minimize"
              onClick={() => minimizeWindow(win.id)}
              title="Minimize"
              type="button"
            >
              <svg viewBox="0 0 10 10" className="w-[10px] h-[10px]"><path d="M 1,6.5 L 9,6.5" stroke="currentColor" strokeWidth="1.4" /></svg>
            </button>
            <button
              className="win7-window-btn btn-maximize"
              onClick={() => restoreWindow(win.id)}
              title="Restore Down"
              type="button"
            >
              <svg viewBox="0 0 10 10" className="w-[10px] h-[10px]"><path d="M 3,3 L 3,1 L 9,1 L 9,7 L 7,7 M 1,3 L 7,3 L 7,9 L 1,9 Z" fill="none" stroke="currentColor" strokeWidth="1" /></svg>
            </button>
            <button
              className="win7-window-btn btn-close"
              onClick={() => closeApp(win.id)}
              title="Close"
              type="button"
            >
              <svg viewBox="0 0 10 10" className="w-[9px] h-[9px]"><path d="M 1.5,1.5 L 8.5,8.5 M 8.5,1.5 L 1.5,8.5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="win7-window-body flex-1 flex flex-col overflow-hidden">
          {renderAppContent(win.appName, win.id)}
        </div>
      </div>
    );
  }

  // Normal draggable/resizable window chrome using react-rnd
  return (
    <Rnd
      size={{ width: win.width, height: win.height }}
      position={{ x: win.x, y: win.y }}
      onDrag={handleDrag}
      onDragStop={handleDragStop}
      onResizeStop={(e, direction, ref, delta, position) => {
        updateWindowDimensions(win.id, {
          width: ref.offsetWidth,
          height: ref.offsetHeight,
          ...position,
        });
      }}
      dragHandleClassName="win7-window-titlebar"
      minWidth={320}
      minHeight={200}
      bounds="parent"
      style={{ zIndex: win.zIndex }}
      onMouseDown={handlePointerDown}
      className="win7-window"
    >
      <div className="flex flex-col h-full w-full">
        {/* Titlebar */}
        <div
          className="win7-window-titlebar select-none"
          onDoubleClick={handleTitleDoubleClick}
        >
          <span className="mr-2 text-sm">{getAppIcon(win.appName)}</span>
          <span className="win7-window-title">{win.title}</span>
          
          <div className="win7-window-controls">
            <button
              className="win7-window-btn btn-minimize"
              onClick={() => minimizeWindow(win.id)}
              title="Minimize"
              type="button"
            >
              <svg viewBox="0 0 10 10" className="w-[10px] h-[10px]"><path d="M 1,6.5 L 9,6.5" stroke="currentColor" strokeWidth="1.4" /></svg>
            </button>
            <button
              className="win7-window-btn btn-maximize"
              onClick={() => maximizeWindow(win.id)}
              title="Maximize"
              type="button"
            >
              <svg viewBox="0 0 10 10" className="w-[9px] h-[9px]"><rect x="1.5" y="1.5" width="7" height="7" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
            </button>
            <button
              className="win7-window-btn btn-close"
              onClick={() => closeApp(win.id)}
              title="Close"
              type="button"
            >
              <svg viewBox="0 0 10 10" className="w-[9px] h-[9px]"><path d="M 1.5,1.5 L 8.5,8.5 M 8.5,1.5 L 1.5,8.5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="win7-window-body flex-1 flex flex-col overflow-hidden">
          {renderAppContent(win.appName, win.id)}
        </div>
      </div>
    </Rnd>
  );
}
