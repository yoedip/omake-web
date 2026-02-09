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
          <button className="group flex cursor-pointer items-center justify-center gap-2.5 rounded border border-zinc-600 py-2 font-mono text-sm text-zinc-300 transition-all hover:border-zinc-500 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 89 101" className="h-4 w-4 fill-current"><path d="M63.305 100.258l25.313-6.29S77.719 20.285 77.65 19.779c-.07-.505-.511-.786-.878-.816-.364-.03-7.49-.14-7.49-.14s-4.344-4.218-5.977-5.815v87.25zM60.55 12.167l-2.994.927a20.986 20.986 0 00-1.433-3.521c-2.122-4.05-5.23-6.191-8.985-6.197h-.014c-.261 0-.52.025-.78.048a11.357 11.357 0 00-.34-.392C44.37 1.282 42.273.43 39.76.505c-4.85.138-9.68 3.64-13.596 9.862-2.755 4.377-4.852 9.876-5.446 14.134-5.568 1.724-9.462 2.93-9.548 2.958-2.811.883-2.9.969-3.267 3.619C7.627 33.08.273 89.947.273 89.947L61.289 100.5V12.042c-.3.02-.57.075-.74.125zM46.46 16.53l-10.29 3.185c.994-3.807 2.88-7.598 5.197-10.084.86-.925 2.066-1.955 3.494-2.544 1.34 2.8 1.633 6.763 1.6 9.443zM39.853 3.732c1.139-.025 2.097.225 2.916.764-1.31.68-2.577 1.658-3.766 2.932-3.08 3.305-5.44 8.435-6.382 13.384-2.936.909-5.808 1.8-8.452 2.617 1.67-7.79 8.199-19.48 15.684-19.697zM30.418 48.11c.328 5.19 13.984 6.324 14.75 18.483.603 9.565-5.073 16.109-13.253 16.625-9.818.62-15.222-5.174-15.222-5.174l2.08-8.851s5.44 4.105 9.796 3.83c2.844-.18 3.86-2.494 3.757-4.13-.427-6.771-11.548-6.371-12.25-17.497-.592-9.363 5.557-18.85 19.124-19.706 5.227-.33 7.905 1.006 7.905 1.006l-3.103 11.606s-3.46-1.575-7.562-1.316c-6.019.38-6.083 4.174-6.022 5.124zm19.267-32.578c-.036-2.455-.328-5.872-1.472-8.824 3.68.697 5.49 4.86 6.257 7.343-1.42.437-3.036.936-4.785 1.48z"/></svg>
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
