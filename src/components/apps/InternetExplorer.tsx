import { useState, KeyboardEvent } from 'react';
import { FaArrowLeft, FaArrowRight, FaHome, FaSearch, FaSyncAlt } from 'react-icons/fa';

interface SearchResult {
  title: string;
  url: string;
  desc: string;
}

const mockDatabase: Record<string, SearchResult[]> = {
  default: [
    { title: 'Windows 7 Operating System - Microsoft Wiki', url: 'https://wiki.windows7.com/info', desc: 'Windows 7 is a major release of the Windows NT operating system. It was released to manufacturing on July 22, 2009.' },
    { title: 'React JS - A JavaScript library for building user interfaces', url: 'https://react.dev', desc: 'React lets you build user interfaces out of individual pieces called components. Create responsive web apps.' },
    { title: 'Vite.js - Next Generation Frontend Tooling', url: 'https://vitejs.dev', desc: 'Vite is a local dev server and builder that resolves module imports in lightning-fast speeds.' },
    { title: 'Zustand State Management Store', url: 'https://github.com/pmndrs/zustand', desc: 'A small, fast and scalable bear-bones state-management solution using simplified flux principles.' },
  ],
  notepad: [
    { title: 'How to use Notepad in Windows 7', url: 'https://support.microsoft.com/notepad', desc: 'Learn how to create, edit, save, and print text files in Windows 7 Notepad with word wrap options.' },
  ],
  calculator: [
    { title: 'Windows 7 Calculator Tips and Tricks', url: 'https://windows.com/calculator-tricks', desc: 'Perform standard, scientific, programmer, and statistics calculations using the upgraded calculator.' },
  ],
};

