import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { DollarSign, UtensilsCrossed, Sparkles, Users, Award, Heart, ChevronDown } from "lucide-react";

const features = [
  { icon: DollarSign, title: "Fair Pricing", description: "Generous portions and honest prices that have kept Jaffna families coming back for over 55 years." },
  { icon: UtensilsCrossed, title: "Large Menu", description: "Over 50 picks — from classic ice creams and faloodas to shakes, sundaes, and refreshing cool drinks." },
  { icon: Sparkles, title: "Fresh Daily", description: "Every dessert is prepared fresh each day using quality ingredients for the best possible taste." },
  { icon: Users, title: "Family-Friendly", description: "A warm, welcoming atmosphere perfect for families, friends, and celebrations of all kinds." },
  { icon: Award, title: "Trusted Heritage", description: "Three generations of the same family serving Jaffna with consistency, care, and commitment." },
  { icon: Heart, title: "Warm Service", description: "Our team treats every guest like family — because to us, you are. That's the Lingan promise." },
];

const WhyChooseUsSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-padding bg-muted/50">
      <div className="container-narrow mx-auto">
        <AnimatedSection className="text-center mb-14">
          <h2 className="heading-lg text-foreground mb-4">
            Why Choose <span className="gradient-text">Lingan Cream House</span>
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            There are many reasons Jaffna's families have trusted us for over five decades.
            Here are just a few.
          </p>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto space-y-3">
          {features.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={i * 0.08}>
              <div className="card-premium overflow-hidden">
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center gap-4 p-5 sm:p-6 text-left group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-gold-glow flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon size={22} className="text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground flex-1">{feature.title}</h3>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
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
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-[4.75rem] sm:pl-[5.25rem]">
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
