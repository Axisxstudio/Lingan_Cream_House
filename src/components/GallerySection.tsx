import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { galleryImages } from "@/data/gallery";
import type { GalleryImage } from "@/data/gallery";
import { cn } from "@/lib/utils";

const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

const lightboxSlidePx = 56;
/** Auto-advance interval when lightbox is open (slideshow) */
const LIGHTBOX_AUTO_MS = 4500;

function bentoClasses(span: GalleryImage["span"] | undefined) {
  switch (span) {
    case "wide":
      return "col-span-2 sm:col-span-2 lg:col-span-2";
    case "tall":
      return "col-span-1 row-span-2 min-h-[200px] sm:min-h-[260px] lg:min-h-[320px]";
    case "normal":
    default:
      return "col-span-1";
  }
}

type LightboxState =
  | { open: false }
  | { open: true; index: number; dir: number };

const GallerySection = () => {
  const framerReduceMotion = useReducedMotion();
  const [lightbox, setLightbox] = useState<LightboxState>({ open: false });

  const polaroidRotations = useMemo(() => [-1.2, 1.4, -0.8, 1.1, -1.5, 0.9, -1, 1.2], []);

  const polaroidListVariants = useMemo(
    () => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: framerReduceMotion ? 0 : 0.14,
          delayChildren: framerReduceMotion ? 0 : 0.06,
        },
      },
    }),
    [framerReduceMotion],
  );

  const polaroidItemVariants = useMemo(
    () => ({
      hidden: {
        opacity: framerReduceMotion ? 1 : 0,
        y: framerReduceMotion ? 0 : 36,
        rotate: 0,
      },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        rotate: polaroidRotations[i % polaroidRotations.length],
        transition: { duration: framerReduceMotion ? 0 : 0.52, ease: easeOutExpo },
      }),
    }),
    [framerReduceMotion, polaroidRotations],
  );

  const bentoContainerVariants = useMemo(
    () => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: framerReduceMotion ? 0 : 0.11,
          delayChildren: framerReduceMotion ? 0 : 0.05,
        },
      },
    }),
    [framerReduceMotion],
  );

  const bentoItemVariants = useMemo(
    () => ({
      hidden: {
        opacity: framerReduceMotion ? 1 : 0,
        y: framerReduceMotion ? 0 : 28,
        scale: framerReduceMotion ? 1 : 0.97,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: framerReduceMotion ? 0 : 0.55, ease: easeOutExpo },
      },
    }),
    [framerReduceMotion],
  );

  const openLightbox = useCallback((index: number) => {
    setLightbox({ open: true, index, dir: 0 });
  }, []);

  const closeLightbox = useCallback(() => setLightbox({ open: false }), []);

  const goNext = useCallback(() => {
    setLightbox((s) => {
      if (!s.open) return s;
      const nextIndex = s.index >= galleryImages.length - 1 ? 0 : s.index + 1;
      return { open: true, index: nextIndex, dir: 1 };
    });
  }, []);

  const goPrev = useCallback(() => {
    setLightbox((s) => {
      if (!s.open) return s;
      const prevIndex = s.index <= 0 ? galleryImages.length - 1 : s.index - 1;
      return { open: true, index: prevIndex, dir: -1 };
    });
  }, []);

  /** After opening the lightbox, automatically swap to the next photo on a timer (loops). */
  useEffect(() => {
    if (!lightbox.open || framerReduceMotion || galleryImages.length < 2) return;
    const id = window.setInterval(() => {
      setLightbox((s) => {
        if (!s.open) return s;
        const nextIndex = s.index >= galleryImages.length - 1 ? 0 : s.index + 1;
        return { open: true, index: nextIndex, dir: 1 };
      });
    }, LIGHTBOX_AUTO_MS);
    return () => window.clearInterval(id);
  }, [lightbox.open, framerReduceMotion]);

  useEffect(() => {
    if (!lightbox.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox.open, closeLightbox, goNext, goPrev]);

  const lightboxImgVariants = useMemo(
    () => ({
      enter: (dir: number) => ({
        x: dir === 0 ? 0 : dir > 0 ? lightboxSlidePx : -lightboxSlidePx,
        opacity: dir === 0 ? 1 : 0,
        scale: dir === 0 ? 1 : 0.985,
      }),
      center: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: { duration: framerReduceMotion ? 0 : 0.32, ease: easeOutExpo },
      },
      exit: (dir: number) => ({
        x: dir > 0 ? -lightboxSlidePx : dir < 0 ? lightboxSlidePx : 0,
        opacity: 0,
        scale: 0.985,
        transition: { duration: framerReduceMotion ? 0 : 0.26, ease: easeOutExpo },
      }),
    }),
    [framerReduceMotion],
  );

  return (
    <section id="gallery" className="section-padding section-luxury-gallery overflow-hidden">
      <div className="section-orb section-orb-lg" style={{ bottom: "-80px", left: "-60px", opacity: 0.5 }} aria-hidden />
      <div className="section-orb section-orb-sm" style={{ top: "60px", right: "12%", animationDelay: "6s", opacity: 0.4 }} aria-hidden />

      <div className="container-narrow mx-auto relative z-10">
        <AnimatedSection variant="zoom" className="text-center mb-10 sm:mb-14">
          <h2 className="section-heading-premium max-sm:!text-2xl max-sm:!leading-snug sm:text-4xl">
            Our <span className="text-primary">Gallery</span>
          </h2>
          <p className="text-body max-sm:!text-sm max-sm:!leading-relaxed max-w-2xl mx-auto">
            A glimpse into the world of Lingan Cream House — our desserts, our people, our story.
          </p>
        </AnimatedSection>

        {/* Mobile: polaroid scrapbook stack — distinct from menu grid / carousel */}
        <div className="relative sm:hidden">
          <div
            className="pointer-events-none absolute inset-x-0 top-1/4 h-48 rounded-full bg-primary/[0.06] blur-3xl"
            aria-hidden
          />
          <motion.ul
            variants={polaroidListVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="relative mx-auto max-w-[min(100%,320px)] list-none px-1 pb-6"
          >
            {galleryImages.map((img, i) => {
              const shiftRight = i % 2 === 1;
              return (
                <motion.li
                  key={`polaroid-${i}`}
                  custom={i}
                  variants={polaroidItemVariants}
                  className={cn("relative w-[88%]", shiftRight ? "ml-auto" : "mr-auto", i > 0 && "-mt-10")}
                  style={{ zIndex: i }}
                >
                  <button
                    type="button"
                    onClick={() => openLightbox(i)}
                    className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(151_40%_98%)] rounded-sm"
                    aria-label={`Open larger view: ${img.alt}`}
                  >
                    <div
                      className={cn(
                        "rounded-sm border border-white/90 bg-[hsl(150_35%_99%)] p-2 pb-5 shadow-[0_16px_44px_-12px_hsl(152_30%_20%/0.35)]",
                        "ring-1 ring-black/[0.04]",
                      )}
                    >
                      <div className="overflow-hidden bg-muted/40 shadow-inner">
                        <img
                          src={img.src}
                          alt=""
                          loading={i < 2 ? "eager" : "lazy"}
                          className="aspect-[5/6] w-full object-cover"
                        />
                      </div>
                      <div className="mt-3 px-1">
                        <p className="font-body text-[10px] leading-snug text-muted-foreground line-clamp-2 italic">
                          {img.alt}
                        </p>
                      </div>
                    </div>
                  </button>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>

        {/* Tablet / desktop: bento mosaic — staggered one-by-one on scroll */}
        <motion.div
          variants={bentoContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          className={cn(
            "hidden sm:grid gap-3 md:gap-4 lg:gap-5",
            "grid-cols-2 lg:grid-cols-4",
            "auto-rows-[minmax(140px,auto)]",
            "[grid-auto-flow:dense]",
          )}
        >
          {galleryImages.map((img, i) => (
            <motion.div
              key={`bento-${i}`}
              variants={bentoItemVariants}
              className={cn("h-full break-inside-avoid", bentoClasses(img.span))}
            >
              <motion.button
                type="button"
                onClick={() => openLightbox(i)}
                aria-label={`Open larger view: ${img.alt}`}
                className="group relative flex h-full min-h-0 w-full overflow-hidden text-left"
              >
                <div
                  className={cn(
                    "relative w-full overflow-hidden rounded-2xl shadow-[var(--shadow-soft)] ring-1 ring-border/35",
                    img.span === "wide" &&
                      "aspect-[16/9] min-h-[160px] sm:aspect-[2/1] sm:min-h-[180px]",
                    img.span === "tall" && "min-h-[260px] h-full lg:min-h-[320px]",
                    (!img.span || img.span === "normal") && "aspect-[4/3] min-h-[150px]",
                  )}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className={cn(
                      "h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]",
                      img.span === "tall" ? "min-h-full" : "",
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-primary/0 transition-all duration-500 group-hover:ring-primary/30 pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-background/95 to-transparent p-4 pt-12 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="font-body text-sm font-medium text-foreground drop-shadow-sm">{img.alt}</p>
                  </div>
                </div>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox — advance one photo at a time with slide transition */}
      {lightbox.open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Gallery photo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/92 p-4 pt-14 backdrop-blur-md sm:p-6"
          onClick={closeLightbox}
        >
          <div className="pointer-events-none absolute inset-x-0 top-4 flex flex-col items-center gap-0.5 sm:top-5">
            <p className="font-body text-xs text-muted-foreground">
              {lightbox.index + 1} / {galleryImages.length}
            </p>
            {!framerReduceMotion && galleryImages.length > 1 && (
              <p className="font-body text-[10px] text-muted-foreground/80">Slideshow — tap photo for next</p>
            )}
          </div>

          <motion.button
            type="button"
            className="absolute right-3 top-3 z-20 rounded-full bg-background/90 px-3 py-1.5 font-body text-sm font-medium shadow-md ring-1 ring-border sm:right-4 sm:top-4"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
          >
            Close
          </motion.button>

          <motion.button
            type="button"
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-background/90 p-2 shadow-md ring-1 ring-border sm:left-4"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
          >
            <ChevronLeft className="h-6 w-6" />
          </motion.button>
          <motion.button
            type="button"
            aria-label="Next photo"
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-background/90 p-2 shadow-md ring-1 ring-border sm:right-4"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
          >
            <ChevronRight className="h-6 w-6" />
          </motion.button>

          <div
            className="relative flex max-h-[85vh] max-w-full cursor-pointer items-center justify-center px-10 sm:px-14"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            role="presentation"
          >
            <AnimatePresence mode="wait" custom={lightbox.dir}>
              <motion.img
                key={lightbox.index}
                custom={lightbox.dir}
                variants={lightboxImgVariants}
                initial="enter"
                animate="center"
                exit="exit"
                src={galleryImages[lightbox.index].src}
                alt={galleryImages[lightbox.index].alt}
                className="pointer-events-none max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl ring-1 ring-border/50"
              />
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default GallerySection;
