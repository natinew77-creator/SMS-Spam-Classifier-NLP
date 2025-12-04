import React from 'react';
import { Scan } from 'lucide-react';

export default function Scanner({ inputText, setInputText, onScan, isScanning }) {
    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
                <div className="relative">
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Paste suspicious message here..."
                        className="w-full h-48 bg-slate-950 text-slate-200 p-6 rounded-xl border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none resize-none font-mono text-lg placeholder:text-slate-600 shadow-xl transition-all"
                    />
                    <div className="absolute bottom-4 right-4 text-xs text-slate-500 font-mono">
                        {inputText.length} chars
                    </div>
                </div>
            </div>

            <button
                onClick={onScan}
                disabled={!inputText.trim() || isScanning}
                className={`w-full py-4 rounded-xl font-bold text-lg tracking-wide transition-all duration-300 flex items-center justify-center gap-3
          ${!inputText.trim() || isScanning
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-cyan-500 hover:bg-cyan-400 text-slate-900 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]'
                    }`}
            >
                {isScanning ? (
                    <>
                        <span className="animate-pulse">TOKENIZING...</span>
                    </>
                ) : (
                    <>
                        <Scan className="w-5 h-5" />
                        SCAN MESSAGE
                    </>
                )}
            </button>
        </div>
    );
}
