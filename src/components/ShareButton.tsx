"use client";

import { useState } from "react";
import { Share2, Check, Copy, Instagram, MessageCircle } from "lucide-react";

// X (Twitter) icon - custom since lucide doesn't have the new X logo
const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

interface ShareButtonProps {
  title?: string;
}

export default function ShareButton({ title = "Bu etkinliği paylaş" }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

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
      icon: <Instagram className="w-5 h-5" />,
      color: "hover:bg-pink-500/20 hover:text-pink-400",
      // Instagram doesn't support direct sharing via URL, so we copy the link
      action: handleCopy,
      note: "(Link kopyalanır)",
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3 rounded-xl font-medium border border-white/10 hover:bg-white/5 transition-colors flex items-center justify-center gap-2 text-text-secondary"
      >
        <Share2 className="w-4 h-4" />
        Paylaş
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#0B0F1A] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
            <div className="p-3 border-b border-white/10">
              <p className="text-xs text-text-muted text-center">Paylaşım Seçenekleri</p>
            </div>
            
            <div className="p-2 space-y-1">
              {shareOptions.map((option) => (
                <a
                  key={option.name}
                  href={option.action ? undefined : option.url}
                  target={option.action ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  onClick={option.action ? option.action : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer text-text-secondary ${option.color}`}
                >
                  {option.icon}
                  <span className="flex-1">{option.name}</span>
                  {option.note && (
                    <span className="text-xs text-text-muted">{option.note}</span>
                  )}
                </a>
              ))}
              
              {/* Copy Link */}
              <button
                onClick={handleCopy}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-text-secondary hover:bg-primary/20 hover:text-primary"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-green-500">Kopyalandı!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    <span>Linki Kopyala</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
