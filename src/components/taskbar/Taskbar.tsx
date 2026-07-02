import { useEffect, useState, useRef } from 'react';
import { FaNetworkWired, FaVolumeUp } from 'react-icons/fa';
import { useWindowStore } from '../../stores/windowStore';
import { StartMenu } from '../start-menu/StartMenu';
import { FolderIcon, NotepadIcon, CalculatorIcon, InternetExplorerIcon } from '../common/Win7Icons';

const pinnedApps = [
  { appName: 'internet-explorer', label: 'Internet Explorer', icon: <InternetExplorerIcon className="w-6 h-6" /> },
  { appName: 'file-explorer', label: 'Windows Explorer', icon: <FolderIcon className="w-6 h-6" /> },
  { appName: 'notepad', label: 'Notepad', icon: <NotepadIcon className="w-6 h-6" /> },
  { appName: 'calculator', label: 'Calculator', icon: <CalculatorIcon className="w-6 h-6" /> },
];

export function Taskbar() {
  const [now, setNow] = useState(new Date());
  const [showVolumePopup, setShowVolumePopup] = useState(false);
  const [volume, setVolume] = useState(70);
  const [showNetworkPopup, setShowNetworkPopup] = useState(false);
  
  const volumeRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<HTMLDivElement>(null);

  const {
    openWindows,
    openApp,
    focusWindow,
    minimizeWindow,
    restoreWindow,
    isStartMenuOpen,
    setStartMenuToggle,
    setStartMenuOpen,
  } = useWindowStore();

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  // Close popups on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (volumeRef.current && !volumeRef.current.contains(e.target as Node)) {
        setShowVolumePopup(false);
      }
      if (networkRef.current && !networkRef.current.contains(e.target as Node)) {
        setShowNetworkPopup(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  // Determine if a window is currently active/focused
  const isWindowActive = (windowId: string) => {
    const activeWindow = [...openWindows]
      .filter((w) => !w.isMinimized)
      .sort((a, b) => b.zIndex - a.zIndex)[0];
    return activeWindow?.id === windowId;
  };

  const handleAppIconClick = (appName: string, label: string) => {
    const runningWindow = openWindows.find((window) => window.appName === appName);
    
    if (runningWindow) {
      if (isWindowActive(runningWindow.id)) {
        minimizeWindow(runningWindow.id);
      } else {
        if (runningWindow.isMinimized) {
          restoreWindow(runningWindow.id);
        } else {
          focusWindow(runningWindow.id);
        }
      }
    } else {
      openApp(appName, { title: label });
    }
  };

  const handleShowDesktop = () => {
    // If any window is not minimized, minimize all. Otherwise, restore all.
    const hasVisibleWindows = openWindows.some((w) => !w.isMinimized);
    if (hasVisibleWindows) {
      openWindows.forEach((w) => {
        if (!w.isMinimized) minimizeWindow(w.id);
      });
    } else {
      openWindows.forEach((w) => {
        restoreWindow(w.id);
      });
    }
    setStartMenuOpen(false);
  };

  return (
    <>
      <StartMenu isOpen={isStartMenuOpen} />
      
      <footer
        className="taskbar aero-glass select-none"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Glowing Windows 7 Start Orb */}
        <div
          className={`start-orb-container ${isStartMenuOpen ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setStartMenuToggle();
          }}
          title="Start"
        >
          <button className="start-orb-btn" type="button" aria-label="Start">
            <svg
              viewBox="0 0 30 30"
              className="w-[24px] h-[24px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)]"
              aria-hidden="true"
            >
              <g transform="scale(0.42) translate(-25.8, -984.8)">
                <path
                  d="m 84.39329,999.06515 c -8.849786,3.65895 -13.104844,1.60195 -16.939961,-0.97894 l -4.365832,15.14349 c 3.831335,2.5957 8.456845,4.7299 16.947474,0.9287 z"
                  fill="#60bf3a"
                />
                <path
                  d="m 55.623316,1029.5081 c -3.843649,-2.5869 -8.022061,-4.7146 -16.89277,-1.0466 l 4.343573,-15.172 c 8.872604,-3.6686 13.134982,-1.5925 16.97485,1.0102 l -4.425653,15.208 z"
                  fill="#008cef"
                />
                <path
                  d="m 60.786525,1011.5609 c -2.314025,-1.5582 -4.802742,-3.0127 -8.337203,-3.0395 -2.331983,-0.018 -5.107948,0.6445 -8.632,2.1016 l 4.367294,-15.13273 c 8.86661,-3.6662 13.125449,-1.59132 16.962662,1.00951 z"
                  fill="#f34b3e"
                />
                <path
                  d="m 62.351258,1015.7594 c 3.838878,2.5847 8.103036,4.6435 16.962231,0.9816 l -4.366727,15.0826 c -8.860753,3.6646 -13.116042,1.5893 -16.950937,-1.0112 z"
                  fill="#fbc625"
                />
              </g>
            </svg>
          </button>
        </div>

        {/* Taskbar Apps List (Pinned & Open) */}
        <nav className="taskbar-apps" aria-label="Taskbar applications">
          {pinnedApps.map((app) => {
            const runningWindow = openWindows.find((window) => window.appName === app.appName);
            const isRunning = !!runningWindow;
            const isActive = runningWindow ? isWindowActive(runningWindow.id) : false;

            return (
              <button
                key={app.appName}
                className={`taskbar-icon ${
                  isActive
                    ? 'taskbar-icon-active'
                    : isRunning
                    ? 'taskbar-icon-running'
                    : ''
                }`}
                type="button"
                title={app.label}
                onClick={() => handleAppIconClick(app.appName, app.label)}
              >
                {app.icon}
              </button>
            );
          })}
        </nav>

        {/* System Tray (Clock, Volume, Network) */}
        <section className="system-tray relative" aria-label="System tray">
          {/* Network Connection Icon and Popup */}
          <div ref={networkRef} className="relative flex items-center">
            <FaNetworkWired
              className="system-tray-icon cursor-pointer text-emerald-400"
              title="Internet Access"
              onClick={(e) => {
                e.stopPropagation();
                setShowNetworkPopup(!showNetworkPopup);
                setShowVolumePopup(false);
              }}
            />
            {showNetworkPopup && (
              <div className="absolute bottom-10 right-[-40px] w-56 p-3 bg-white text-slate-800 rounded border border-slate-400 shadow-xl z-50 text-xs">
                <div className="font-semibold pb-1.5 border-b border-slate-200 mb-1.5 flex justify-between">
                  <span>Currently connected to:</span>
                  <span className="text-emerald-600 font-bold">Active</span>
                </div>
                <div className="flex items-center gap-2 py-1">
                  <FaNetworkWired className="text-emerald-500 text-sm" />
                  <div>
                    <div className="font-medium text-slate-700">Network 3</div>
                    <div className="text-[10px] text-slate-500">Internet access</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Volume Control Icon and Popup */}
          <div ref={volumeRef} className="relative flex items-center">
            <FaVolumeUp
              className="system-tray-icon cursor-pointer"
              title={`Speakers: ${volume}%`}
              onClick={(e) => {
                e.stopPropagation();
                setShowVolumePopup(!showVolumePopup);
                setShowNetworkPopup(false);
              }}
            />
            {showVolumePopup && (
              <div className="absolute bottom-10 right-[-10px] w-14 h-36 p-2.5 bg-white text-slate-800 rounded border border-slate-400 shadow-xl z-50 flex flex-col items-center justify-between">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-1.5 h-20 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  style={{ writingMode: 'bt-lr', WebkitAppearance: 'slider-vertical' } as any}
                />
                <span className="text-[10px] font-semibold text-slate-600 mt-1">{volume}</span>
              </div>
            )}
          </div>

          {/* Live Date Time Display */}
          <time dateTime={now.toISOString()} className="cursor-default select-none">
            <span>{now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span>
            <span>{now.toLocaleDateString()}</span>
          </time>
        </section>

        {/* Classic Windows 7 Aero Peek Show Desktop bar */}
        <button
          className="show-desktop-btn"
          type="button"
          onClick={handleShowDesktop}
          title="Show desktop"
          aria-label="Show desktop"
        />
      </footer>
    </>
  );
}