export function InternetExplorer() {
  const [url, setUrl] = useState('http://www.bing.com');
  const [inputVal, setInputVal] = useState('http://www.bing.com');
  const [history, setHistory] = useState<string[]>(['http://www.bing.com']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(null);

  const navigateTo = (newUrl: string, addToHistory = true) => {
    let cleanUrl = newUrl.trim();
    if (!/^https?:\/\//i.test(cleanUrl)) {
      cleanUrl = 'http://' + cleanUrl;
    }
    
    setInputVal(cleanUrl);
    setUrl(cleanUrl);
    
    // Check if it's a search term or a search page
    if (cleanUrl.includes('bing.com/search?q=')) {
      const q = decodeURIComponent(cleanUrl.split('q=')[1] || '');
      setSearchQuery(q);
      performSearch(q);
    } else if (cleanUrl.includes('bing.com')) {
      setSearchResults(null);
      setSearchQuery('');
    } else {
      // Direct mock page render
      setSearchResults([
        {
          title: `Welcome to ${cleanUrl}`,
          url: cleanUrl,
          desc: 'This site is loaded inside the mock browser container. Frame policies prevent loading live external domains directly due to CORS limitations.',
        },
      ]);
    }

    if (addToHistory) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(cleanUrl);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigateTo(inputVal);
    }
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const prevIdx = historyIndex - 1;
      setHistoryIndex(prevIdx);
      navigateTo(history[prevIdx], false);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const nextIdx = historyIndex + 1;
      setHistoryIndex(nextIdx);
      navigateTo(history[nextIdx], false);
    }
  };

  const handleHome = () => {
    navigateTo('http://www.bing.com');
  };

  const performSearch = (query: string) => {
    const q = query.toLowerCase().trim();
    if (!q) {
      setSearchResults(null);
      return;
    }
    const results = mockDatabase[q] || mockDatabase.default;
    setSearchResults(results);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchUrl = `http://www.bing.com/search?q=${encodeURIComponent(searchQuery)}`;
    navigateTo(searchUrl);
  };

  return (
    <div className="flex flex-col h-full bg-[#f0f3f6] select-text font-sans text-xs text-slate-800">
      {/* Navigation Toolbar */}
      <div className="flex items-center gap-1.5 p-1.5 bg-gradient-to-b from-[#f0f4f9] to-[#dce5f0] border-b border-[#a3b7cd] select-none">
        {/* Back / Forward arrows */}
        <button
          className="p-1 rounded hover:bg-slate-200 active:bg-slate-300 disabled:opacity-30 disabled:hover:bg-transparent"
          disabled={historyIndex === 0}
          onClick={handleBack}
          title="Back"
          type="button"
        >
          <FaArrowLeft size={12} />
        </button>
        
        <button
          className="p-1 rounded hover:bg-slate-200 active:bg-slate-300 disabled:opacity-30 disabled:hover:bg-transparent"
          disabled={historyIndex === history.length - 1}
          onClick={handleForward}
          title="Forward"
          type="button"
        >
          <FaArrowRight size={12} />
        </button>

        {/* Home Button */}
        <button
          className="p-1 rounded hover:bg-slate-200 active:bg-slate-300"
          onClick={handleHome}
          title="Home page"
          type="button"
        >
          <FaHome size={13} />
        </button>

        {/* Address Input Bar */}
        <div className="flex-1 flex items-center bg-white border border-[#9bb7cd] rounded-[2px] px-2 py-0.5 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)] focus-within:border-[#5dbeff] focus-within:ring-1 focus-within:ring-[#5dbeff]">
          <input
            type="text"
            className="w-full bg-transparent border-0 outline-none text-[11.5px] text-slate-800"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <FaSyncAlt
            className="text-slate-400 cursor-pointer hover:text-slate-600 ml-1.5"
            size={10.5}
            onClick={() => navigateTo(url, false)}
            title="Refresh"
          />
        </div>

        {/* Search Input Bar (Right Edge) */}
        <div className="w-44 flex items-center bg-white border border-[#9bb7cd] rounded-[2px] px-2 py-0.5 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)] focus-within:border-[#5dbeff]">
          <input
            type="text"
            placeholder="Search Bing"
            className="w-full bg-transparent border-0 outline-none text-[11px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit(e)}
          />
          <FaSearch className="text-slate-400 cursor-pointer hover:text-slate-600" size={10} onClick={handleSearchSubmit} />
        </div>
      </div>

      {/* Main Browser Content Panel */}
      <div className="flex-1 bg-white overflow-y-auto">
        {!searchResults && searchQuery === '' ? (
          /* Custom Mock Bing Search Homepage */
          <div className="flex flex-col items-center pt-16 px-4">
            {/* Logo */}
            <div className="flex items-center gap-1.5 mb-8">
              <span className="text-[34px] font-bold text-[#00809d] tracking-tight">bing</span>
            </div>
            
            {/* Search Box */}
            <form onSubmit={handleSearchSubmit} className="w-[480px] flex items-center bg-white border border-slate-300 rounded shadow-[0_2px_5px_rgba(0,0,0,0.06)] hover:border-slate-400 focus-within:border-sky-500 overflow-hidden">
              <input
                type="text"
                placeholder="Enter query..."
                className="w-full px-3 py-2 text-sm border-none outline-none text-slate-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="px-4 py-2 bg-[#00809d] hover:bg-[#00667e] text-white select-none">
                <FaSearch size={13} />
              </button>
            </form>

            <div className="flex gap-4 mt-6 text-slate-500 select-none text-[11px]">
              <span>Trending: <strong>Notepad</strong>, <strong>Calculator</strong>, <strong>Windows 7</strong></span>
            </div>
          </div>
        ) : (
          /* Search Results Display */
          <div className="p-5 max-w-2xl flex flex-col gap-5 select-text">
            {/* Result Stats header */}
            <div className="text-[11px] text-slate-400 border-b border-slate-100 pb-2">
              Showing mock search results for: <span className="font-semibold text-slate-600">"{searchQuery || url}"</span>
            </div>

            {/* Results Grid */}
            {searchResults && searchResults.map((res, index) => (
              <div key={index} className="flex flex-col gap-1">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(res.url);
                  }}
                  className="text-[14px] text-sky-700 font-semibold hover:underline"
                >
                  {res.title}
                </a>
                <span className="text-[11px] text-emerald-600">{res.url}</span>
                <p className="text-[12px] text-slate-600 leading-relaxed mt-0.5">{res.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
