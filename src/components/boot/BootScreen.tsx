import { useEffect } from 'react';
import { useWindowStore } from '../../stores/windowStore';

export function BootScreen() {
  const setSessionState = useWindowStore((state) => state.setSessionState);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSessionState('login');
    }, 4500);
    return () => window.clearTimeout(timer);
  }, [setSessionState]);

  return (
    <div className="win7-boot-screen select-none">
      <div className="boot-logo-container">
        <div className="boot-orb red" />
        <div className="boot-orb green" />
        <div className="boot-orb blue" />
        <div className="boot-orb yellow" />
        
        <svg
          viewBox="38.5 996 46 49"
          className="boot-windows-logo"
          aria-hidden="true"
        >
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
        </svg>
      </div>
      
      <div className="boot-text">
        Starting Windows
      </div>
    </div>
  );
}
