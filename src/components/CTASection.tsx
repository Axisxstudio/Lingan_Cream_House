import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Sparkles } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

const CTASection = () => {
  const reduceMotion = useReducedMotion();

  const ctaParent = {
    hidden: { opacity: reduceMotion ? 1 : 0 },
    show: {
      opacity: 1,
      transition: reduceMotion
        ? { duration: 0 }
        : { staggerChildren: 0.13, delayChildren: 0.08 },
    },
  };

  const ctaItem = {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOutExpo },
    },
  };

  return (
    <section className="section-padding section-luxury-cta text-primary-foreground overflow-hidden">
      {/* Floating orbs (light on dark bg) */}
      <div
        className="section-orb"
        style={{
          width: 380, height: 380,
          top: "-120px", left: "-80px",
          background: "radial-gradient(circle, hsl(152 50% 42% / 0.28), transparent 70%)",
          animation: "orb-drift 24s ease-in-out infinite",
        }}
        aria-hidden
      />
      <div
        className="section-orb"
        style={{
          width: 260, height: 260,
          bottom: "-80px", right: "-60px",
          background: "radial-gradient(circle, hsl(156 44% 36% / 0.22), transparent 70%)",
          animation: "orb-drift-reverse 18s ease-in-out infinite",
          animationDelay: "5s",
        }}
        aria-hidden
      />

      <div className="container-narrow mx-auto text-center relative z-10">
        <motion.div
          variants={ctaParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Badge */}
          <motion.div variants={ctaItem} className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 font-body text-sm font-medium text-primary-foreground/90 backdrop-blur-sm">
              <motion.span
                animate={reduceMotion ? {} : { rotate: [0, 15, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex"
              >
                <Sparkles size={14} />
              </motion.span>
              Come Taste the Tradition
            </span>
          </motion.div>

          <motion.h2 variants={ctaItem} className="section-heading-premium">
            Come Taste the Tradition
          </motion.h2>
          <motion.p
            variants={ctaItem}
            className="font-body text-base sm:text-lg opacity-80 max-w-xl mx-auto mb-8"
          >
            Visit Lingan Cream House at a branch near you — where every scoop is made
            with love and served with a smile. We're waiting to welcome you!
          </motion.p>

          <motion.div variants={ctaItem} className="flex flex-wrap gap-3 justify-center">
            <motion.a
              href="#contact"
              className="btn-primary"
              whileHover={reduceMotion ? {} : { scale: 1.04, y: -2 }}
              whileTap={reduceMotion ? {} : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              <MapPin size={16} />
              Visit Us Today
            </motion.a>
            <motion.a
              href="https://wa.me/94212223456?text=Hi%20Lingan%20Cream%20House!"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp gap-2"
              whileHover={reduceMotion ? {} : { scale: 1.04, y: -2 }}
              whileTap={reduceMotion ? {} : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp Us
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
