import { PointerEvent, ReactNode, useRef, useState } from 'react';

export interface DesktopIconPosition {
  x: number;
  y: number;
}

interface DesktopIconProps {
  id: string;
  label: string;
  icon: ReactNode;
  position: DesktopIconPosition;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onMove: (id: string, position: DesktopIconPosition) => void;
  onOpen: () => void;
}

export function DesktopIcon({
  id,
  label,
  icon,
  position,
  isSelected,
  onSelect,
  onMove,
  onOpen,
}: DesktopIconProps) {
  const dragStart = useRef<{ pointerX: number; pointerY: number; iconX: number; iconY: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    onSelect(id);
    dragStart.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      iconX: position.x,
      iconY: position.y,
    };
  };

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!dragStart.current) return;

    const nextPosition = {
      x: Math.max(8, dragStart.current.iconX + event.clientX - dragStart.current.pointerX),
      y: Math.max(8, dragStart.current.iconY + event.clientY - dragStart.current.pointerY),
    };

    setIsDragging(true);
    onMove(id, nextPosition);
  };

  const handlePointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.currentTarget.releasePointerCapture(event.pointerId);
    dragStart.current = null;
    window.setTimeout(() => setIsDragging(false), 0);
  };

  return (
    <button
      className={`desktop-icon ${isSelected ? 'desktop-icon-selected' : ''}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      type="button"
      onClick={() => onSelect(id)}
      onDoubleClick={() => {
        if (!isDragging) onOpen();
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <span className="desktop-icon-image" aria-hidden="true">
        {icon}
      </span>
      <span className="desktop-icon-label">{label}</span>
    </button>
  );
}
