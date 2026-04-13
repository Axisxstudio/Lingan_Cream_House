import AnimatedSection from "./AnimatedSection";
import { Sparkles } from "lucide-react";
import aboutImg from "@/assets/about-shop.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding section-luxury-about overflow-hidden">
      {/* Floating orbs */}
      <div className="section-orb section-orb-lg" style={{ top: "-80px", left: "-80px", opacity: 0.6 }} aria-hidden />
      <div className="section-orb section-orb-md" style={{ bottom: "40px", right: "-60px", animationDelay: "4s", opacity: 0.5 }} aria-hidden />
      <div className="section-orb section-orb-sm" style={{ top: "50%", left: "55%", animationDelay: "8s", opacity: 0.4 }} aria-hidden />

      <div className="container-narrow mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-14 lg:gap-16 items-center">
          <AnimatedSection variant="fade-left" className="order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:mx-0 lg:max-w-none">
              <img
                src={aboutImg}
                alt="Inside Lingan Cream House"
                loading="lazy"
                width={800}
                height={640}
                className="w-full rounded-2xl object-cover shadow-[var(--shadow-card)] ring-1 ring-border/30 transition-transform duration-700 hover:scale-[1.02]"
              />
              {/* Decorative green glow behind image */}
              <div
                className="absolute -inset-3 rounded-3xl -z-10 opacity-40"
                style={{ background: "radial-gradient(ellipse 80% 70% at 50% 50%, hsl(152 50% 86%), transparent 70%)" }}
                aria-hidden
              />
              <div className="absolute bottom-3 right-3 max-w-[calc(100%-1.5rem)] rounded-xl border border-border bg-card px-4 py-2.5 shadow-[var(--shadow-elevated)] sm:-bottom-4 sm:-right-4 sm:max-w-none sm:px-5 sm:py-3">
                <span className="font-display text-base font-bold text-primary sm:text-lg">
                  Since 1970
                </span>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15} variant="fade-right" className="order-1 lg:order-2">
            <div className="mx-auto w-full max-w-prose lg:mx-0 lg:max-w-none">
              <span className="badge-heritage mb-5">
                <Sparkles size={14} />
                Our Story
              </span>

              <h2 className="section-heading-premium mb-6 text-balance leading-[1.15] sm:leading-tight">
                A Family Heritage,{" "}
                <span className="text-primary">Three Generations</span> of Sweetness
              </h2>

              <div className="space-y-5 text-[0.9375rem] font-body leading-[1.75] text-muted-foreground sm:text-base sm:leading-relaxed lg:text-lg">
                <p className="text-pretty first:text-foreground/90">
                  Lingan Cream House has been a beloved destination for dessert lovers since 1970.
                  What started as a small family venture has grown into trusted branches across
                  Sri Lanka and Canada — each one carrying the same warmth and quality.
                </p>
                <p className="text-pretty">
                  For over five decades, three generations of our family have upheld the same
                  promise — generous portions, quality ingredients, warm service, and desserts
                  made fresh every single day. From our legendary faloodas to our artisan ice
                  creams, every creation is a labour of love.
                </p>
                <p className="text-pretty">
                  Locals and visitors alike return to Lingan Cream House not just for the taste,
                  but for the warmth and nostalgia that fills every visit. We're more than a
                  dessert shop — we're a tradition generations have grown up with.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
