import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, ReactNode } from "react";

const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

type AnimVariant = "fade-up" | "fade-left" | "fade-right" | "zoom" | "fade-down";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: AnimVariant;
  /** How far the element is outside viewport before it triggers (default "-80px") */
  margin?: string;
}

const variants: Record<AnimVariant, { hidden: object; show: object }> = {
  "fade-up": {
    hidden: { opacity: 0, y: 30, scale: 0.99 },
    show:   { opacity: 1, y: 0,  scale: 1 },
  },
  "fade-down": {
    hidden: { opacity: 0, y: -30, scale: 0.99 },
    show:   { opacity: 1, y: 0,   scale: 1 },
  },
  "fade-left": {
    hidden: { opacity: 0, x: -40, scale: 0.995 },
    show:   { opacity: 1, x: 0,   scale: 1 },
  },
  "fade-right": {
    hidden: { opacity: 0, x: 40,  scale: 0.995 },
    show:   { opacity: 1, x: 0,   scale: 1 },
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.95 },
    show:   { opacity: 1, scale: 1 },
  },
};

const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
  variant = "fade-up",
  margin = "-10%",
}: AnimatedSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: margin as `${number}px` | `${number}%` });
  const reduceMotion = useReducedMotion();

  const v = variants[variant];

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : v.hidden}
      animate={reduceMotion || isInView ? v.show : v.hidden}
      transition={{
        duration: reduceMotion ? 0 : 0.9,
        delay: reduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1], // Custom ultra-smooth ease-out
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
