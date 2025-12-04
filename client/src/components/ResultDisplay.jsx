import React, { useEffect, useState } from 'react';
import { ShieldCheck, Siren } from 'lucide-react';

export default function ResultDisplay({ result }) {
    const [show, setShow] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (result) {
            setShow(true);
            // Animate progress bar
            const timer = setTimeout(() => setProgress(result.confidence), 100);
            return () => clearTimeout(timer);
        } else {
            setShow(false);
            setProgress(0);
        }
    }, [result]);

    if (!result || !show) return null;

    const isSafe = result.type === 'safe';

    return (
        <div className="w-full max-w-2xl mx-auto mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className={`p-8 rounded-2xl border-2 ${isSafe
                    ? 'bg-green-950/30 border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.2)]'
                    : 'bg-red-950/30 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.2)]'
                }`}>
                <div className="flex flex-col items-center text-center space-y-4">
                    {isSafe ? (
                        <div className="p-4 rounded-full bg-green-500/20 text-green-400 animate-bounce-slow">
                            <ShieldCheck className="w-16 h-16" />
                        </div>
                    ) : (
                        <div className="p-4 rounded-full bg-red-500/20 text-red-500 animate-pulse">
                            <Siren className="w-16 h-16" />
                        </div>
                    )}

                    <h2 className={`text-3xl font-black tracking-wider ${isSafe ? 'text-green-400' : 'text-red-500'
                        }`}>
                        {isSafe ? 'VERIFIED SAFE' : 'THREAT DETECTED: SPAM'}
                    </h2>

                    <div className="w-full space-y-2">
                        <div className="flex justify-between text-sm font-mono text-slate-400">
                            <span>CONFIDENCE SCORE</span>
                            <span>{result.confidence}%</span>
                        </div>
                        <div className="h-4 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                            <div
                                className={`h-full transition-all duration-1000 ease-out ${isSafe ? 'bg-green-500' : 'bg-red-500'
                                    }`}
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
