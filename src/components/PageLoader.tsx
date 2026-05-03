import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import logo from "@/assets/logo.png";

const R_OUTER = 40;
const R_INNER = 28;
const C_OUT = 2 * Math.PI * R_OUTER;
const C_IN = 2 * Math.PI * R_INNER;
/** Each ring shows ~22% arc — double cyclic spin (opposite directions + different periods) */
const ARC_OUT = C_OUT * 0.22;
const GAP_OUT = C_OUT - ARC_OUT;
const ARC_IN = C_IN * 0.22;
const GAP_IN = C_IN - ARC_IN;

const PageLoader = () => {
  const [done, setDone] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{
            background: "linear-gradient(145deg, hsl(156 44% 12%) 0%, hsl(152 50% 8%) 100%)",
          }}
        >
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 320,
              height: 320,
              background: "radial-gradient(circle, hsl(152 50% 40% / 0.28), transparent 70%)",
              animation: reduceMotion ? "none" : "section-orb-pulse 3s ease-in-out infinite",
            }}
          />

          <div className="relative z-10 flex flex-col items-center">
            <div className="relative flex h-[140px] w-[140px] items-center justify-center">
              {/* Double cyclic loader: outer CW + inner CCW (two independent rotation cycles) */}
              <motion.svg
                className="absolute inset-0 h-full w-full origin-center"
                viewBox="0 0 100 100"
                animate={reduceMotion ? { rotate: 0 } : { rotate: 360 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { repeat: Infinity, duration: 1.2, ease: "linear" }
                }
                aria-hidden
              >
                <defs>
                  <linearGradient id="loaderArcOuter" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(152 68% 58%)" />
                    <stop offset="50%" stopColor="hsl(156 55% 48%)" />
                    <stop offset="100%" stopColor="hsl(168 42% 34%)" />
                  </linearGradient>
                </defs>
                <g transform={`rotate(-90 ${50} ${50})`}>
                  <circle
                    cx="50"
                    cy="50"
                    r={R_OUTER}
                    fill="none"
                    stroke="url(#loaderArcOuter)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${ARC_OUT} ${GAP_OUT}`}
                  />
                </g>
              </motion.svg>

              <motion.svg
                className="absolute inset-0 h-full w-full origin-center"
                viewBox="0 0 100 100"
                animate={reduceMotion ? { rotate: 0 } : { rotate: -360 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { repeat: Infinity, duration: 0.82, ease: "linear" }
                }
                aria-hidden
              >
                <defs>
                  <linearGradient id="loaderArcInner" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="hsl(158 55% 72%)" />
                    <stop offset="50%" stopColor="hsl(152 60% 52%)" />
                    <stop offset="100%" stopColor="hsl(168 45% 38%)" />
                  </linearGradient>
                </defs>
                <g transform={`rotate(-90 ${50} ${50})`}>
                  <circle
                    cx="50"
                    cy="50"
                    r={R_INNER}
                    fill="none"
                    stroke="url(#loaderArcInner)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray={`${ARC_IN} ${GAP_IN}`}
                  />
                </g>
              </motion.svg>

              {/* Soft outer pulse ring — subtle breathing */}
              {!reduceMotion && (
                <motion.div
                  className="pointer-events-none absolute inset-[6px] rounded-full border border-primary/25"
                  animate={{ scale: [1, 1.04, 1], opacity: [0.35, 0.65, 0.35] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                />
              )}

              <motion.img
                src={logo}
                alt="Lingan Cream House"
                className="relative z-10 h-[72px] w-[72px] object-contain drop-shadow-2xl"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
              />
            </div>

            <motion.p
              className="relative z-10 mt-6 font-display text-2xl font-bold tracking-widest"
              style={{ color: "hsl(150 38% 96%)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
              Lingan Cream House
            </motion.p>

            <motion.p
              className="relative z-10 mt-1 font-body text-xs tracking-[0.28em] uppercase"
              style={{ color: "hsl(152 38% 72%)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              Est. 1970 · Jaffna, Sri Lanka
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
