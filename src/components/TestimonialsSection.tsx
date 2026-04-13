import { useCallback, useEffect, useMemo, useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { Star, MessageSquarePlus, List, SlidersHorizontal } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import { testimonials } from "@/data/testimonials";
import type { Testimonial } from "@/data/testimonials";
import {
  appendUserFeedback,
  loadUserFeedback,
  type StoredFeedback,
} from "@/lib/feedbackStorage";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type ReviewRow = Testimonial & {
  rowKey: string;
  fromVisitor?: boolean;
  submittedAt?: string;
};

function toRows(defaults: Testimonial[], extras: StoredFeedback[]): ReviewRow[] {
  const featured: ReviewRow[] = defaults.map((t, i) => ({
    ...t,
    rowKey: `featured-${i}`,
    submittedAt: t.submittedAt,
  }));
  const visitor: ReviewRow[] = extras.map((t) => ({
    name: t.name,
    location: t.location,
    rating: t.rating,
    text: t.text,
    rowKey: t.id,
    fromVisitor: true,
    submittedAt: t.submittedAt,
  }));
  return [...featured, ...visitor];
}

function formatFeedbackDate(value?: string): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function ReviewCard({ row, onOpen }: { row: ReviewRow; onOpen: () => void }) {
  const formattedDate = formatFeedbackDate(row.submittedAt);
  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      onClick={() => onOpen()}
      className={cn(
        "card-premium p-6 sm:p-8 flex flex-col h-full w-full max-w-[320px] mx-auto text-left",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
        "cursor-pointer select-none",
      )}
      aria-label={`Open full review from ${row.name}`}
    >
      <div className="flex gap-1 mb-4 pointer-events-none">
        {Array.from({ length: row.rating }).map((_, j) => (
          <Star key={j} size={16} className="fill-primary text-primary" />
        ))}
      </div>
      <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1 mb-5 italic line-clamp-4 pointer-events-none">
        &ldquo;{row.text}&rdquo;
      </p>
      <div className="pointer-events-none">
        <p className="font-display text-sm font-semibold text-foreground">{row.name}</p>
        <p className="font-body text-xs text-muted-foreground">{row.location}</p>
        {formattedDate && <p className="font-body text-xs text-muted-foreground mt-1">{formattedDate}</p>}
        <p className="font-body text-xs text-primary mt-2 font-medium">Swipe or drag to browse · tap to read</p>
      </div>
    </div>
  );
}

