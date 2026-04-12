import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const WHATSAPP_HREF =
  "https://wa.me/94212223456?text=Hi%20Lingan%20Cream%20House!%20I'd%20like%20to%20know%20more%20about%20your%20menu.";

const WhatsAppFloat = () => {
  const reduceMotion = useReducedMotion();
  const [hintOpen, setHintOpen] = useState(true);

  useEffect(() => {
    if (reduceMotion) {
      setHintOpen(false);
      return;
    }
    const t = window.setTimeout(() => setHintOpen(false), 6500);
    return () => window.clearTimeout(t);
  }, [reduceMotion]);

  return (
    <div className="fixed z-[100] flex flex-col items-end gap-2 bottom-[max(1.25rem,env(safe-area-inset-bottom,0px))] right-[max(1.25rem,env(safe-area-inset-right,0px))] md:bottom-[max(2rem,env(safe-area-inset-bottom,0px))] md:right-[max(2rem,env(safe-area-inset-right,0px))]">
      <AnimatePresence>
        {hintOpen && !reduceMotion && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 28, delay: 0.85 }}
            className="relative max-w-[min(16rem,calc(100vw-5.5rem))] rounded-2xl border border-border bg-card px-4 py-3 pr-10 text-left shadow-[var(--shadow-elevated)]"
            role="status"
          >
            <p className="font-body text-sm font-medium text-foreground">Chat with us on WhatsApp</p>
            <p className="mt-0.5 font-body text-xs text-muted-foreground">Tap the button to open a chat.</p>
            <button
              type="button"
              onClick={() => setHintOpen(false)}
              className="absolute right-2 top-2 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--mint))] text-white shadow-lg ring-2 ring-white/25 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label="Open WhatsApp chat with Lingan Cream House"
        title="WhatsApp"
        initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={
          reduceMotion
            ? undefined
            : { type: "spring", stiffness: 320, damping: 22, delay: 0.35 }
        }
        whileHover={reduceMotion ? undefined : { scale: 1.08 }}
        whileTap={reduceMotion ? undefined : { scale: 0.94 }}
      >
        <WhatsAppIcon className="relative z-[1] h-8 w-8 text-white" />
      </motion.a>
    </div>
  );
};

export default WhatsAppFloat;
