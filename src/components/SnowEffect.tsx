"use client";

import Snowfall from "react-snowfall";

export default function SnowEffect() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 50, // Navbar'ın altında (navbar genelde 50+)
        pointerEvents: "none",
        // GPU acceleration fixes
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        willChange: "transform",
      }}
    >
      <Snowfall
        snowflakeCount={80} // Azaltıldı - performans için
        speed={[0.5, 1.5]}
        wind={[-0.3, 0.8]}
        radius={[0.5, 2]}
        color="rgba(255, 255, 255, 0.6)"
      />
    </div>
  );
}
