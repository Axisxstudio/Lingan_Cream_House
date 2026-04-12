import { useEffect, useMemo, useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { galleryImages } from "@/data/gallery";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel";

const GallerySection = () => {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const mobileAutoplayPlugins = useMemo(() => {
    if (galleryImages.length < 2 || reduceMotion) return [];
    return [
      Autoplay({
        delay: 4000,
        playOnInit: true,
        stopOnMouseEnter: true,
        stopOnInteraction: false,
        stopOnFocusIn: false,
      }),
    ];
  }, [reduceMotion]);

  return (
    <section id="gallery" className="section-padding bg-background">
      <div className="container-narrow mx-auto">
        <AnimatedSection className="text-center mb-14">
          <h2 className="heading-lg text-foreground mb-4">
            Our <span className="text-primary">Gallery</span>
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            A glimpse into the world of Lingan Cream House — our desserts, our people, our story.
          </p>
        </AnimatedSection>

        {/* Mobile: full-width swipe carousel + dots, autoplay left → right */}
        <div className="relative -mx-4 px-4 sm:hidden">
          <Carousel
            opts={{
              align: "center",
              loop: galleryImages.length > 1,
              skipSnaps: false,
              dragFree: false,
              direction: "ltr",
            }}
            plugins={mobileAutoplayPlugins}
            className="w-full"
          >
            <CarouselContent className="-ml-4 cursor-grab active:cursor-grabbing">
              {galleryImages.map((img, i) => (
                <CarouselItem key={i} className="basis-full pl-4">
                  <div className="overflow-hidden rounded-2xl shadow-[var(--shadow-soft)] ring-1 ring-border/40">
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading={i === 0 ? "eager" : "lazy"}
                      className="aspect-[4/5] w-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselDots className="pt-5" aria-label="Gallery photos" />
          </Carousel>
        </div>

        <div className="hidden columns-2 gap-4 space-y-4 sm:block lg:columns-3">
          {galleryImages.map((img, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <div className="break-inside-avoid group overflow-hidden rounded-2xl shadow-[var(--shadow-soft)]">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
