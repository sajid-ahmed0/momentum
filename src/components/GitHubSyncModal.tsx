import React, { useState } from 'react';
import { GitBranch, Github, ExternalLink, Copy, Check, Terminal, Shield, Download, X } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface GitHubSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubSyncModal: React.FC<GitHubSyncModalProps> = ({ isOpen, onClose }) => {
  const [repoUrl, setRepoUrl] = useState('https://github.com/sajid-ahmed0/momentum.git');
  const [copied, setCopied] = useState(false);
  const [branch, setBranch] = useState('main');

  if (!isOpen) return null;

  const terminalCommands = `git init
git remote add origin ${repoUrl}
git branch -M ${branch}
git add .
git commit -m "Deploy Momentum app update"
git push -u origin ${branch}`;

  const handleCopyCommands = () => {
    navigator.clipboard.writeText(terminalCommands);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        className="relative w-full max-w-xl bg-white dark:bg-zinc-950 rounded shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 flex flex-col"
      >
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
          <div className="flex items-center gap-2">
            <Github className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
            <h3 className="text-sm font-bold font-sans tracking-tight uppercase text-zinc-800 dark:text-zinc-100">GitHub Push & Deployment Hub</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
            <X className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[85vh]">
          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500 tracking-[0.2em]">Repository URL</label>
            <input
              type="text"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/username/repo.git"
              className="w-full px-4 py-3 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 font-mono text-xs dark:text-zinc-200"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500 tracking-[0.2em]">Terminal Push Commands</label>
              <button
                onClick={handleCopyCommands}
                className="text-[10px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 px-2.5 py-1 rounded transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied!" : "Copy Commands"}
              </button>
            </div>
            <div className="p-4 bg-zinc-900 text-zinc-200 rounded font-mono text-xs overflow-x-auto leading-relaxed border border-zinc-800">
              <pre>{terminalCommands}</pre>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs space-y-2">
            <p className="font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> Firebase Auth Domain Requirement
            </p>
            <p className="leading-relaxed">
              To ensure Google Sign-In and authentication work correctly when hosted on GitHub Pages (<span className="font-mono">sajid-ahmed0.github.io</span>), remember to add your GitHub Pages domain to your Firebase Console under <span className="font-semibold">Authentication &gt; Settings &gt; Authorized domains</span>.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-black uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Done
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
