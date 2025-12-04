import React, { useState, useEffect } from 'react';
import { Shield, ShieldAlert, Eye } from 'lucide-react';

const checkSpam = async (text) => {
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 600));

    const lower = text.toLowerCase();
    const isSpam = lower.includes('winner') ||
        lower.includes('free') ||
        lower.includes('urgent') ||
        lower.includes('congrats');

    return { isSpam };
};

export default function ChatMessage({ text, isUser }) {
    const [status, setStatus] = useState('scanning'); // 'scanning', 'safe', 'spam'
    const [showSpam, setShowSpam] = useState(false);

    useEffect(() => {
        if (isUser) {
            setStatus('safe');
            return;
        }

        let mounted = true;
        checkSpam(text).then(result => {
            if (mounted) {
                setStatus(result.isSpam ? 'spam' : 'safe');
            }
        });
        return () => { mounted = false; };
    }, [text, isUser]);

    if (isUser) {
        return (
            <div className="flex justify-end mb-4">
                <div className="bg-cyan-600 text-white px-4 py-3 rounded-2xl rounded-tr-sm max-w-[80%] shadow-lg">
                    {text}
                </div>
            </div>
        );
    }

    if (status === 'scanning') {
        return (
            <div className="flex justify-start mb-4">
                <div className="bg-slate-800 text-slate-400 px-4 py-3 rounded-2xl rounded-tl-sm max-w-[80%] border border-slate-700 flex items-center gap-2 animate-pulse">
                    <Shield className="w-4 h-4" />
                    <span className="text-xs font-mono">AI AGENT SCANNING...</span>
                </div>
            </div>
        );
    }

    if (status === 'spam') {
        return (
            <div className="flex justify-start mb-4">
                <div className="bg-red-950/30 border border-red-500/50 px-4 py-3 rounded-2xl rounded-tl-sm max-w-[80%] shadow-[0_0_15px_rgba(239,68,68,0.15)]">
                    <div className="flex items-center gap-2 mb-2 text-red-500 font-bold text-xs tracking-wider border-b border-red-500/20 pb-1">
                        <ShieldAlert className="w-4 h-4" />
                        <span>THREAT DETECTED: SPAM</span>
                    </div>

                    <div className="relative">
                        <p className={`transition-all duration-300 ${showSpam ? 'blur-none' : 'blur-sm select-none'}`}>
                            {text}
                        </p>

                        {!showSpam && (
                            <button
                                onClick={() => setShowSpam(true)}
                                className="absolute inset-0 flex items-center justify-center w-full h-full bg-red-900/10 hover:bg-red-900/20 transition-colors group"
                            >
                                <div className="flex items-center gap-2 bg-slate-900/90 text-slate-200 px-3 py-1.5 rounded-full text-xs font-medium border border-slate-700 group-hover:border-red-500/50 transition-colors">
                                    <Eye className="w-3 h-3" />
                                    Show Anyway
                                </div>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Safe message
    return (
        <div className="flex justify-start mb-4">
            <div className="bg-slate-800 text-slate-100 px-4 py-3 rounded-2xl rounded-tl-sm max-w-[80%] shadow-md border border-slate-700/50 flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-green-400 opacity-70">
                    <Shield className="w-3 h-3" />
                    VERIFIED SAFE
                </div>
                {text}
            </div>
        </div>
    );
}
