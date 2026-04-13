import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { galleryImages } from "@/data/gallery";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel";

const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

const GallerySection = () => {
  const [reduceMotion, setReduceMotion] = useState(false);
  const framerReduceMotion = useReducedMotion();

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
    <section id="gallery" className="section-padding section-luxury-gallery overflow-hidden">
      {/* Floating orbs */}
      <div className="section-orb section-orb-lg" style={{ bottom: "-80px", left: "-60px", opacity: 0.5 }} aria-hidden />
      <div className="section-orb section-orb-sm" style={{ top: "60px", right: "12%", animationDelay: "6s", opacity: 0.4 }} aria-hidden />

      <div className="container-narrow mx-auto relative z-10">
        <AnimatedSection variant="zoom" className="text-center mb-14">
          <h2 className="section-heading-premium">
            Our <span className="text-primary">Gallery</span>
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            A glimpse into the world of Lingan Cream House — our desserts, our people, our story.
          </p>
        </AnimatedSection>

        {/* Mobile: full-width swipe carousel + dots */}
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

        {/* Desktop: masonry grid */}
        <div className="hidden columns-2 gap-4 space-y-4 sm:block lg:columns-3">
          {galleryImages.map((img, i) => (
            <AnimatedSection
              key={i}
              delay={i * 0.07}
              variant={i % 3 === 0 ? "fade-left" : i % 3 === 1 ? "fade-up" : "fade-right"}
            >
              <motion.div
                className="break-inside-avoid group relative overflow-hidden rounded-2xl shadow-[var(--shadow-soft)]"
                whileHover={framerReduceMotion ? {} : { scale: 1.02, y: -4 }}
                transition={{ duration: 0.35, ease: easeOutExpo }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                {/* Luxury green shimmer overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/25 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                {/* Border glow */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-primary/0 group-hover:ring-primary/25 transition-all duration-500 pointer-events-none" />
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
