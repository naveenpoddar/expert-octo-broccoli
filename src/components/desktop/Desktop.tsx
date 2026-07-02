import type { ReactNode } from 'react';
import { useState } from 'react';
import { useWindowStore } from '../../stores/windowStore';
import { DesktopIcon, DesktopIconPosition } from './DesktopIcon';
import { Window } from './Window';
import { ComputerIcon, RecycleBinIcon, InternetExplorerIcon } from '../common/Win7Icons';

interface DesktopIconModel {
  id: string;
  label: string;
  appName: string;
  icon: ReactNode;
  position: DesktopIconPosition;
}

const initialIcons: DesktopIconModel[] = [
  { id: 'computer', label: 'Computer', appName: 'file-explorer', icon: <ComputerIcon className="w-full h-full" />, position: { x: 20, y: 20 } },
  { id: 'recycle-bin', label: 'Recycle Bin', appName: 'recycle-bin', icon: <RecycleBinIcon className="w-full h-full" />, position: { x: 20, y: 115 } },
  {
    id: 'internet-explorer',
    label: 'Internet Explorer',
    appName: 'internet-explorer',
    icon: <InternetExplorerIcon className="w-full h-full" />,
    position: { x: 20, y: 210 },
  },
];

export function Desktop() {
  const [icons, setIcons] = useState(initialIcons);
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  const { openWindows, openApp, setStartMenuOpen, snapPreview } = useWindowStore();

  const moveIcon = (id: string, position: DesktopIconPosition) => {
    setIcons((currentIcons) =>
      currentIcons.map((icon) => (icon.id === id ? { ...icon, position } : icon)),
    );
  };

  const handleDesktopClick = () => {
    setSelectedIconId(null);
    setStartMenuOpen(false);
  };

  return (
    <main
      className="win7-desktop relative h-screen w-screen overflow-hidden"
      onClick={handleDesktopClick}
    >
      {/* Curved glowing vectors of the Windows 7 default wallpaper */}
      <svg
        className="desktop-wallpaper-curves"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M 0,35 Q 25,60 70,30 T 100,45" fill="none" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="0.4" />
        <path d="M 0,42 Q 35,25 75,55 T 100,38" fill="none" stroke="rgba(135, 206, 250, 0.15)" strokeWidth="0.6" />
        <path d="M 0,50 Q 50,75 80,40 T 100,60" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.3" />
        <path d="M 0,60 Q 40,40 90,65 T 100,50" fill="none" stroke="rgba(135, 206, 250, 0.1)" strokeWidth="0.5" strokeDasharray="1, 0.5" />
      </svg>

      {/* Central Windows 7 Logo Wallpaper Flare */}
      <div className="absolute right-[22%] top-[33%] w-[260px] h-[260px] pointer-events-none opacity-[0.32] flex items-center justify-center select-none z-0">
        <svg
          viewBox="0 0 30 30"
          className="w-full h-full drop-shadow-[0_0_50px_rgba(135,206,250,0.45)]"
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
      </div>

      {/* Snap Preview Box Overlay */}
      {snapPreview && (
        <div
          className="snap-preview pointer-events-none"
          style={{
            left: snapPreview.x,
            top: snapPreview.y,
            width: snapPreview.width,
            height: snapPreview.height,
          }}
        />
      )}

      {/* Desktop Workspace */}
      <div className="absolute inset-0 bottom-[var(--win7-taskbar-height)]">
        {icons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            id={icon.id}
            label={icon.label}
            icon={icon.icon}
            position={icon.position}
            isSelected={selectedIconId === icon.id}
            onSelect={setSelectedIconId}
            onMove={moveIcon}
            onOpen={() => openApp(icon.appName, { title: icon.label })}
          />
        ))}

        {/* Windows Manager */}
        {openWindows.map((win) => (
          <Window key={win.id} window={win} />
        ))}
      </div>
    </main>
  );
}
