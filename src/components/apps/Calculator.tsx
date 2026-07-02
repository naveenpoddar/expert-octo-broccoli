import { useState } from 'react';

export function Calculator() {
  const [display, setDisplay] = useState('0');
  const [prevVal, setPrevVal] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [isOperand, setIsOperand] = useState(false);
  const [history, setHistory] = useState('');

  const handleDigit = (digit: string) => {
    if (isOperand || display === '0') {
      setDisplay(digit);
      setIsOperand(false);
    } else {
      setDisplay((prev) => prev + digit);
    }
  };

  const handleDecimal = () => {
    if (isOperand) {
      setDisplay('0.');
      setIsOperand(false);
    } else if (!display.includes('.')) {
      setDisplay((prev) => prev + '.');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevVal(null);
    setOperation(null);
    setIsOperand(false);
    setHistory('');
  };

  const handleClearEntry = () => {
    setDisplay('0');
    setIsOperand(false);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay((prev) => prev.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return b === 0 ? 0 : a / b;
      default:
        return b;
    }
  };

  const handleOperator = (op: string) => {
    const current = parseFloat(display);

    if (prevVal === null) {
      setPrevVal(current);
      setHistory(`${current} ${op}`);
    } else if (operation) {
      if (isOperand) {
        // Change operator if pressed successively
        setHistory(`${prevVal} ${op}`);
      } else {
        const result = calculate(prevVal, current, operation);
        setPrevVal(result);
        setDisplay(String(result));
        setHistory(`${result} ${op}`);
      }
    }
    
    setOperation(op);
    setIsOperand(true);
  };

  const handleEqual = () => {
    if (prevVal === null || !operation) return;
    const current = parseFloat(display);
    const result = calculate(prevVal, current, operation);
    
    setDisplay(String(result));
    setHistory('');
    setPrevVal(null);
    setOperation(null);
    setIsOperand(true);
  };

  const handleNegate = () => {
    setDisplay((prev) => String(parseFloat(prev) * -1));
  };

  const handleSqrt = () => {
    const val = parseFloat(display);
    if (val < 0) {
      setDisplay('Invalid input');
    } else {
      setDisplay(String(Math.sqrt(val)));
    }
    setIsOperand(true);
  };

  const handleReciprocal = () => {
    const val = parseFloat(display);
    if (val === 0) {
      setDisplay('Cannot divide by zero');
    } else {
      setDisplay(String(1 / val));
    }
    setIsOperand(true);
  };

  const handlePercent = () => {
    const current = parseFloat(display);
    if (prevVal !== null && operation) {
      const percentageValue = (prevVal * current) / 100;
      setDisplay(String(percentageValue));
    } else {
      setDisplay(String(current / 100));
    }
    setIsOperand(true);
  };

  return (
    <div className="flex flex-col h-full bg-[#f4f7fc] text-[11.5px] p-2.5 select-none font-sans text-slate-800">
      {/* Menu Bar */}
      <div className="flex gap-4 text-slate-700 pb-1.5 border-b border-slate-200 mb-2.5">
        <span className="hover:text-blue-600 cursor-pointer">View</span>
        <span className="hover:text-blue-600 cursor-pointer">Edit</span>
        <span className="hover:text-blue-600 cursor-pointer">Help</span>
      </div>

      {/* Screen Panel */}
      <div className="flex flex-col bg-white border border-[#9bb7cd] rounded px-2.5 py-1.5 mb-3 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.15)] text-right">
        <div className="h-4 text-[10px] text-slate-400 font-mono tracking-wide overflow-hidden whitespace-nowrap">
          {history}
        </div>
        <div className="text-[20px] font-bold font-mono tracking-wide overflow-hidden text-slate-800 py-1">
          {display}
        </div>
      </div>

      {/* Keypad Grid */}
      <div className="grid grid-cols-5 gap-1.5 flex-1 select-none">
        {/* Row 1 */}
        <button className="calc-btn op" onClick={handleBackspace}>MC</button>
        <button className="calc-btn op" onClick={handleClearEntry}>MR</button>
        <button className="calc-btn op" onClick={handleClear}>MS</button>
        <button className="calc-btn op" onClick={handleNegate}>M+</button>
        <button className="calc-btn op" onClick={handleSqrt}>M-</button>

        {/* Row 2 */}
        <button className="calc-btn key" onClick={handleBackspace}>←</button>
        <button className="calc-btn key" onClick={handleClearEntry}>CE</button>
        <button className="calc-btn key" onClick={handleClear}>C</button>
        <button className="calc-btn key" onClick={handleNegate}>±</button>
        <button className="calc-btn key" onClick={handleSqrt}>√</button>

        {/* Row 3 */}
        <button className="calc-btn num" onClick={() => handleDigit('7')}>7</button>
        <button className="calc-btn num" onClick={() => handleDigit('8')}>8</button>
        <button className="calc-btn num" onClick={() => handleDigit('9')}>9</button>
        <button className="calc-btn key" onClick={() => handleOperator('/')}>/</button>
        <button className="calc-btn key" onClick={handlePercent}>%</button>

        {/* Row 4 */}
        <button className="calc-btn num" onClick={() => handleDigit('4')}>4</button>
        <button className="calc-btn num" onClick={() => handleDigit('5')}>5</button>
        <button className="calc-btn num" onClick={() => handleDigit('6')}>6</button>
        <button className="calc-btn key" onClick={() => handleOperator('*')}>*</button>
        <button className="calc-btn key" onClick={handleReciprocal}>1/x</button>

        {/* Row 5 */}
        <button className="calc-btn num" onClick={() => handleDigit('1')}>1</button>
        <button className="calc-btn num" onClick={() => handleDigit('2')}>2</button>
        <button className="calc-btn num" onClick={() => handleDigit('3')}>3</button>
        <button className="calc-btn key" onClick={() => handleOperator('-')}>-</button>
        
        {/* Double Height Equals Key */}
        <button className="calc-btn equal row-span-2" onClick={handleEqual}>=</button>

        {/* Row 6 */}
        <button className="calc-btn num col-span-2 text-left px-5" onClick={() => handleDigit('0')}>0</button>
        <button className="calc-btn num" onClick={handleDecimal}>.</button>
        <button className="calc-btn key" onClick={() => handleOperator('+')}>+</button>
      </div>

      {/* Button styles injected locally for clean modular encapsulation */}
      <style>{`
        .calc-btn {
          height: 28px;
          border-radius: 3px;
          border: 1px solid #78909c;
          font-weight: 600;
          font-size: 11.5px;
          cursor: pointer;
          outline: none;
          box-shadow: 
            inset 0 1px 0 rgba(255,255,255,0.45),
            0 1px 2px rgba(0,0,0,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.08s ease;
        }
        .calc-btn:active {
          transform: scale(0.96);
          box-shadow: inset 1px 1px 3px rgba(0,0,0,0.25);
        }
        .calc-btn.num {
          background: linear-gradient(to bottom, #ffffff 0%, #eef3f7 100%);
          color: #2c3e50;
          border-color: #a3b8cc;
        }
        .calc-btn.num:hover {
          background: linear-gradient(to bottom, #f2f8fc 0%, #dce9f4 100%);
          border-color: #78a9d6;
        }
        .calc-btn.key {
          background: linear-gradient(to bottom, #edf3f8 0%, #d8e2eb 100%);
          color: #1a2530;
          border-color: #9cb4c5;
        }
        .calc-btn.key:hover {
          background: linear-gradient(to bottom, #e3f2fd 0%, #bbdefb 100%);
          border-color: #64b5f6;
        }
        .calc-btn.op {
          background: linear-gradient(to bottom, #f4f6f8 0%, #e0e5eb 100%);
          color: #546e7a;
          border-color: #b0bec5;
          font-size: 10px;
        }
        .calc-btn.op:hover {
          background: #cfd8dc;
        }
        .calc-btn.equal {
          background: linear-gradient(to bottom, #ffb74d 0%, #fb8c00 50%, #f57c00 51%, #ff9800 100%);
          color: white;
          border-color: #e65100;
          text-shadow: 0 1px 2px rgba(0,0,0,0.55);
          height: auto;
        }
        .calc-btn.equal:hover {
          filter: brightness(1.1);
        }
      `}</style>
    </div>
  );
}
