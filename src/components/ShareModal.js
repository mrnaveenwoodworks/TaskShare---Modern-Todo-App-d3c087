import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { motion, AnimatePresence } from "framer-motion";

const ShareModal = ({ isOpen, onClose, todo }) => {
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [shareOption, setShareOption] = useState("link"); // link, email, or qr

  useEffect(() => {
    if (todo && todo.id) {
      // Generate a shareable URL using the todo ID
      const baseUrl = window.location.origin;
      setShareUrl(`${baseUrl}/shared/${todo.id}`);
    }
  }, [todo]);

  useEffect(() => {
    let timer;
    if (copied) {
      timer = setTimeout(() => setCopied(false), 2000);
    }
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = () => {
    setCopied(true);
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Check out this task: ${todo.title}`);
    const body = encodeURIComponent(
      `Take a look at this task:\n\n${todo.title}\n\n${shareUrl}`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 500 }}
          className="bg-white dark:bg-gray-800 w-full max-w-md rounded-xl shadow-2xl overflow-hidden"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                Share Task
              </h3>
              <button
                onClick={onClose}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><rect x="88" y="88" width="80" height="80" rx="12"/></svg>
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Share "{todo?.title}" with others
              </p>

              <div className="flex space-x-2 mb-4 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                <button
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                    shareOption === "link"
                      ? "bg-white dark:bg-gray-600 shadow-sm"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                  onClick={() => setShareOption("link")}
                >
                  <div className="flex items-center justify-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><line x1="80" y1="128" x2="176" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M104,176H64a48,48,0,0,1,0-96h40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M152,80h40a48,48,0,0,1,48,48h0a48,48,0,0,1-48,48H152" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                    <span>Link</span>
                  </div>
                </button>
                <button
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                    shareOption === "email"
                      ? "bg-white dark:bg-gray-600 shadow-sm"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                  onClick={() => setShareOption("email")}
                >
                  <div className="flex items-center justify-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><rect x="28" y="68" width="120" height="120" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="88" cy="128" r="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M200,112h24V216a8,8,0,0,1-8,8H88a8,8,0,0,1-8-8V188" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="221.35" y1="221.94" x2="148" y2="164.89" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="224" y1="112" x2="152" y2="168" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="104 68 104 32 200 32 200 130.67" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                    <span>Email</span>
                  </div>
                </button>
                <button
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                    shareOption === "qr"
                      ? "bg-white dark:bg-gray-600 shadow-sm"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                  onClick={() => setShareOption("qr")}
                >
                  <div className="flex items-center justify-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><rect x="48" y="48" width="60" height="60" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><rect x="48" y="148" width="60" height="60" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><rect x="148" y="48" width="60" height="60" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="148" y1="148" x2="148" y2="172" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="148 208 184 208 184 148" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="184" y1="164" x2="208" y2="164" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                    <span>QR Code</span>
                  </div>
                </button>
              </div>

              {shareOption === "link" && (
                <div className="mt-4">
                  <div className="flex">
                    <input
                      type="text"
                      value={shareUrl}
                      readOnly
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none"
                    />
                    <CopyToClipboard text={shareUrl} onCopy={handleCopy}>
                      <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-lg transition-colors">
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </CopyToClipboard>
                  </div>
                </div>
              )}

              {shareOption === "email" && (
                <div className="mt-4">
                  <button
                    onClick={handleEmailShare}
                    className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="18" height="18"><rect width="256" height="256" fill="none"/><rect x="28" y="68" width="120" height="120" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="88" cy="128" r="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M200,112h24V216a8,8,0,0,1-8,8H88a8,8,0,0,1-8-8V188" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="221.35" y1="221.94" x2="148" y2="164.89" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="224" y1="112" x2="152" y2="168" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="104 68 104 32 200 32 200 130.67" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                    <span>Share via Email</span>
                  </button>
                </div>
              )}

              {shareOption === "qr" && (
                <div className="mt-4 flex justify-center">
                  <div className="bg-white p-4 rounded-lg shadow-inner">
                    {/* QR code placeholder */}
                    <div className="w-48 h-48 bg-gray-100 flex items-center justify-center">
                      <img src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxRUiUyQmNvZGUlMkJmb3IlMkJzaGFyaW5nJTJCdGhlJTJCdGFza3xlbnwwfHx8fDE3NDcyODgwMDV8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="QR code for sharing the task" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Scan this QR code to view the task
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col space-y-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Anyone with this link can view this task
              </p>
              <div className="flex justify-between">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ShareModal;