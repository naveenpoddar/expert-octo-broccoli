import { useEffect } from 'react';
import { useWindowStore } from '../../stores/windowStore';

export function ShutdownScreen() {
  const setSessionState = useWindowStore((state) => state.setSessionState);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      // Auto-reboot after a few seconds of shutdown
      setSessionState('booting');
    }, 3000);
    return () => window.clearTimeout(timer);
  }, [setSessionState]);

  return (
    <div className="win7-shutdown-screen select-none">
      <div className="flex flex-col items-center">
        <div className="shutdown-spinner" />
        <span className="text-xl font-light text-white tracking-wide">
          Shutting down...
        </span>
      </div>
    </div>
  );
}
