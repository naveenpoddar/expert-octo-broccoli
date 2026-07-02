import type { ReactNode } from 'react';
import { useState } from 'react';
import { FaDesktop, FaInternetExplorer, FaRecycle } from 'react-icons/fa';
import { useWindowStore } from '../../stores/windowStore';
import { DesktopIcon, DesktopIconPosition } from './DesktopIcon';

interface DesktopIconModel {
  id: string;
  label: string;
  appName: string;
  icon: ReactNode;
  position: DesktopIconPosition;
}

const initialIcons: DesktopIconModel[] = [
  { id: 'computer', label: 'Computer', appName: 'file-explorer', icon: <FaDesktop />, position: { x: 24, y: 24 } },
  { id: 'recycle-bin', label: 'Recycle Bin', appName: 'recycle-bin', icon: <FaRecycle />, position: { x: 24, y: 118 } },
  {
    id: 'internet-explorer',
    label: 'Internet Explorer',
    appName: 'internet-explorer',
    icon: <FaInternetExplorer />,
    position: { x: 24, y: 212 },
  },
];

export function Desktop() {
  const [icons, setIcons] = useState(initialIcons);
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  const openApp = useWindowStore((state) => state.openApp);

  const moveIcon = (id: string, position: DesktopIconPosition) => {
    setIcons((currentIcons) =>
      currentIcons.map((icon) => (icon.id === id ? { ...icon, position } : icon)),
    );
  };

  return (
    <main className="win7-desktop relative h-screen w-screen overflow-hidden" onClick={() => setSelectedIconId(null)}>
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
      </div>
    </main>
  );
}
