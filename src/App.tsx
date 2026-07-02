import { useWindowStore } from './stores/windowStore';
import { BootScreen } from './components/boot/BootScreen';
import { LoginScreen } from './components/boot/LoginScreen';
import { ShutdownScreen } from './components/boot/ShutdownScreen';
import { Desktop } from './components/desktop/Desktop';
import { Taskbar } from './components/taskbar/Taskbar';

function App() {
  const sessionState = useWindowStore((state) => state.sessionState);

  switch (sessionState) {
    case 'booting':
      return <BootScreen />;
    case 'login':
      return <LoginScreen />;
    case 'shutdown':
      return <ShutdownScreen />;
    case 'desktop':
    default:
      return (
        <>
          <Desktop />
          <Taskbar />
        </>
      );
  }
}

export default App;
