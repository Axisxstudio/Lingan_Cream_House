import AnimatedSection from "./AnimatedSection";
import rosePistachio from "@/assets/rose-pistachio.jpg";
import brownieSundae from "@/assets/brownie-sundae.jpg";
import mangoSundae from "@/assets/mango-sundae.jpg";
import falooda from "@/assets/falooda.jpg";

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
    description: "Our classic layered falooda — a Jaffna favourite with rose syrup, vermicelli, and ice cream.",
  },
];

const SignatureItemsSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-narrow mx-auto">
        <AnimatedSection className="text-center mb-14">
          <h2 className="heading-lg text-foreground mb-4">
            Our <span className="gradient-text">Signature Specials</span>
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Handcrafted with love and perfected over generations — these are the desserts
            that made Lingan Cream House legendary.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specials.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.1}>
              <div className="card-premium group">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    width={640}
                    height={640}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureItemsSection;
