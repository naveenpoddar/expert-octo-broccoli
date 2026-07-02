import { useEffect, useState } from 'react';
import { AiFillWindows } from 'react-icons/ai';
import { FaCalculator, FaFolder, FaInternetExplorer, FaNetworkWired, FaRegFileAlt, FaVolumeUp } from 'react-icons/fa';
import { useWindowStore } from '../../stores/windowStore';
import { StartMenu } from '../start-menu/StartMenu';

const pinnedApps = [
  { appName: 'internet-explorer', label: 'Internet Explorer', icon: <FaInternetExplorer /> },
  { appName: 'file-explorer', label: 'Windows Explorer', icon: <FaFolder /> },
  { appName: 'notepad', label: 'Notepad', icon: <FaRegFileAlt /> },
  { appName: 'calculator', label: 'Calculator', icon: <FaCalculator /> },
];

export function Taskbar() {
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [now, setNow] = useState(new Date());
  const { openWindows, openApp, focusWindow } = useWindowStore();

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <StartMenu isOpen={isStartOpen} />
      <footer className="taskbar aero-glass" onClick={(event) => event.stopPropagation()}>
        <button
          className={`start-orb ${isStartOpen ? 'start-orb-active' : ''}`}
          type="button"
          aria-label="Start"
          onClick={() => setIsStartOpen((open) => !open)}
        >
          <AiFillWindows />
        </button>

        <nav className="taskbar-apps" aria-label="Taskbar applications">
          {pinnedApps.map((app) => {
            const runningWindow = openWindows.find((window) => window.appName === app.appName);
            return (
              <button
                key={app.appName}
                className={`taskbar-icon ${runningWindow ? 'taskbar-icon-running' : ''}`}
                type="button"
                title={app.label}
                onClick={() => {
                  if (runningWindow) focusWindow(runningWindow.id);
                  else openApp(app.appName, { title: app.label });
                }}
              >
                {app.icon}
              </button>
            );
          })}
        </nav>

        <section className="system-tray" aria-label="System tray">
          <FaNetworkWired />
          <FaVolumeUp />
          <time dateTime={now.toISOString()}>
            <span>{now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span>
            <span>{now.toLocaleDateString()}</span>
          </time>
        </section>
      </footer>
    </>
  );
}