const TestimonialsSection = () => {
  const [userFeedback, setUserFeedback] = useState<StoredFeedback[]>(() => loadUserFeedback());
  const [ratingFilter, setRatingFilter] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
  const [addOpen, setAddOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [dialogMobileFilterOpen, setDialogMobileFilterOpen] = useState(false);
  const [activeReview, setActiveReview] = useState<ReviewRow | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const [formName, setFormName] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formText, setFormText] = useState("");

  const rows = useMemo(() => toRows(testimonials, userFeedback), [userFeedback]);
  const filteredRows = useMemo(
    () => (ratingFilter === 0 ? rows : rows.filter((row) => row.rating === ratingFilter)),
    [rows, ratingFilter],
  );

  const carouselPlugins = useMemo(() => {
    if (filteredRows.length < 2) return [];
    return [
      Autoplay({
        delay: reduceMotion ? 7000 : 3000,
        playOnInit: true,
        stopOnMouseEnter: false,
        stopOnInteraction: false,
        stopOnFocusIn: false,
      }),
    ];
  }, [reduceMotion, filteredRows.length]);

  const resetForm = useCallback(() => {
    setFormName("");
    setFormLocation("");
    setFormRating(5);
    setFormText("");
  }, []);

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    const name = formName.trim();
    const text = formText.trim();
    const location = formLocation.trim() || "Sri Lanka";
    if (!name || !text) {
      toast.error("Please add your name and a short message.");
      return;
    }
    try {
      const entry: Testimonial = {
        name,
        location,
        rating: Math.min(5, Math.max(1, formRating)),
        text,
      };
      const saved = appendUserFeedback(entry);
      setUserFeedback((prev) => [...prev, saved]);
      toast.success("Thanks — your feedback was saved on this device.");
      resetForm();
      setAddOpen(false);
    } catch {
      toast.error("Could not save feedback. Storage may be full or disabled.");
    }
  };

  return (
    <section id="reviews" className="section-padding section-luxury-reviews overflow-hidden">
      {/* Floating orbs */}
      <div className="section-orb section-orb-lg" style={{ top: "-60px", right: "-80px", opacity: 0.5 }} aria-hidden />
      <div className="section-orb section-orb-md" style={{ bottom: "20px", left: "-50px", animationDelay: "6s", opacity: 0.42 }} aria-hidden />
      <div className="section-orb section-orb-sm" style={{ top: "45%", right: "8%", animationDelay: "3s", opacity: 0.35 }} aria-hidden />

      <div className="container-narrow mx-auto relative z-10">
        <AnimatedSection variant="zoom" className="text-center mb-10">
          <h2 className="section-heading-premium">
            What Our <span className="text-primary">Customers</span> Say
          </h2>
          <p className="text-body max-w-2xl mx-auto mb-8">
            Real words from real people who've made Lingan Cream House a part of their lives. Reviews rotate
            automatically — swipe or drag the cards (like an Instagram post), or use the arrows and dots. Tap a card to read the full story.
          </p>
          <div className="mb-4 flex justify-center sm:hidden">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-2 rounded-full px-4"
              onClick={() => setMobileFilterOpen((prev) => !prev)}
              aria-expanded={mobileFilterOpen}
            >
              <SlidersHorizontal size={14} />
              Filter by rating
            </Button>
          </div>
          <AnimatePresence initial={false}>
            {mobileFilterOpen && (
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="mb-6 overflow-hidden sm:hidden"
              >
                <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-border/70 bg-card/70 p-3">
                  <Button
                    type="button"
                    variant={ratingFilter === 0 ? "default" : "outline"}
                    size="sm"
                    className="rounded-full px-4"
                    onClick={() => setRatingFilter(0)}
                  >
                    All Ratings
                  </Button>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <Button
                      key={rating}
                      type="button"
                      variant={ratingFilter === rating ? "default" : "outline"}
                      size="sm"
                      className="gap-1 rounded-full px-3"
                      onClick={() => setRatingFilter(rating as 1 | 2 | 3 | 4 | 5)}
                    >
                      <Star size={14} className={cn(ratingFilter === rating ? "fill-current" : "fill-primary text-primary")} />
                      {rating}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="mb-6 hidden flex-wrap items-center justify-center gap-2 sm:flex">
            <Button
              type="button"
              variant={ratingFilter === 0 ? "default" : "outline"}
              size="sm"
              className="rounded-full px-4"
              onClick={() => setRatingFilter(0)}
            >
              All Ratings
            </Button>
            {[5, 4, 3, 2, 1].map((rating) => (
              <Button
                key={rating}
                type="button"
                variant={ratingFilter === rating ? "default" : "outline"}
                size="sm"
                className="gap-1 rounded-full px-3"
                onClick={() => setRatingFilter(rating as 1 | 2 | 3 | 4 | 5)}
              >
                <Star size={14} className={cn(ratingFilter === rating ? "fill-current" : "fill-primary text-primary")} />
                {rating}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button type="button" variant="default" className="gap-2" onClick={() => setAddOpen(true)}>
              <MessageSquarePlus size={18} />
              Add Feedback
            </Button>
            <Button type="button" variant="outline" className="gap-2" onClick={() => setViewOpen(true)}>
              <List size={18} />
              View all feedbacks
            </Button>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.12} variant="fade-up">
        <div className="relative -mx-4 sm:mx-0 px-4 sm:px-12 md:px-14">
          <Carousel
            opts={{
              align: "start",
              loop: filteredRows.length > 1,
              skipSnaps: false,
              dragFree: false,
              watchDrag: true,
              dragThreshold: 8,
            }}
            plugins={carouselPlugins}
            className="w-full"
          >
            <CarouselPrevious
              variant="outline"
              className="hidden sm:inline-flex !left-0 top-[42%] -translate-y-1/2 z-10 h-10 w-10 rounded-full border-border bg-card/95 shadow-md backdrop-blur-sm hover:bg-card disabled:opacity-35"
            />
            <CarouselNext
              variant="outline"
              className="hidden sm:inline-flex !right-0 top-[42%] -translate-y-1/2 z-10 h-10 w-10 rounded-full border-border bg-card/95 shadow-md backdrop-blur-sm hover:bg-card disabled:opacity-35"
            />
            <CarouselContent className="-ml-3 sm:-ml-4 cursor-grab active:cursor-grabbing">
              {filteredRows.map((row) => (
                <CarouselItem
                  key={row.rowKey}
                  className="pl-3 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <ReviewCard row={row} onOpen={() => setActiveReview(row)} />
                </CarouselItem>
              ))}
            </CarouselContent>
            {filteredRows.length > 0 ? (
              <CarouselDots className="pb-1" />
            ) : (
              <p className="py-10 text-center font-body text-sm text-muted-foreground">
                No feedback found for {ratingFilter}-star rating.
              </p>
            )}
          </Carousel>
        </div>
        </AnimatedSection>
      </div>

      <Dialog
        open={addOpen}
        onOpenChange={(open) => {
          setAddOpen(open);
          if (!open) resetForm();
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add feedback</DialogTitle>
            <DialogDescription>
              Share a few words about your visit. This is saved only in your browser on this device.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitFeedback} className="grid gap-4 pt-2">
            <div className="grid gap-2">
              <Label htmlFor="fb-name">Name</Label>
              <Input
                id="fb-name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fb-location">Town / city (optional)</Label>
              <Input
                id="fb-location"
                value={formLocation}
                onChange={(e) => setFormLocation(e.target.value)}
                placeholder="e.g. Nallur"
                autoComplete="address-level2"
              />
            </div>
            <div className="grid gap-2">
              <span className="text-sm font-medium leading-none">Rating</span>
              <div className="flex gap-1" role="group" aria-label="Star rating">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    className="p-1 rounded-md hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    onClick={() => setFormRating(n)}
                    aria-label={`${n} star${n > 1 ? "s" : ""}`}
                  >
                    <Star
                      size={28}
                      className={n <= formRating ? "fill-primary text-primary" : "text-muted-foreground/40"}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fb-text">Your message</Label>
              <Textarea
                id="fb-text"
                value={formText}
                onChange={(e) => setFormText(e.target.value)}
                placeholder="What did you enjoy?"
                rows={4}
                required
                className="resize-none"
              />
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button type="button" variant="outline" onClick={() => setAddOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit feedback</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={activeReview !== null}
        onOpenChange={(open) => {
          if (!open) setActiveReview(null);
        }}
      >
        <DialogContent className="sm:max-w-lg">
          {activeReview && (
            <>
              {(() => {
                const formattedDate = formatFeedbackDate(activeReview.submittedAt);
                return (
              <DialogHeader className="text-left space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex gap-1">
                    {Array.from({ length: activeReview.rating }).map((_, j) => (
                      <Star key={j} size={18} className="fill-primary text-primary" />
                    ))}
                  </div>
                  {activeReview.fromVisitor ? (
                    <span className="text-xs font-body text-muted-foreground">
                      Visitor{formattedDate ? ` · ${formattedDate}` : ""}
                    </span>
                  ) : (
                    <span className="text-xs font-body text-muted-foreground">
                      Featured{formattedDate ? ` · ${formattedDate}` : ""}
                    </span>
                  )}
                </div>
                <DialogTitle className="font-display text-2xl leading-tight pr-8">
                  {activeReview.name}
                </DialogTitle>
                <p className="font-body text-sm text-muted-foreground">{activeReview.location}</p>
                <DialogDescription asChild>
                  <p className="font-body text-base leading-relaxed text-muted-foreground italic pt-2">
                    &ldquo;{activeReview.text}&rdquo;
                  </p>
                </DialogDescription>
              </DialogHeader>
                );
              })()}
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>All feedback</DialogTitle>
            <DialogDescription>
              Featured stories and submissions saved on this device ({filteredRows.length} {filteredRows.length === 1 ? "review" : "reviews"}).
            </DialogDescription>
          </DialogHeader>
          <div className="mb-1 flex justify-end sm:hidden">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-2 rounded-full px-4"
              onClick={() => setDialogMobileFilterOpen((prev) => !prev)}
              aria-expanded={dialogMobileFilterOpen}
            >
              <SlidersHorizontal size={14} />
              Filter
            </Button>
          </div>
          <AnimatePresence initial={false}>
            {dialogMobileFilterOpen && (
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="overflow-hidden sm:hidden"
              >
                <div className="mb-2 flex flex-wrap items-center gap-2 rounded-2xl border border-border/70 bg-card/70 p-3">
                  <Button
                    type="button"
                    variant={ratingFilter === 0 ? "default" : "outline"}
                    size="sm"
                    className="rounded-full px-4"
                    onClick={() => setRatingFilter(0)}
                  >
                    All Ratings
                  </Button>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <Button
                      key={rating}
                      type="button"
                      variant={ratingFilter === rating ? "default" : "outline"}
                      size="sm"
                      className="gap-1 rounded-full px-3"
                      onClick={() => setRatingFilter(rating as 1 | 2 | 3 | 4 | 5)}
                    >
                      <Star size={14} className={cn(ratingFilter === rating ? "fill-current" : "fill-primary text-primary")} />
                      {rating}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="hidden flex-wrap items-center gap-2 sm:flex">
            <Button
              type="button"
              variant={ratingFilter === 0 ? "default" : "outline"}
              size="sm"
              className="rounded-full px-4"
              onClick={() => setRatingFilter(0)}
            >
              All Ratings
            </Button>
            {[5, 4, 3, 2, 1].map((rating) => (
              <Button
                key={`dialog-${rating}`}
                type="button"
                variant={ratingFilter === rating ? "default" : "outline"}
                size="sm"
                className="gap-1 rounded-full px-3"
                onClick={() => setRatingFilter(rating as 1 | 2 | 3 | 4 | 5)}
              >
                <Star size={14} className={cn(ratingFilter === rating ? "fill-current" : "fill-primary text-primary")} />
                {rating}
              </Button>
            ))}
          </div>
          <div className="overflow-y-auto pr-1 -mr-1 space-y-4 min-h-0 flex-1 scrollbar-none">
            {filteredRows.map((row) => {
              const formattedDate = formatFeedbackDate(row.submittedAt);
              return (
                <div
                  key={row.rowKey}
                  className="rounded-xl border border-border/60 bg-card p-5 shadow-[var(--shadow-soft)]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex gap-1">
                      {Array.from({ length: row.rating }).map((_, j) => (
                        <Star key={j} size={14} className="fill-primary text-primary" />
                      ))}
                    </div>
                    {row.fromVisitor ? (
                      <span className="text-xs font-body text-muted-foreground">
                        Visitor{formattedDate ? ` · ${formattedDate}` : ""}
                      </span>
                    ) : (
                      <span className="text-xs font-body text-muted-foreground">
                        Featured{formattedDate ? ` · ${formattedDate}` : ""}
                      </span>
                    )}
                  </div>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed italic mb-4">
                    &ldquo;{row.text}&rdquo;
                  </p>
                  <p className="font-display text-sm font-semibold text-foreground">{row.name}</p>
                  <p className="font-body text-xs text-muted-foreground">{row.location}</p>
                </div>
              );
            })}
            {filteredRows.length === 0 && (
              <p className="py-6 text-center font-body text-sm text-muted-foreground">
                No feedback available for the selected rating.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TestimonialsSection;
