import { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaDesktop, FaChevronRight, FaDatabase, FaFolderOpen, FaArrowUp } from 'react-icons/fa';
import { useWindowStore } from '../../stores/windowStore';
import { FolderIcon, NotepadIcon, ComputerIcon, RecycleBinIcon, InternetExplorerIcon } from '../common/Win7Icons';

interface FSItem {
  name: string;
  type: 'dir' | 'file';
  content?: string;
}

interface DirectoryNode extends FSItem {
  type: 'dir';
  children: (DirectoryNode | FileNode)[];
}

interface FileNode extends FSItem {
  type: 'file';
  content: string;
}

type FSNode = DirectoryNode | FileNode;

const mockFS: DirectoryNode = {
  name: 'Computer',
  type: 'dir',
  children: [
    {
      name: 'Local Disk (C:)',
      type: 'dir',
      children: [
        {
          name: 'Documents',
          type: 'dir',
          children: [
            {
              name: 'welcome_notes.txt',
              type: 'file',
              content: 'Welcome to the Windows 7 Web Clone!\nCreated using React, TypeScript, Tailwind CSS, and Zustand.\n\nAll window bounds, session states, and app data are managed reactively entirely in the browser.\n\nTry opening the Calculator next or drag windows to the edge to snap them!',
            },
            {
              name: 'todo.txt',
              type: 'file',
              content: 'Notepad TODO List:\n[x] Setup Aero chrome theme\n[x] Implement glowing start orb\n[x] Build drag and drop layout snap\n[ ] Implement File association tests\n[ ] Support copy/paste controls',
            },
          ],
        },
        {
          name: 'Pictures',
          type: 'dir',
          children: [
            {
              name: 'avatar_flower.png',
              type: 'file',
              content: '[Image Binary Placeholder: Profile Picture]',
            },
            {
              name: 'default_wallpaper.jpg',
              type: 'file',
              content: '[Image Binary Placeholder: Aero Blue Wallpaper]',
            },
          ],
        },
        {
          name: 'Program Files',
          type: 'dir',
          children: [
            { name: 'Internet Explorer', type: 'dir', children: [] },
            { name: 'Windows NT', type: 'dir', children: [] },
          ],
        },
      ],
    },
    {
      name: 'Desktop',
      type: 'dir',
      children: [
        { name: 'My Computer', type: 'dir', children: [] },
        { name: 'Recycle Bin', type: 'dir', children: [] },
      ],
    },
  ],
};

