import React, { useState, useRef } from 'react';
import { Search, Globe, FolderTree, AlertCircle, CheckCircle, XCircle, Loader, Download, Trash2 } from 'lucide-react';

const WebEnumerationTool = () => {
  const [mode, setMode] = useState('directory');
  const [target, setTarget] = useState('');
  const [wordlist, setWordlist] = useState('');
  const [results, setResults] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stats, setStats] = useState({ total: 0, found: 0, notFound: 0 });
  const abortControllerRef = useRef(null);

  const commonDirs = `admin
login
dashboard
api
uploads
images
css
js
backup
config
database
test
dev
staging
wp-admin
wp-content
.git
.env
robots.txt
sitemap.xml`;

  const commonSubdomains = `www
mail
ftp
admin
blog
dev
staging
test
api
portal
shop
store
forum
support
help
docs
cdn
static
assets
media`;

  const handleScan = async () => {
    if (!target.trim()) {
      alert('Please enter a target URL or domain');
      return;
    }

    const words = wordlist.trim() ? wordlist.split('\n').filter(w => w.trim()) : 
                  (mode === 'directory' ? commonDirs : commonSubdomains).split('\n');

    setResults([]);
    setIsScanning(true);
    setProgress(0);
    setStats({ total: words.length, found: 0, notFound: 0 });

    abortControllerRef.current = new AbortController();

    for (let i = 0; i < words.length; i++) {
      if (abortControllerRef.current.signal.aborted) break;

      const word = words[i].trim();
      const url = mode === 'directory' 
        ? `${target.replace(/\/$/, '')}/${word}`
        : `https://${word}.${target.replace(/^https?:\/\//, '').replace(/^www\./, '')}`;

      try {
        // Simulate scan with random delay
        await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));
        
        // Simulate results (since we can't actually make cross-origin requests)
        const statusCode = Math.random() > 0.7 ? 200 : (Math.random() > 0.5 ? 403 : 404);
        const size = Math.floor(Math.random() * 50000);
        
        const result = {
          url,
          word,
          status: statusCode,
          size,
          timestamp: new Date().toLocaleTimeString()
        };

        if (statusCode === 200 || statusCode === 403 || statusCode === 301 || statusCode === 302) {
          setResults(prev => [result, ...prev]);
          setStats(prev => ({ ...prev, found: prev.found + 1 }));
        } else {
          setStats(prev => ({ ...prev, notFound: prev.notFound + 1 }));
        }

      } catch (error) {
        console.error('Error scanning:', error);
      }

      setProgress(((i + 1) / words.length) * 100);
    }

    setIsScanning(false);
  };

  const stopScan = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsScanning(false);
  };

  const clearResults = () => {
    setResults([]);
    setProgress(0);
    setStats({ total: 0, found: 0, notFound: 0 });
  };

  const exportResults = () => {
    const data = results.map(r => `${r.status},${r.url},${r.size}`).join('\n');
    const blob = new Blob([`Status,URL,Size\n${data}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${mode}-enum-${Date.now()}.csv`;
    a.click();
  };

  const getStatusColor = (status) => {
    if (status === 200) return 'text-green-600';
    if (status === 403) return 'text-yellow-600';
    if (status === 301 || status === 302) return 'text-blue-600';
    return 'text-red-600';
  };

  const getStatusIcon = (status) => {
    if (status === 200) return <CheckCircle className="w-4 h-4" />;
    if (status === 403) return <AlertCircle className="w-4 h-4" />;
    return <XCircle className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 mb-6 border border-purple-500/30">
          <div className="flex items-center gap-3 mb-2">
            <Search className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold text-white">Web Enumeration Tool</h1>
          </div>
          <p className="text-gray-300">Directory & Subdomain Discovery for Security Testing</p>
          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-200">
                <strong>Legal Notice:</strong> Only scan systems you own or have explicit permission to test. Unauthorized scanning may be illegal.
              </p>
            </div>
          </div>
        </div>

        {/* Mode Selection */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 mb-6 border border-purple-500/30">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setMode('directory')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition ${
                mode === 'directory'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              <FolderTree className="w-5 h-5" />
              Directory Enumeration
            </button>
            <button
              onClick={() => setMode('subdomain')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition ${
                mode === 'subdomain'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              <Globe className="w-5 h-5" />
              Subdomain Enumeration
            </button>
          </div>

          {/* Target Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {mode === 'directory' ? 'Target URL' : 'Target Domain'}
            </label>
            <input
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder={mode === 'directory' ? 'https://example.com' : 'example.com'}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Wordlist Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Custom Wordlist (one per line, leave empty for default)
            </label>
            <textarea
              value={wordlist}
              onChange={(e) => setWordlist(e.target.value)}
              placeholder={`Enter custom wordlist or leave empty for defaults:\n${mode === 'directory' ? 'admin, login, api...' : 'www, mail, dev...'}`}
              rows={6}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
            />
          </div>

          {/* Control Buttons */}
          <div className="flex gap-3">
            {!isScanning ? (
              <button
                onClick={handleScan}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition"
              >
                <Search className="w-5 h-5" />
                Start Scan
              </button>
            ) : (
              <button
                onClick={stopScan}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
              >
                <XCircle className="w-5 h-5" />
                Stop Scan
              </button>
            )}
            {results.length > 0 && (
              <>
                <button
                  onClick={exportResults}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Export
                </button>
                <button
                  onClick={clearResults}
                  className="px-6 py-3 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition flex items-center gap-2"
                >
                  <Trash2 className="w-5 h-5" />
                  Clear
                </button>
              </>
            )}
          </div>

          {/* Progress Bar */}
          {isScanning && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">Scanning...</span>
                <span className="text-sm text-gray-300">{progress.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Statistics */}
        {stats.total > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-4 border border-purple-500/30">
              <div className="text-gray-400 text-sm mb-1">Total Checked</div>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-4 border border-green-500/30">
              <div className="text-gray-400 text-sm mb-1">Found</div>
              <div className="text-2xl font-bold text-green-400">{stats.found}</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-4 border border-red-500/30">
              <div className="text-gray-400 text-sm mb-1">Not Found</div>
              <div className="text-2xl font-bold text-red-400">{stats.notFound}</div>
            </div>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30">
            <h2 className="text-xl font-bold text-white mb-4">Results ({results.length})</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {results.map((result, idx) => (
                <div
                  key={idx}
                  className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 hover:border-purple-500/50 transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`flex items-center gap-1 ${getStatusColor(result.status)}`}>
                        {getStatusIcon(result.status)}
                        <span className="font-mono font-bold">{result.status}</span>
                      </div>
                      <div className="text-white font-mono text-sm truncate flex-1">
                        {result.url}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>{(result.size / 1024).toFixed(2)} KB</span>
                      <span>{result.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isScanning && results.length === 0 && (
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-12 border border-purple-500/30 text-center">
            <Loader className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-300">Scanning in progress...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebEnumerationTool;
