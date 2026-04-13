import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { DollarSign, UtensilsCrossed, Sparkles, Users, Award, Heart, ChevronDown } from "lucide-react";

const features = [
  { icon: DollarSign, title: "Fair Pricing", description: "Generous portions and honest prices that have kept families coming back for over 55 years." },
  { icon: UtensilsCrossed, title: "Large Menu", description: "Over 50 picks — from classic ice creams and faloodas to shakes, sundaes, and refreshing cool drinks." },
  { icon: Sparkles, title: "Fresh Daily", description: "Every dessert is prepared fresh each day using quality ingredients for the best possible taste." },
  { icon: Users, title: "Family-Friendly", description: "A warm, welcoming atmosphere perfect for families, friends, and celebrations of all kinds." },
  { icon: Award, title: "Trusted Heritage", description: "Three generations of the same family serving guests across our branches with consistency, care, and commitment." },
  { icon: Heart, title: "Warm Service", description: "Our team treats every guest like family — because to us, you are. That's the Lingan promise." },
];

const WhyChooseUsSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-padding section-luxury-why overflow-hidden">
      {/* Floating orbs */}
      <div className="section-orb section-orb-lg" style={{ top: "-40px", right: "-80px", opacity: 0.5 }} aria-hidden />
      <div className="section-orb section-orb-md" style={{ bottom: "20px", left: "-50px", animationDelay: "6s", opacity: 0.45 }} aria-hidden />

      <div className="container-narrow mx-auto relative z-10">
        <AnimatedSection variant="zoom" className="text-center mb-14">
          <h2 className="section-heading-premium">
            Why Choose <span className="gradient-text">Lingan Cream House</span>
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            There are many reasons families have trusted us for over five decades.
            Here are just a few.
          </p>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto space-y-3">
          {features.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={i * 0.07} variant="fade-left">
              <div
                className="card-premium overflow-hidden"
                style={{
                  background: openIndex === i
                    ? "linear-gradient(135deg, hsl(150 44% 99%) 0%, hsl(152 34% 96.5%) 100%)"
                    : undefined,
                  boxShadow: openIndex === i
                    ? "0 8px 32px -8px hsl(152 40% 30% / 0.14), 0 0 0 1px hsl(152 36% 82% / 0.35)"
                    : undefined,
                }}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center gap-4 p-5 sm:p-6 text-left group"
                >
                  <div className="relative w-12 h-12 shrink-0">
                    {/* Glow behind icon when open */}
                    {openIndex === i && (
                      <div className="absolute inset-0 rounded-xl bg-primary/20 blur-md" aria-hidden />
                    )}
                    <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-[hsl(var(--gold-glow))] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon size={22} className="text-primary-foreground" />
                    </div>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground flex-1">{feature.title}</h3>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <ChevronDown size={20} className="text-muted-foreground" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-[4.75rem] sm:pl-[5.25rem]">
                        {/* Accent line */}
                        <div className="w-8 h-[2px] rounded-full bg-gradient-to-r from-primary to-accent mb-3" />
                        <p className="font-body text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
