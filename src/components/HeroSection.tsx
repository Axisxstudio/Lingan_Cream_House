import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, IceCream, Sparkles, Heart } from "lucide-react";
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

const trustIndicators = [
  { icon: Clock, label: "55+ Years in Jaffna" },
  { icon: IceCream, label: "50+ Menu Items" },
  { icon: Sparkles, label: "Fresh Daily" },
  { icon: Heart, label: "Family Favourite" },
];

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Lingan Cream House dessert display"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/40" />
      </div>

      {/* Floating decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/10 animate-float" />
        <div className="absolute bottom-32 right-20 w-48 h-48 rounded-full bg-accent/10 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-gold-light/10 animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container-narrow mx-auto w-full pt-24 pb-16 relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroWelcomeTypewriter />

            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary-foreground font-body text-sm font-medium backdrop-blur-sm">
              <Sparkles size={14} />
              Serving Jaffna Since 1970
            </span>

            <h1 className="heading-xl text-primary-foreground mt-6 mb-8">
              Jaffna's Beloved{" "}
              <span className="gradient-text">Cream House</span>{" "}
              for Three Generations
            </h1>

            <div className="flex flex-wrap gap-3 mb-12">
              <a href="#menu" className="btn-gradient rounded-full px-8">
                View Menu
              </a>
              <a href="#contact" className="btn-outline-hero rounded-full px-8">
                Visit Us
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {trustIndicators.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-xl px-3 py-2"
                >
                  <item.icon size={18} className="text-primary flex-shrink-0" />
                  <span className="font-body text-xs sm:text-sm font-medium text-primary-foreground">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
