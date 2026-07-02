import { useState, useEffect, useRef } from 'react';
import { useWindowStore } from '../../stores/windowStore';

interface NotepadProps {
  windowId: string;
}

export function Notepad({ windowId }: NotepadProps) {
  const { openWindows, closeApp, updateWindowData } = useWindowStore();
  const currentWindow = openWindows.find((w) => w.id === windowId);

  // Initialize text content from window store data if present
  const [text, setText] = useState<string>(currentWindow?.data?.text ?? '');
  const [wordWrap, setWordWrap] = useState<boolean>(true);
  const [activeMenu, setActiveMenu] = useState<'file' | 'edit' | 'format' | 'view' | 'help' | null>(null);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Keep state in sync with store
  useEffect(() => {
    updateWindowData(windowId, { ...currentWindow?.data, text });
  }, [text, windowId]);

  // Sync if store changes externally (e.g. File Explorer opens a new file in same window)
  useEffect(() => {
    if (currentWindow?.data?.text !== undefined && currentWindow.data.text !== text) {
      setText(currentWindow.data.text);
    }
  }, [currentWindow?.data?.text]);

  // Close menus on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const handleMenuClick = (menu: 'file' | 'edit' | 'format' | 'view' | 'help') => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  // Notepad Actions
  const handleNew = () => {
    setText('');
    setActiveMenu(null);
  };

  const handleExit = () => {
    closeApp(windowId);
  };

  const handleSelectAll = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
    setActiveMenu(null);
  };

  const handleTimeDate = () => {
    const dateStr = `\n${new Date().toLocaleString()}\n`;
    setText((prev) => prev + dateStr);
    setActiveMenu(null);
  };

  return (
    <div className="flex flex-col h-full bg-[#f0f0f0] select-text" ref={menuRef}>
      {/* Menu Bar */}
      <div className="flex bg-[#f0f0f0] border-b border-[#d9d9d9] text-[11.5px] px-1 relative select-none">
        {/* File Menu */}
        <div className="relative">
          <button
            className={`px-3 py-1 hover:bg-[#e2e2e2] active:bg-[#d5d5d5] ${
              activeMenu === 'file' ? 'bg-[#cbd5e1]' : ''
            }`}
            onClick={() => handleMenuClick('file')}
          >
            File
          </button>
          {activeMenu === 'file' && (
            <div className="absolute left-0 top-[22px] w-36 bg-white border border-[#97a7b7] shadow-[2px_2px_5px_rgba(0,0,0,0.2)] py-1 z-[10010]">
              <button className="w-full text-left px-5 py-1 hover:bg-[#cbd5e1] text-xs" onClick={handleNew}>
                New
              </button>
              <div className="h-[1px] bg-slate-200 my-1" />
              <button className="w-full text-left px-5 py-1 hover:bg-[#cbd5e1] text-xs" onClick={handleExit}>
                Exit
              </button>
            </div>
          )}
        </div>

        {/* Edit Menu */}
        <div className="relative">
          <button
            className={`px-3 py-1 hover:bg-[#e2e2e2] active:bg-[#d5d5d5] ${
              activeMenu === 'edit' ? 'bg-[#cbd5e1]' : ''
            }`}
            onClick={() => handleMenuClick('edit')}
          >
            Edit
          </button>
          {activeMenu === 'edit' && (
            <div className="absolute left-0 top-[22px] w-40 bg-white border border-[#97a7b7] shadow-[2px_2px_5px_rgba(0,0,0,0.2)] py-1 z-[10010]">
              <button className="w-full text-left px-5 py-1 hover:bg-[#cbd5e1] text-xs" onClick={handleSelectAll}>
                Select All
              </button>
              <button className="w-full text-left px-5 py-1 hover:bg-[#cbd5e1] text-xs" onClick={handleTimeDate}>
                Time/Date
              </button>
            </div>
          )}
        </div>

        {/* Format Menu */}
        <div className="relative">
          <button
            className={`px-3 py-1 hover:bg-[#e2e2e2] active:bg-[#d5d5d5] ${
              activeMenu === 'format' ? 'bg-[#cbd5e1]' : ''
            }`}
            onClick={() => handleMenuClick('format')}
          >
            Format
          </button>
          {activeMenu === 'format' && (
            <div className="absolute left-0 top-[22px] w-40 bg-white border border-[#97a7b7] shadow-[2px_2px_5px_rgba(0,0,0,0.2)] py-1 z-[10010]">
              <button
                className="w-full text-left px-5 py-1 hover:bg-[#cbd5e1] text-xs flex justify-between items-center"
                onClick={() => {
                  setWordWrap(!wordWrap);
                  setActiveMenu(null);
                }}
              >
                <span>Word Wrap</span>
                {wordWrap && <span className="text-[9px] font-bold text-slate-700">✓</span>}
              </button>
            </div>
          )}
        </div>

        {/* View Menu */}
        <div className="relative">
          <button
            className={`px-3 py-1 hover:bg-[#e2e2e2] active:bg-[#d5d5d5] ${
              activeMenu === 'view' ? 'bg-[#cbd5e1]' : ''
            }`}
            onClick={() => handleMenuClick('view')}
          >
            View
          </button>
          {activeMenu === 'view' && (
            <div className="absolute left-0 top-[22px] w-36 bg-white border border-[#97a7b7] shadow-[2px_2px_5px_rgba(0,0,0,0.2)] py-1 z-[10010]">
              <button className="w-full text-left px-5 py-1 hover:bg-[#cbd5e1] text-xs disabled:opacity-50" disabled>
                Status Bar
              </button>
            </div>
          )}
        </div>

        {/* Help Menu */}
        <div className="relative">
          <button
            className={`px-3 py-1 hover:bg-[#e2e2e2] active:bg-[#d5d5d5] ${
              activeMenu === 'help' ? 'bg-[#cbd5e1]' : ''
            }`}
            onClick={() => handleMenuClick('help')}
          >
            Help
          </button>
          {activeMenu === 'help' && (
            <div className="absolute left-0 top-[22px] w-44 bg-white border border-[#97a7b7] shadow-[2px_2px_5px_rgba(0,0,0,0.2)] py-1 z-[10010]">
              <button
                className="w-full text-left px-5 py-1 hover:bg-[#cbd5e1] text-xs"
                onClick={() => {
                  alert('Notepad - Windows 7 Web Clone\nVersion 6.1 (Build 7601: Service Pack 1)\nCreated by Antigravity');
                  setActiveMenu(null);
                }}
              >
                About Notepad
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Textarea Area */}
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 w-full p-2 bg-white resize-none outline-none border-0 text-[13px] font-mono text-slate-800 leading-normal"
        wrap={wordWrap ? 'soft' : 'off'}
        style={{ fontFamily: 'Consolas, "Courier New", monospace' }}
      />
    </div>
  );
}
