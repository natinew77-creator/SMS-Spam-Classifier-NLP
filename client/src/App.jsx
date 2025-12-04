import React, { useState } from 'react';
import Header from './components/Header';
import Scanner from './components/Scanner';
import ResultDisplay from './components/ResultDisplay';
import ChatInterface from './components/ChatInterface';
import { ScanLine, MessageSquare } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('scanner'); // 'scanner' | 'chat'
  const [inputText, setInputText] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = async () => {
    setIsScanning(true);
    setResult(null);

    // Simulate API call / Tokenizing delay
    setTimeout(() => {
      setIsScanning(false);

      // Mock logic for demonstration
      const isSpam = inputText.toLowerCase().includes('free') ||
        inputText.toLowerCase().includes('winner') ||
        inputText.toLowerCase().includes('urgent');

      setResult({
        type: isSpam ? 'spam' : 'safe',
        confidence: isSpam ? 98.5 : 99.2
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-cyan-500/30">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-800/50 p-1 rounded-xl flex gap-1 border border-slate-700/50">
            <button
              onClick={() => setActiveTab('scanner')}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${activeTab === 'scanner'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
            >
              <ScanLine className="w-4 h-4" />
              Threat Scanner
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${activeTab === 'chat'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
            >
              <MessageSquare className="w-4 h-4" />
              Live Chat Demo
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-8">
          {activeTab === 'scanner' ? (
            <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center gap-8">
              <div className="text-center space-y-2 mb-4">
                <h2 className="text-slate-400 text-lg">Advanced SMS Content Analysis Engine</h2>
                <div className="h-1 w-24 bg-cyan-500/50 mx-auto rounded-full"></div>
              </div>

              <Scanner
                inputText={inputText}
                setInputText={setInputText}
                onScan={handleScan}
                isScanning={isScanning}
              />

              <ResultDisplay result={result} />
            </div>
          ) : (
            <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-slate-400 text-lg">Real-time AI Sentinel Agent</h2>
                <p className="text-slate-500 text-sm max-w-md mx-auto">
                  Simulating active interception of incoming messages. The agent analyzes content in &lt;100ms and obfuscates threats automatically.
                </p>
              </div>
              <ChatInterface />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
