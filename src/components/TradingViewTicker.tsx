"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const TICKER_SYMBOLS = [
  { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
  { proName: "FOREXCOM:NSXUSD", title: "NASDAQ 100" },
  { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
  { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
  { proName: "FOREXCOM:XAUUSD", title: "Altın / Gold" },
  { proName: "FX_IDC:USDTRY", title: "USD/TRY" },
  { proName: "FX_IDC:EURTRY", title: "EUR/TRY" },
  { proName: "TVC:UKOIL", title: "Brent Petrol" },
];

export default function TradingViewTicker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    if (!containerRef.current) return;

    // Remove previous script if language changes
    if (scriptRef.current) {
      scriptRef.current.remove();
      scriptRef.current = null;
      // Clear widget container
      const widget = containerRef.current.querySelector(
        ".tradingview-widget-container__widget"
      );
      if (widget) widget.innerHTML = "";
    }

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: TICKER_SYMBOLS,
      showSymbolLogo: true,
      isTransparent: false,
      displayMode: "adaptive",
      colorTheme: "dark",
      locale: language === "tr" ? "tr" : "en",
    });

    containerRef.current.appendChild(script);
    scriptRef.current = script;

    return () => {
      if (scriptRef.current) {
        scriptRef.current.remove();
        scriptRef.current = null;
      }
    };
  }, [language]);

  return (
    <div
      className="tradingview-widget-container w-full overflow-hidden border-b border-white/[0.06] bg-[#0a0e17]"
      ref={containerRef}
    >
      <div className="tradingview-widget-container__widget" />
    </div>
  );
}
