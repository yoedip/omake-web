"use client";

import { useState, useEffect } from "react";

const lines = [
  "It was never about monetary value.",
  "It was about that little extra,",
  "about the gesture,",
  "the human connection,",
  "the delight of getting something unexpected.",
];

function Stars() {
  const [stars, setStars] = useState<
    { left: string; top: string; opacity: number; delay: string; duration: string; size: number }[]
  >([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 50 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: 0.15 + Math.random() * 0.35,
        delay: `${Math.random() * 8}s`,
        duration: `${4 + Math.random() * 6}s`,
        size: Math.random() > 0.7 ? 2 : 1,
      }))
    );
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0">
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animation: `twinkle ${s.duration} ease-in-out ${s.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [showName, setShowName] = useState(false);
  const [syllables, setSyllables] = useState(0);
  const [showDots, setShowDots] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const [showDoneRight, setShowDoneRight] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowName(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showName) return;
    if (syllables < 3) {
      const timer = setTimeout(
        () => setSyllables((s) => s + 1),
        syllables === 0 ? 600 : 400
      );
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setShowDots(true), 800);
      return () => clearTimeout(timer);
    }
  }, [showName, syllables]);

  useEffect(() => {
    if (syllables < 3) return;
    if (visibleCount < lines.length) {
      const timer = setTimeout(
        () => setVisibleCount((c) => c + 1),
        visibleCount === 0 ? 1200 : 1200
      );
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setShowFinal(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [syllables, visibleCount]);

  useEffect(() => {
    if (showFinal) {
      const timer = setTimeout(() => setShowDoneRight(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [showFinal]);

  useEffect(() => {
    if (showDoneRight) {
      const timer = setTimeout(() => setShowCursor(true), 800);
      return () => clearTimeout(timer);
    }
  }, [showDoneRight]);

  useEffect(() => {
    if (showCursor) {
      const timer = setTimeout(() => setShowButton(true), 800);
      return () => clearTimeout(timer);
    }
  }, [showCursor]);

  return (
    <div className="relative flex min-h-screen items-center justify-center px-6 pb-[43vh]">
      <div className={`absolute bottom-0 left-0 right-0 overflow-hidden max-sm:bottom-0 transition-opacity duration-[12s] ease-in ${showName ? "opacity-100" : "opacity-0"}`}>
        <img src="/omakebg.png" alt="" className="relative left-1/2 w-full min-w-[1200px] -translate-x-1/2" />
      </div>
      <Stars />
      <div className="max-w-xl font-mono text-sm leading-relaxed sm:text-base">
        <p className="text-white">
          <span className={`text-[1.05rem] sm:text-[1.15rem] transition-opacity duration-700 ease-in-out ${showName ? "opacity-100" : "opacity-0"}`}>OMAKE</span>{" "}
          <span className="inline-block">
            <span className={`inline-block origin-center transition-all duration-500 ease-out ${syllables >= 1 ? "syllable-visible" : "syllable-hidden"}`}>oh</span>
            <span className={`transition-opacity duration-500 ease-out ${showDots ? "opacity-100" : "opacity-0"}`}><span className="align-middle">·</span></span><span className={`inline-block origin-center transition-all duration-500 ease-out ${syllables >= 2 ? "syllable-visible" : "syllable-hidden"}`}>mah</span>
            <span className={`transition-opacity duration-500 ease-out ${showDots ? "opacity-100" : "opacity-0"}`}><span className="align-middle">·</span></span><span className={`inline-block origin-center transition-all duration-500 ease-out ${syllables >= 3 ? "syllable-visible" : "syllable-hidden"}`}>keh</span>
          </span>
        </p>
        <div className="mt-2 text-zinc-400">
          {lines.map((line, i) => (
            <span
              key={i}
              className={`text-reveal ${
                i < visibleCount ? "visible" : ""
              }`}
            >
              {i > 0 && " "}
              {line}
            </span>
          ))}
        </div>
        <p
          className={`mt-2 text-zinc-400 text-reveal ${
            showFinal ? "visible" : ""
          }`}
        >
          Gift with purchase <span className={`font-semibold italic text-zinc-300/80 transition-opacity duration-700 ease-in-out ${showDoneRight ? "opacity-100" : "opacity-0"}`}>done right</span>
          {showCursor && <span className="cursor text-white">_</span>}
        </p>
        <div className={`mt-10 flex w-fit flex-col items-stretch transition-opacity duration-700 ease-in-out ${showButton ? "opacity-100" : "opacity-0"}`}>
          <button className="group cursor-pointer rounded border border-zinc-600 py-2 text-center font-mono text-sm text-zinc-300 transition-all hover:border-zinc-500 hover:text-white">
            Request early access <span className="text-xs text-zinc-600 transition-colors group-hover:text-zinc-500">· $15/mo</span>
          </button>
          <p className="mt-3 font-mono text-xs text-zinc-600">
            From the Shopify Build Award-winning creator of Checkout Links
          </p>
        </div>
      </div>
    </div>
  );
}
