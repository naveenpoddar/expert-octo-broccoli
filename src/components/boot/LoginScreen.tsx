import { useState, KeyboardEvent } from 'react';
import { FaArrowRight, FaPowerOff, FaWheelchair } from 'react-icons/fa';
import { useWindowStore } from '../../stores/windowStore';

export function LoginScreen() {
  const { username, setSessionState } = useWindowStore();
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Mock authentication: allow any password/text
    setSessionState('desktop');
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  const handleShutdown = () => {
    setSessionState('shutdown');
  };

  return (
    <div className="win7-login-screen select-none">
      <div className="flex flex-col items-center justify-center mb-16">
        {/* Metallic Frame User Picture */}
        <div className="login-avatar-outer animate-fade-in">
          <div className="login-avatar-inner flex items-center justify-center">
            {/* Windows 7 Style Flower Profile Picture */}
            <svg viewBox="0 0 64 64" className="w-14 h-14" fill="currentColor">
              <circle cx="32" cy="32" r="8" fill="#facc15" />
              <circle cx="32" cy="18" r="6" fill="#fb7185" />
              <circle cx="32" cy="46" r="6" fill="#fb7185" />
              <circle cx="18" cy="32" r="6" fill="#60a5fa" />
              <circle cx="46" cy="32" r="6" fill="#60a5fa" />
              <circle cx="22" cy="22" r="6" fill="#f472b6" />
              <circle cx="42" cy="42" r="6" fill="#f472b6" />
              <circle cx="22" cy="42" r="6" fill="#34d399" />
              <circle cx="42" cy="22" r="6" fill="#34d399" />
            </svg>
          </div>
        </div>

        {/* Username */}
        <h1 className="text-xl font-normal text-white tracking-wide mb-4">
          {username}
        </h1>

        {/* Password input group */}
        <div className="flex flex-col items-center">
          <div className="login-input-group">
            <input
              type="password"
              className="login-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <button
              type="button"
              className="login-submit-btn"
              onClick={handleLogin}
              aria-label="Submit"
            >
              <FaArrowRight size={10} />
            </button>
          </div>
          <span className="text-[11px] text-blue-200 mt-3 opacity-80">
            Hint: press Enter or click the arrow to log in
          </span>
        </div>
      </div>

      {/* Lower bar buttons */}
      <div className="win7-login-bottom">
        <button
          type="button"
          className="login-bottom-btn"
          title="Ease of Access"
          aria-label="Ease of Access"
        >
          <FaWheelchair size={14} />
        </button>
        <button
          type="button"
          className="login-bottom-btn"
          onClick={handleShutdown}
          title="Shut down"
        >
          <FaPowerOff size={13} className="text-red-400 mr-1" />
          <span>Shut down</span>
        </button>
      </div>
    </div>
  );
}