export function FileExplorer({ windowId }: { windowId: string }) {
  const { openApp } = useWindowStore();
  const [currentPath, setCurrentPath] = useState<string[]>(['Computer', 'Local Disk (C:)']);
  const [history, setHistory] = useState<string[][]>([['Computer', 'Local Disk (C:)']]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [selectedItemName, setSelectedItemName] = useState<string | null>(null);

  // Traverse the mock filesystem to retrieve items at the current path
  const getItemsAtPath = (path: string[]): FSNode[] => {
    let currentNode: FSNode = mockFS;
    
    for (let i = 1; i < path.length; i++) {
      const segment = path[i];
      if (currentNode.type === 'dir') {
        const nextNode: FSNode | undefined = (currentNode.children as FSNode[]).find(
          (child) => child.name === segment
        );
        if (nextNode) {
          currentNode = nextNode;
        } else {
          break;
        }
      }
    }
    
    return currentNode.type === 'dir' ? (currentNode.children as FSNode[]) : [];
  };

  const currentItems = getItemsAtPath(currentPath);

  const navigateTo = (newPath: string[], addToHistory = true) => {
    setCurrentPath(newPath);
    setSelectedItemName(null);

    if (addToHistory) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newPath);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const prevIdx = historyIndex - 1;
      setHistoryIndex(prevIdx);
      setCurrentPath(history[prevIdx]);
      setSelectedItemName(null);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const nextIdx = historyIndex + 1;
      setHistoryIndex(nextIdx);
      setCurrentPath(history[nextIdx]);
      setSelectedItemName(null);
    }
  };

  const handleGoUp = () => {
    if (currentPath.length > 1) {
      const upPath = currentPath.slice(0, -1);
      navigateTo(upPath);
    }
  };

  const handleItemClick = (name: string) => {
    setSelectedItemName(name);
  };

  const handleItemDoubleClick = (item: FSNode) => {
    if (item.type === 'dir') {
      navigateTo([...currentPath, item.name]);
    } else {
      // If it is a txt file, open in Notepad!
      if (item.name.endsWith('.txt')) {
        openApp('notepad', {
          title: item.name,
          data: { text: item.content },
        });
      } else {
        alert(`Opening ${item.name}:\n${item.content}`);
      }
    }
  };

  const renderIcon = (item: FSNode) => {
    if (item.type === 'dir') {
      if (item.name === 'Local Disk (C:)') {
        return <ComputerIcon className="w-10 h-10" />;
      }
      return <FolderIcon className="w-10 h-10" />;
    }
    if (item.name.endsWith('.txt')) {
      return <NotepadIcon className="w-10 h-10" />;
    }
    return <FolderIcon className="w-10 h-10 text-slate-400" />;
  };

  return (
    <div className="flex flex-col h-full bg-[#f4f7fc] text-[11.5px] select-none font-sans text-slate-800">
      {/* Address & Breadcrumbs bar */}
      <div className="flex items-center gap-1.5 p-1.5 bg-gradient-to-b from-[#f0f4f9] to-[#dce5f0] border-b border-[#a3b7cd]">
        {/* Navigation Arrows */}
        <button
          className="p-1 rounded hover:bg-slate-200 active:bg-slate-300 disabled:opacity-30 disabled:hover:bg-transparent"
          disabled={historyIndex === 0}
          onClick={handleBack}
          title="Back"
          type="button"
        >
          <FaArrowLeft size={11} />
        </button>

        <button
          className="p-1 rounded hover:bg-slate-200 active:bg-slate-300 disabled:opacity-30 disabled:hover:bg-transparent"
          disabled={historyIndex === history.length - 1}
          onClick={handleForward}
          title="Forward"
          type="button"
        >
          <FaArrowRight size={11} />
        </button>

        {/* Up arrow */}
        <button
          className="p-1 rounded hover:bg-slate-200 active:bg-slate-300 disabled:opacity-30"
          disabled={currentPath.length <= 1}
          onClick={handleGoUp}
          title="Up one level"
          type="button"
        >
          <FaArrowUp size={11} />
        </button>

        {/* Path Breadcrumbs Display */}
        <div className="flex-1 flex items-center bg-white border border-[#9bb7cd] rounded-[2px] px-2 py-0.5 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]">
          <FolderIcon className="w-3.5 h-3.5 mr-1.5" />
          <div className="flex items-center gap-1 text-slate-500 overflow-hidden whitespace-nowrap">
            {currentPath.map((segment, index) => (
              <span key={index} className="flex items-center gap-1">
                {index > 0 && <FaChevronRight size={7} className="text-slate-400 mt-0.5" />}
                <button
                  type="button"
                  className="hover:underline text-slate-700 hover:text-blue-600 font-medium"
                  onClick={() => navigateTo(currentPath.slice(0, index + 1))}
                >
                  {segment}
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar & Folder Grid Layout */}
      <div className="flex-1 flex overflow-hidden bg-white">
        {/* Navigation Sidebar */}
        <aside className="w-40 border-r border-[#cbd5e1] bg-[#f9fafb] p-2 flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-slate-400 px-2 py-1 text-[10.5px] uppercase tracking-wider">Favorites</span>
            <button
              onClick={() => navigateTo(['Computer', 'Desktop'])}
              className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[#e2e8f0] text-left text-slate-700"
              type="button"
            >
              <FaDesktop className="text-slate-400 text-xs" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => navigateTo(['Computer', 'Local Disk (C:)', 'Documents'])}
              className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[#e2e8f0] text-left text-slate-700"
              type="button"
            >
              <FolderIcon className="w-3.5 h-3.5" />
              <span>Documents</span>
            </button>
            <button
              onClick={() => navigateTo(['Computer', 'Local Disk (C:)', 'Pictures'])}
              className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[#e2e8f0] text-left text-slate-700"
              type="button"
            >
              <FolderIcon className="w-3.5 h-3.5" />
              <span>Pictures</span>
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-semibold text-slate-400 px-2 py-1 text-[10.5px] uppercase tracking-wider">Computer</span>
            <button
              onClick={() => navigateTo(['Computer', 'Local Disk (C:)'])}
              className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[#e2e8f0] text-left text-slate-700"
              type="button"
            >
              <ComputerIcon className="w-4 h-4" />
              <span>Local Disk (C:)</span>
            </button>
          </div>
        </aside>

        {/* Main Files Display Grid */}
        <main className="flex-1 p-4 overflow-y-auto bg-white select-none">
          <div className="grid grid-cols-6 gap-3">
            {currentItems.map((item) => {
              const isSelected = selectedItemName === item.name;
              return (
                <div
                  key={item.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleItemClick(item.name);
                  }}
                  onDoubleClick={() => handleItemDoubleClick(item)}
                  className={`flex flex-col items-center gap-2 p-2 rounded border border-transparent cursor-default text-center w-20 min-h-[76px] transition-all duration-75 ${
                    isSelected
                      ? 'border-[#a3c2e7] bg-gradient-to-b from-[#f2f7fc] to-[#cbdff5] shadow-[inset_0_0_1px_rgba(255,255,255,0.7)]'
                      : 'hover:border-[#e2e8f0] hover:bg-slate-50'
                  }`}
                >
                  <div className="filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)] flex items-center justify-center w-10 h-10">
                    {renderIcon(item)}
                  </div>
                  <span className="text-[11px] leading-tight text-slate-700 break-all select-none line-clamp-2">
                    {item.name}
                  </span>
                </div>
              );
            })}

            {currentItems.length === 0 && (
              <div className="col-span-6 p-8 text-center text-slate-400 italic">
                This folder is empty.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
