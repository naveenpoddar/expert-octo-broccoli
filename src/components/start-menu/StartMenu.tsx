import { useState, useRef, useEffect } from 'react';
import { FaChevronRight, FaSearch } from 'react-icons/fa';
import { useWindowStore } from '../../stores/windowStore';
import { FolderIcon, NotepadIcon, CalculatorIcon, InternetExplorerIcon } from '../common/Win7Icons';

interface StartMenuProps {
  isOpen: boolean;
}

const pinnedApps = [
  { appName: 'internet-explorer', label: 'Internet Explorer', description: 'Browse the Internet', icon: <InternetExplorerIcon className="w-8 h-8" /> },
  { appName: 'notepad', label: 'Notepad', description: 'Create a text document', icon: <NotepadIcon className="w-8 h-8" /> },
  { appName: 'calculator', label: 'Calculator', description: 'Perform basic arithmetic', icon: <CalculatorIcon className="w-8 h-8" /> },
  { appName: 'file-explorer', label: 'Windows Explorer', description: 'Open files and folders', icon: <FolderIcon className="w-8 h-8" /> },
];

const rightLinks = [
  { label: 'Documents', app: 'file-explorer' },
  { label: 'Pictures', app: 'file-explorer' },
  { label: 'Music', app: 'file-explorer' },
  { label: 'Games', app: 'file-explorer' },
  { label: 'separator-1', isSeparator: true },
  { label: 'Computer', app: 'file-explorer' },
  { label: 'Control Panel', app: 'file-explorer' },
  { label: 'Devices and Printers', app: 'file-explorer' },
  { label: 'Default Programs', app: 'file-explorer' },
  { label: 'Help and Support', app: 'file-explorer' },
];

export function StartMenu({ isOpen }: StartMenuProps) {
  const { openApp, username, setSessionState, logout } = useWindowStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showShutdownDropdown, setShowShutdownDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowShutdownDropdown(false);
      }
    };
    if (showShutdownDropdown) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [showShutdownDropdown]);

  // Reset search when menu closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setShowShutdownDropdown(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredApps = pinnedApps.filter((app) =>
    app.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleRightLinkClick = (label: string, appName: string) => {
    openApp(appName, { title: label });
  };

  return (
    <section
      className="start-menu aero-glass aero-panel-strong select-none"
      aria-label="Start menu"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Left side: apps & search */}
      <div className="start-menu-left">
        <ul className="start-menu-app-list">
          {filteredApps.length > 0 ? (
            filteredApps.map((app) => (
              <li key={app.appName}>
                <button
                  type="button"
                  className="start-menu-app"
                  onClick={() => openApp(app.appName, { title: app.label })}
                >
                  <span className="start-menu-app-icon">{app.icon}</span>
                  <span>
                    <strong>{app.label}</strong>
                    <small>{app.description}</small>
                  </span>
                </button>
              </li>
            ))
          ) : (
            <li className="p-3 text-[11.5px] text-slate-500 text-center italic">
              No programs match your search.
            </li>
          )}
        </ul>

        <button className="all-programs" type="button">
          All Programs <FaChevronRight className="text-[10px] text-sky-600" />
        </button>

        <label className="start-search aero-inset">
          <input
            type="search"
            placeholder="Search programs and files"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          <FaSearch aria-hidden="true" />
        </label>
      </div>

      {/* Right side: navigation */}
      <aside className="start-menu-right relative pt-2">
        {/* Windows 7 Frame-Overlapping User Avatar */}
        <div className="absolute top-[-26px] right-[12px] w-[48px] h-[48px] bg-white rounded-[2px] border-[2px] border-[#cbd5e1] shadow-[0_2px_5px_rgba(0,0,0,0.65)] overflow-hidden z-10 flex items-center justify-center">
          {/* Detailed Windows 7 Orange Flower SVG avatar */}
          <svg viewBox="0 0 48 48" className="w-full h-full" fill="currentColor">
            <rect width="48" height="48" fill="#fffbeb" />
            <circle cx="24" cy="24" r="7" fill="#f97316" />
            <circle cx="24" cy="13" r="5.5" fill="#fcd34d" />
            <circle cx="24" cy="35" r="5.5" fill="#fcd34d" />
            <circle cx="13" cy="24" r="5.5" fill="#fcd34d" />
            <circle cx="35" cy="24" r="5.5" fill="#fcd34d" />
            <circle cx="16.5" cy="16.5" r="5.5" fill="#fb923c" />
            <circle cx="31.5" cy="31.5" r="5.5" fill="#fb923c" />
            <circle cx="16.5" cy="31.5" r="5.5" fill="#fb923c" />
            <circle cx="31.5" cy="16.5" r="5.5" fill="#fb923c" />
            {/* Soft flower center detail */}
            <circle cx="24" cy="24" r="2.5" fill="#f59e0b" />
          </svg>
        </div>

        {/* Shortcuts list (Username first in bold, followed by a separator) */}
        <nav className="start-links-container mt-1.5" aria-label="Windows shortcuts">
          {/* Username link (no folder icon) */}
          <button
            type="button"
            className="start-link font-bold text-slate-100 text-xs pb-1"
            onClick={() => openApp('file-explorer', { title: username })}
          >
            <span>{username}</span>
          </button>
          
          <div className="start-link-separator" />

          {/* Shortcut links (no folder icons, clean text style matching Win7) */}
          {rightLinks.map((link) => {
            if (link.isSeparator) {
              return <div key={link.label} className="start-link-separator" />;
            }
            return (
              <button
                key={link.label}
                type="button"
                className="start-link text-slate-200"
                onClick={() => handleRightLinkClick(link.label, link.app!)}
              >
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Shutdown Control Row */}
        <div className="shutdown-row relative" ref={dropdownRef}>
          <button
            className="shutdown-button"
            type="button"
            onClick={() => setSessionState('shutdown')}
          >
            <span>Shut down</span>
          </button>
          
          <button
            className="shutdown-arrow"
            type="button"
            onClick={() => setShowShutdownDropdown(!showShutdownDropdown)}
            aria-haspopup="true"
            aria-expanded={showShutdownDropdown}
            aria-label="Shutdown options"
          >
            <FaChevronRight className="text-[8px] transform rotate-90" />
          </button>

          {/* Context Options Dropdown */}
          {showShutdownDropdown && (
            <div className="shutdown-menu-dropdown" role="menu">
              <button
                className="shutdown-menu-item"
                role="menuitem"
                type="button"
                onClick={() => setSessionState('booting')}
              >
                Restart
              </button>
              <button
                className="shutdown-menu-item"
                role="menuitem"
                type="button"
                onClick={() => logout()}
              >
                Log off
              </button>
            </div>
          )}
        </div>
      </aside>
    </section>
  );
}
