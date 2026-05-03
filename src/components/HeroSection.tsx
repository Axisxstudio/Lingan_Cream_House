import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { cn } from "@/lib/utils";

const WELCOME_LINE = "Welcome to Lingan Cream House";

function HeroWelcomeTypewriter() {
  const [display, setDisplay] = useState("");
  const [phase, setPhase] = useState<"idle" | "typing" | "done">("idle");
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(WELCOME_LINE);
      setPhase("done");
      return;
    }

    let mounted = true;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const startDelay = window.setTimeout(() => {
      if (!mounted) return;
      setPhase("typing");
      let i = 0;
      intervalId = window.setInterval(() => {
        if (!mounted) return;
        i += 1;
        setDisplay(WELCOME_LINE.slice(0, i));
        if (i >= WELCOME_LINE.length) {
          if (intervalId) window.clearInterval(intervalId);
          intervalId = undefined;
          setPhase("done");
        }
      }, 72);
    }, 500);

    return () => {
      mounted = false;
      window.clearTimeout(startDelay);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [reduceMotion]);

  return (
    <p
      className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-primary-foreground tracking-[0.02em] min-h-[1.35em] mb-5"
      aria-label={WELCOME_LINE}
    >
      <span aria-hidden="true">{display}</span>
      <span
        className={cn(
          "inline-block w-[2px] sm:w-[3px] h-[0.92em] ml-1.5 align-[-0.12em] rounded-full bg-primary-foreground/85 transition-opacity duration-500",
          phase === "typing" && "animate-typing-cursor",
          (phase === "done" || phase === "idle") && "opacity-0",
        )}
        aria-hidden="true"
      />
    </p>
  );
}

const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

const HeroSection = () => {
  const reduceMotion = useReducedMotion();

  const heroStaggerParent = {
    hidden: { opacity: reduceMotion ? 1 : 0 },
    show: {
      opacity: 1,
      transition: reduceMotion
        ? { duration: 0 }
        : { staggerChildren: 0.11, delayChildren: 0.12 },
    },
  };

  const heroFadeUp = {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.58, ease: easeOutExpo },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Background: photo + premium layered green gradients (mesh + sheen + brand tint + vignette) */}
      <div className="absolute inset-0 isolate">
        <img
          src={heroBg}
          alt="Lingan Cream House dessert display"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover [filter:saturate(0.68)_brightness(0.88)_contrast(1.06)_hue-rotate(-6deg)]"
        />
        <div className="hero-backdrop-mesh" aria-hidden />
        <div className="hero-backdrop-sheen" aria-hidden />
        <div className="hero-backdrop-brand" aria-hidden />
        <div className="hero-backdrop-vignette" aria-hidden />
      </div>

      {/* Floating decorative shapes — slow drift + float */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none motion-reduce:animate-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/18 animate-drift blur-sm motion-reduce:animate-none" />
        <div
          className="absolute bottom-32 right-20 w-48 h-48 rounded-full bg-gold-light/15 animate-drift-reverse blur-sm motion-reduce:animate-none"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-primary/12 animate-float blur-sm motion-reduce:animate-none"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container-narrow mx-auto w-full pt-24 pb-16 relative z-10">
        <div className="max-w-2xl">
          <motion.div
            variants={heroStaggerParent}
            initial="hidden"
            animate="show"
            className="will-change-transform"
          >
            <motion.div variants={heroFadeUp}>
              <HeroWelcomeTypewriter />
            </motion.div>

            <motion.span
              variants={heroFadeUp}
              className="mt-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/35 text-primary-foreground font-body text-sm font-medium backdrop-blur-md border border-primary-foreground/20 shadow-sm"
            >
              <motion.span
                animate={reduceMotion ? {} : { rotate: [0, 12, -8, 0] }}
                transition={reduceMotion ? {} : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex"
              >
                <Sparkles size={14} />
              </motion.span>
              Serving Families Since 1970
            </motion.span>

            <motion.h1 
              variants={heroFadeUp} 
              className="heading-xl text-primary-foreground mt-8 mb-8 tracking-[-0.03em] leading-[0.95]"
            >
              A Beloved <br />
              <span className="hero-gradient-text">Cream House</span> <br />
              for Three Generations
            </motion.h1>

            <motion.div variants={heroFadeUp} className="mb-0 flex flex-nowrap gap-2 sm:gap-5">
              <motion.a
                href="#menu"
                className="btn-gradient flex-1 rounded-full px-4 py-3 text-center text-sm whitespace-nowrap sm:flex-none sm:px-10 sm:py-4 sm:text-base"
                whileHover={reduceMotion ? {} : { scale: 1.05, boxShadow: "0 20px 40px -10px hsl(152 58% 38% / 0.4)" }}
                whileTap={reduceMotion ? {} : { scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
              >
                Explore Our Menu
              </motion.a>
              <motion.a
                href="#contact"
                className="btn-outline-hero flex-1 rounded-full px-4 py-3 text-center text-sm whitespace-nowrap sm:flex-none sm:px-10 sm:py-4 sm:text-base"
                whileHover={reduceMotion ? {} : { scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={reduceMotion ? {} : { scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
              >
                Find a Branch
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
