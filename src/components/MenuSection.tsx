import { useState } from "react";
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
import { cn } from "@/lib/utils";

const MenuSection = () => {
  const [activeTab, setActiveTab] = useState(menuCategories[0].id);
  const [selected, setSelected] = useState<{ item: MenuItem; categoryLabel: string } | null>(null);

  const activeCategory = menuCategories.find((c) => c.id === activeTab)!;

  const openItem = (item: MenuItem, categoryLabel: string) => {
    setSelected({ item, categoryLabel });
  };

  return (
    <section id="menu" className="section-padding bg-muted/50">
      <div className="container-narrow mx-auto">
        <AnimatedSection className="text-center mb-10">
          <h2 className="heading-lg text-foreground mb-4">
            Our <span className="gradient-text">Menu</span>
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Over 50 handcrafted items — from classic ice creams to refreshing drinks.
            Select any item to open a full card with details and pricing — something for everyone at Lingan Cream House.
          </p>
        </AnimatedSection>

        {/* Tabs */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`px-5 py-2.5 rounded-xl font-body text-sm font-medium transition-all duration-300 ${
                  activeTab === cat.id
                    ? "bg-gradient-to-r from-primary to-gold-glow text-primary-foreground shadow-lg"
                    : "bg-card text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Menu Items — each row opens a detail card */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {activeCategory.items.map((item, i) => (
            <AnimatedSection key={`${activeCategory.id}-${item.name}`} delay={i * 0.05}>
              <button
                type="button"
                onClick={() => openItem(item, activeCategory.label)}
                className={cn(
                  "card-premium flex gap-4 p-4 items-center w-full text-left cursor-pointer",
                  "hover:shadow-[var(--shadow-elevated)] hover:-translate-y-1",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
                )}
                aria-label={`View ${item.name} — ${item.price}`}
              >
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  width={512}
                  height={512}
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0 pointer-events-none"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base font-semibold text-foreground mb-1 truncate">{item.name}</h3>
                  <p className="font-body text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                </div>
                <span className="font-display text-sm font-bold gradient-text whitespace-nowrap pointer-events-none">
                  {item.price}
                </span>
              </button>
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
            "max-w-lg gap-0 border-border/60 p-0 overflow-hidden sm:rounded-2xl shadow-[var(--shadow-elevated)]",
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
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/90 to-transparent pointer-events-none" />
              </div>
              <DialogHeader className="p-6 pt-4 text-left space-y-3">
                <p className="text-xs font-body font-semibold uppercase tracking-wider text-primary">
                  {selected.categoryLabel}
                </p>
                <DialogTitle className="font-display text-2xl sm:text-3xl leading-tight pr-8">
                  {selected.item.name}
                </DialogTitle>
                <DialogDescription className="font-body text-base leading-relaxed text-muted-foreground italic">
                  {selected.item.description}
                </DialogDescription>
                <p className="font-display text-xl font-bold gradient-text pt-1">{selected.item.price}</p>
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default MenuSection;
