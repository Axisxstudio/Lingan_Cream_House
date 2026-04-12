import AnimatedSection from "./AnimatedSection";
import { Sparkles } from "lucide-react";
import aboutImg from "@/assets/about-shop.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-narrow mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-14 lg:gap-16 items-center">
          <AnimatedSection className="order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:mx-0 lg:max-w-none">
              <img
                src={aboutImg}
                alt="Inside Lingan Cream House, Jaffna"
                loading="lazy"
                width={800}
                height={640}
                className="w-full rounded-2xl object-cover shadow-[var(--shadow-card)] ring-1 ring-border/30"
              />
              <div className="absolute bottom-3 right-3 max-w-[calc(100%-1.5rem)] rounded-xl border border-border bg-card px-4 py-2.5 shadow-[var(--shadow-elevated)] sm:-bottom-4 sm:-right-4 sm:max-w-none sm:px-5 sm:py-3">
                <span className="font-display text-base font-bold text-primary sm:text-lg">
                  Since 1970
                </span>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="order-1 lg:order-2">
            <div className="mx-auto w-full max-w-prose lg:mx-0 lg:max-w-none">
              <span className="badge-heritage mb-5">
                <Sparkles size={14} />
                Our Story
              </span>

              <h2 className="heading-lg mb-6 text-balance text-foreground leading-[1.15] sm:leading-tight">
                A Jaffna Heritage,{" "}
                <span className="text-primary">Three Generations</span> of Sweetness
              </h2>

              <div className="space-y-5 text-[0.9375rem] font-body leading-[1.75] text-muted-foreground sm:text-base sm:leading-relaxed lg:text-lg">
                <p className="text-pretty first:text-foreground/90">
                  Nestled on Hospital Road in the heart of Jaffna, Lingan Cream House has been
                  a beloved destination for dessert lovers since 1970. What started as a small
                  family venture has blossomed into one of Jaffna's most trusted and cherished
                  cream houses.
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
                  dessert shop — we're a Jaffna tradition.
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
