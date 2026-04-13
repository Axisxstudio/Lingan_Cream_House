import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const PageLoader = () => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Show for 1.6s then fade out
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
          {/* Radial glow behind logo */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 320, height: 320,
              background: "radial-gradient(circle, hsl(152 50% 40% / 0.28), transparent 70%)",
              animation: "section-orb-pulse 3s ease-in-out infinite",
            }}
          />

          <motion.img
            src={logo}
            alt="Lingan Cream House"
            className="relative z-10 h-20 w-20 object-contain drop-shadow-2xl"
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          />

          <motion.p
            className="relative z-10 mt-5 font-display text-2xl font-bold tracking-widest"
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
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Est. 1970 · Jaffna, Sri Lanka
          </motion.p>

          {/* Loading bar */}
          <div className="relative z-10 mt-8 w-32 h-[2px] rounded-full overflow-hidden bg-white/10">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, hsl(152 58% 38%), hsl(156 50% 48%))" }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.3, ease: "easeInOut", delay: 0.2 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
