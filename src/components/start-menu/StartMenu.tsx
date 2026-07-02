import { FaChevronRight, FaFolder, FaMusic, FaPowerOff, FaSearch, FaUserCircle } from 'react-icons/fa';
import { useWindowStore } from '../../stores/windowStore';

interface StartMenuProps {
  isOpen: boolean;
}

const pinnedApps = [
  { appName: 'internet-explorer', label: 'Internet Explorer', description: 'Browse the Internet' },
  { appName: 'notepad', label: 'Notepad', description: 'Create a text document' },
  { appName: 'calculator', label: 'Calculator', description: 'Perform basic arithmetic' },
  { appName: 'file-explorer', label: 'Windows Explorer', description: 'Open files and folders' },
];

const rightLinks = ['Documents', 'Pictures', 'Music', 'Computer', 'Control Panel', 'Devices and Printers', 'Default Programs', 'Help and Support'];

export function StartMenu({ isOpen }: StartMenuProps) {
  const openApp = useWindowStore((state) => state.openApp);

  if (!isOpen) return null;

  return (
    <section className="start-menu aero-glass aero-panel-strong" aria-label="Start menu">
      <div className="start-menu-left">
        <ul className="start-menu-app-list">
          {pinnedApps.map((app) => (
            <li key={app.appName}>
              <button
                type="button"
                className="start-menu-app"
                onClick={() => openApp(app.appName, { title: app.label })}
              >
                <span className="start-menu-app-icon"><FaFolder /></span>
                <span>
                  <strong>{app.label}</strong>
                  <small>{app.description}</small>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <button className="all-programs" type="button">
          All Programs <FaChevronRight />
        </button>
        <label className="start-search aero-inset">
          <input type="search" placeholder="Search programs and files" />
          <FaSearch aria-hidden="true" />
        </label>
      </div>

      <aside className="start-menu-right">
        <div className="start-user">
          <FaUserCircle />
          <span>Codex User</span>
        </div>
        <nav aria-label="Windows locations">
          {rightLinks.map((link) => (
            <button key={link} type="button" className="start-link">
              {link === 'Music' ? <FaMusic /> : <FaFolder />}
              {link}
            </button>
          ))}
        </nav>
        <div className="shutdown-row">
          <button className="shutdown-button" type="button"><FaPowerOff /> Shut down</button>
          <button className="shutdown-arrow" type="button"><FaChevronRight /></button>
        </div>
      </aside>
    </section>
  );
}
