import { useState } from "react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { menuCategories } from "@/data/menu";
import type { MenuItem } from "@/data/menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { tabPillLayoutTransition } from "@/lib/tab-pill-motion";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";

const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

const MenuSection = () => {
  const reduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState(menuCategories[0].id);
  const [selected, setSelected] = useState<{ item: MenuItem; categoryLabel: string } | null>(null);

  const activeCategory = menuCategories.find((c) => c.id === activeTab)!;

  const openItem = (item: MenuItem, categoryLabel: string) => {
    setSelected({ item, categoryLabel });
  };

  return (
    <section id="menu" className="section-padding section-luxury-menu overflow-hidden">
      {/* Floating orbs */}
      <div className="section-orb section-orb-lg" style={{ top: "-60px", left: "-80px", opacity: 0.5 }} aria-hidden />
      <div className="section-orb section-orb-md" style={{ bottom: "-40px", right: "-60px", animationDelay: "7s", opacity: 0.45 }} aria-hidden />
      <div className="section-orb section-orb-sm" style={{ top: "40%", right: "5%", animationDelay: "3s", opacity: 0.35 }} aria-hidden />

      <div className="container-narrow mx-auto relative z-10">
        <AnimatedSection variant="zoom" className="text-center mb-6 sm:mb-10">
          <h2 className="section-heading-premium max-sm:!text-2xl max-sm:!leading-snug sm:text-4xl">
            Our <span className="gradient-text">Menu</span>
          </h2>
          <p className="text-body max-sm:!text-sm max-sm:!leading-relaxed max-w-2xl mx-auto">
            Over 50 handcrafted items — from classic ice creams to refreshing drinks.
            Select any item to open a full card with details and pricing — something for everyone at Lingan Cream House.
          </p>
        </AnimatedSection>

        {/* Tabs */}
        <AnimatedSection delay={0.1} variant="fade-up">
          <LayoutGroup id="menu-category-tabs">
            <div
              className="mb-6 sm:mb-10 flex flex-wrap justify-center gap-2 sm:gap-2.5"
              role="tablist"
              aria-label="Menu categories"
            >
              {menuCategories.map((cat) => {
                const isActive = activeTab === cat.id;
                return (
                  <motion.button
                    key={cat.id}
                    type="button"
                    role="tab"
                    layout={false}
                    aria-selected={isActive}
                    onClick={() => setActiveTab(cat.id)}
                    whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                    whileHover={!reduceMotion && !isActive ? { y: -2, scale: 1.02 } : undefined}
                    transition={{ type: "spring", stiffness: 480, damping: 32 }}
                    className={cn(
                      "relative shrink-0 overflow-hidden whitespace-nowrap rounded-full px-3 py-1.5 font-body text-xs font-semibold sm:px-6 sm:py-3 sm:text-sm",
                      "transition-[color,box-shadow] duration-300 ease-out",
                      isActive
                        ? "text-primary-foreground"
                        : cn(
                            "text-muted-foreground hover:text-foreground",
                            "border border-primary/12 bg-card shadow-sm",
                            "hover:border-primary/25 hover:shadow-[0_10px_28px_-12px_hsl(var(--primary)/0.22)]",
                          ),
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="menuCategoryActivePill"
                        initial={false}
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-primary to-gold-glow shadow-[0_8px_28px_-8px_hsl(var(--primary)/0.45)] ring-1 ring-white/25"
                        transition={reduceMotion ? { duration: 0 } : tabPillLayoutTransition}
                        aria-hidden
                      />
                    )}
                    <span className="relative z-10">{cat.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </LayoutGroup>
        </AnimatedSection>

        {/* Menu Items */}
        <div className="grid grid-cols-2 gap-2 sm:gap-5 lg:grid-cols-4">
          {activeCategory.items.map((item, i) => (
            <AnimatedSection key={`${activeCategory.id}-${item.name}`} delay={i * 0.05} variant="fade-up">
              <motion.button
                type="button"
                onClick={() => openItem(item, activeCategory.label)}
                className="card-premium group w-full overflow-hidden p-0 text-left max-sm:rounded-xl max-sm:shadow-md"
                whileHover={reduceMotion ? {} : { y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                aria-label={`View ${item.name} — ${item.price}`}
              >
                <div className="relative h-[128px] w-full overflow-hidden sm:h-auto sm:aspect-square">
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    width={512}
                    height={512}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.1]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-2.5 sm:p-6 space-y-0.5 sm:space-y-2 relative bg-card/50 backdrop-blur-sm group-hover:bg-primary/[0.03] transition-colors duration-500">
                  <p className="hidden text-[10px] font-semibold uppercase tracking-[0.15em] text-primary/80 sm:block">
                    {activeCategory.label}
                  </p>
                  <h3 className="font-display text-[0.8125rem] leading-snug sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-display text-sm sm:text-lg font-bold text-primary">{item.price}</p>
                    <ShoppingCart
                      className="h-3.5 w-3.5 shrink-0 text-primary sm:h-5 sm:w-5"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </div>
                </div>
              </motion.button>
            </AnimatedSection>
          ))}
        </div>
      </div>

      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent
          className={cn(
            "max-w-lg gap-0 border-border/60 p-0 overflow-hidden max-sm:max-h-[90vh] max-sm:overflow-y-auto sm:rounded-2xl shadow-[var(--shadow-elevated)]",
            "[&>button]:right-3 [&>button]:top-3 [&>button]:z-20 [&>button]:rounded-full [&>button]:border-0",
            "[&>button]:bg-background/90 [&>button]:text-foreground [&>button]:shadow-md [&>button]:opacity-100",
            "[&>button]:hover:bg-background",
          )}
        >
          {selected && (
            <>
              <div className="relative bg-muted">
                <img
                  src={selected.item.image}
                  alt=""
                  width={800}
                  height={600}
                  className="w-full aspect-[4/3] max-sm:max-h-[38vh] max-sm:object-cover object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/90 to-transparent pointer-events-none" />
              </div>
              <DialogHeader className="p-4 pt-3 sm:p-6 sm:pt-4 text-left space-y-2 sm:space-y-3">
                <p className="text-[10px] sm:text-xs font-body font-semibold uppercase tracking-wider text-primary">
                  {selected.categoryLabel}
                </p>
                <DialogTitle className="font-display text-xl sm:text-3xl leading-tight pr-8">
                  {selected.item.name}
                </DialogTitle>
                <DialogDescription className="font-body text-sm sm:text-base leading-relaxed text-muted-foreground italic">
                  {selected.item.description}
                </DialogDescription>
                <div className="flex items-center justify-between gap-3 border-t border-border/50 pt-3 sm:pt-4">
                  <p className="font-display text-lg sm:text-xl font-bold gradient-text">{selected.item.price}</p>
                  <ShoppingCart
                    className="h-5 w-5 shrink-0 text-primary sm:h-6 sm:w-6"
                    strokeWidth={2}
                    aria-hidden
                  />
                </div>
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default MenuSection;
