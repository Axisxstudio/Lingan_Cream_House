import AnimatedSection from "./AnimatedSection";
import rosePistachio from "@/assets/rose-pistachio.jpg";
import brownieSundae from "@/assets/brownie-sundae.jpg";
import mangoSundae from "@/assets/mango-sundae.jpg";
import falooda from "@/assets/falooda.jpg";
import { motion, useReducedMotion } from "framer-motion";

const specials = [
  {
    image: rosePistachio,
    title: "Rose & Pistachio",
    description: "Fragrant, creamy, and locally loved — our signature ice cream infused with delicate rose and crunchy pistachios.",
  },
  {
    image: brownieSundae,
    title: "Warm Brownie Sundae",
    description: "Rich chocolate brownie topped with vanilla ice cream, warm sauce, and a comforting finish.",
  },
  {
    image: mangoSundae,
    title: "Mango Sundae",
    description: "Bursting with fresh Sri Lankan mango, creamy ice cream, and a fruity, refreshing twist.",
  },
  {
    image: falooda,
    title: "Heritage Falooda",
    description: "Our classic layered falooda — a customer favourite with rose syrup, vermicelli, and ice cream.",
  },
];

const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SignatureItemsSection = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-padding section-luxury-signature overflow-hidden">
      {/* Floating orbs */}
      <div className="section-orb section-orb-lg" style={{ bottom: "-60px", right: "-60px", opacity: 0.5 }} aria-hidden />
      <div className="section-orb section-orb-sm" style={{ top: "30px", left: "10%", animationDelay: "5s", opacity: 0.45 }} aria-hidden />

      <div className="container-narrow mx-auto relative z-10">
        <AnimatedSection variant="zoom" className="text-center mb-14">
          <h2 className="section-heading-premium">
            Our <span className="gradient-text">Signature Specials</span>
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Handcrafted with love and perfected over generations — these are the desserts
            that made Lingan Cream House legendary.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specials.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.1} variant="fade-up">
              <motion.div
                className="card-premium group relative overflow-hidden"
                whileHover={reduceMotion ? {} : { y: -6 }}
                transition={{ duration: 0.3, ease: easeOutExpo }}
              >
                {/* Green shimmer on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    width={640}
                    height={640}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                {/* Card top accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-20" />
                <div className="relative z-10 bg-[hsl(150_38%_94%)] p-6 transition-colors duration-500 group-hover:bg-[hsl(150_40%_92%)]">
                  <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed transition-opacity duration-300 group-hover:opacity-90">{item.description}</p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureItemsSection;
