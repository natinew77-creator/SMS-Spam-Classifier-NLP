import React from 'react';
import { Shield } from 'lucide-react';

export default function Header() {
    return (
        <header className="flex items-center justify-center gap-3 py-8 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
            <Shield className="w-8 h-8 text-cyan-400" />
            <h1 className="text-2xl font-bold tracking-tight text-white">
                SmartGuard <span className="text-cyan-400">Threat Intelligence</span>
            </h1>
        </header>
    );
}
