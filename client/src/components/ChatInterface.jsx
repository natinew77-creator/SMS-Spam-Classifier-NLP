import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import { Send, Plus, Bot } from 'lucide-react';

const INITIAL_MESSAGES = [
    { id: 1, text: "Hey, are we still on for soccer later?", isUser: false },
    { id: 2, text: "Yeah, definitely! 5pm at the park.", isUser: true },
];

const SPAM_EXAMPLES = [
    "CONGRATS! You won a $1000 Walmart Gift Card. Click here to claim now.",
    "URGENT! Your account has been compromised. Verify immediately.",
    "Free entry in 2 a wkly comp to win FA Cup final tkts 21st May 2005.",
    "You have a secret admirer who is looking for you. Reply YES to see them."
];

const SAFE_EXAMPLES = [
    "Can you send me the report by EOD?",
    "Mom called, she wants to know if you're coming for dinner.",
    "The meeting code is 455-231.",
    "Happy birthday! Hope you have a great day."
];

export default function ChatInterface() {
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const newMessage = {
            id: Date.now(),
            text: inputText,
            isUser: true
        };

        setMessages(prev => [...prev, newMessage]);
        setInputText('');
    };

    const receiveMessage = (type) => {
        const examples = type === 'spam' ? SPAM_EXAMPLES : SAFE_EXAMPLES;
        const randomText = examples[Math.floor(Math.random() * examples.length)];

        const newMessage = {
            id: Date.now(),
            text: randomText,
            isUser: false
        };

        setMessages(prev => [...prev, newMessage]);
    };

    return (
        <div className="w-full max-w-md mx-auto h-[600px] bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden relative">
            {/* Chat Header */}
            <div className="bg-slate-900 p-4 border-b border-slate-800 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
                        <Bot className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white">Live Demo Bot</h3>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-xs text-slate-400 font-mono">AI SENTINEL ACTIVE</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-slate-950/50">
                {messages.map(msg => (
                    <ChatMessage key={msg.id} text={msg.text} isUser={msg.isUser} />
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Debug/Demo Controls */}
            <div className="absolute top-20 right-4 flex flex-col gap-2 z-0">
                <div className="bg-slate-900/90 backdrop-blur-sm p-2 rounded-xl border border-slate-700/50 shadow-xl flex flex-col gap-2">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold text-center">Simulate</span>
                    <button
                        onClick={() => receiveMessage('safe')}
                        className="bg-green-500/10 hover:bg-green-500/20 text-green-400 text-xs px-3 py-1.5 rounded-lg border border-green-500/20 transition-colors flex items-center gap-2"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Safe Msg
                    </button>
                    <button
                        onClick={() => receiveMessage('spam')}
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs px-3 py-1.5 rounded-lg border border-red-500/20 transition-colors flex items-center gap-2"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                        Spam Msg
                    </button>
                </div>
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-slate-900 border-t border-slate-800">
                <div className="flex gap-2">
                    <button type="button" className="p-3 text-slate-400 hover:text-cyan-400 transition-colors">
                        <Plus className="w-6 h-6" />
                    </button>
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-slate-800 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 border border-transparent focus:border-cyan-500/50 placeholder:text-slate-500"
                    />
                    <button
                        type="submit"
                        disabled={!inputText.trim()}
                        className="p-3 bg-cyan-600 text-white rounded-full hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-cyan-500/20"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </form>
        </div>
    );
}
