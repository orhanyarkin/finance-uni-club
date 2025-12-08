"use client";

import { useState, useRef, useEffect } from "react";
import { Share2, Check, Copy, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// X (Twitter) icon - custom since lucide doesn't have the new X logo
const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// Instagram Icon - Custom SVG to ensure visibility
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

interface ShareButtonProps {
  title?: string;
}

export default function ShareButton({ title = "Bu içeriği paylaş" }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 1500);
    } catch (err) {
      console.error("Kopyalama başarısız:", err);
    }
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = title;

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: <MessageCircle className="w-5 h-5" />,
      color: "hover:bg-green-500/20 hover:text-green-400",
      url: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
    },
    {
      name: "X (Twitter)",
      icon: <XIcon />,
      color: "hover:bg-white/10 hover:text-white",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "Instagram",
      icon: <InstagramIcon />,
      color: "hover:bg-pink-500/20 hover:text-pink-400",
      action: handleCopy,
      note: "(Link kopyalanır)",
    },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3 rounded-xl font-medium border border-white/10 hover:bg-white/5 transition-colors flex items-center justify-center gap-2 text-text-secondary active:scale-95 duration-200"
      >
        <Share2 className="w-4 h-4" />
        Paylaş
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-0 mb-3 w-64 bg-[#0B0F1A] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-3 border-b border-white/10 bg-white/5">
              <p className="text-xs font-medium text-text-muted text-center uppercase tracking-wider">Paylaşım Seçenekleri</p>
            </div>
            
            <div className="p-2 space-y-1">
              {shareOptions.map((option) => (
                <a
                  key={option.name}
                  href={option.action ? undefined : option.url}
                  target={option.action ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (option.action) {
                      e.preventDefault();
                      option.action();
                    } else {
                      setIsOpen(false);
                    }
                  }}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all cursor-pointer text-text-secondary group ${option.color}`}
                >
                  <div className="shrink-0 transition-transform group-hover:scale-110">
                    {option.icon}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium leading-none">{option.name}</span>
                    {option.note && (
                      <span className="text-[10px] text-text-muted mt-1">{option.note}</span>
                    )}
                  </div>
                </a>
              ))}
              
              <div className="h-px bg-white/5 my-1" />

              {/* Copy Link */}
              <button
                onClick={handleCopy}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-text-secondary hover:bg-primary/10 hover:text-primary group"
              >
                <div className="shrink-0 transition-transform group-hover:scale-110">
                  {copied ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </div>
                <span className="text-sm font-medium">
                  {copied ? "Kopyalandı!" : "Linki Kopyala"}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
