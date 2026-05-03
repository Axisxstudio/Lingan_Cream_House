import { useState, useEffect } from "react";
import { ChevronDown, MapPin, Menu, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import logo from "@/assets/logo.png";
import { BRANCHES } from "@/data/branches";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

const easeNav: [number, number, number, number] = [0.22, 1, 0.36, 1];
const easeSpring = { type: "spring", stiffness: 360, damping: 28 };

// Animated Nav Link with glowing underline on hover
function NavLinkItem({
  link,
  scrolled,
  reduceMotion,
  index,
}: {
  link: { label: string; href: string };
  scrolled: boolean;
  reduceMotion: boolean | null;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      key={link.href}
      href={link.href}
      initial={reduceMotion ? false : { opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 + index * 0.06, duration: 0.45, ease: easeNav }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative font-body text-sm font-medium transition-colors duration-200 py-1",
        scrolled
          ? "text-muted-foreground hover:text-primary"
          : "text-primary-foreground/90 hover:text-primary-foreground drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]",
      )}
    >
      {link.label}
      {/* Animated underline */}
      <motion.span
        className={cn(
          "absolute bottom-0 left-0 right-0 h-[2px] rounded-full origin-left",
          scrolled
            ? "bg-gradient-to-r from-primary to-accent"
            : "bg-gradient-to-r from-primary-foreground/80 to-primary-foreground/40",
        )}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.28, ease: easeNav }}
      />
    </motion.a>
  );
}

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopBranchesOpen, setDesktopBranchesOpen] = useState(false);
  const [mobileBranchesOpen, setMobileBranchesOpen] = useState(false);
  const [mobileQuickBranchesOpen, setMobileQuickBranchesOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const goToBranch = (branchId: string) => {
    setDesktopBranchesOpen(false);
    setMobileBranchesOpen(false);
    setMobileQuickBranchesOpen(false);
    setMobileOpen(false);
    const branchSection = document.getElementById("branch-locations");
    const contact = document.getElementById("contact");
    (branchSection ?? contact)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    window.dispatchEvent(new CustomEvent("branch-map-select", { detail: { branchId } }));
    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent("branch-map-select", { detail: { branchId } }));
    }, reduceMotion ? 0 : 420);
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -24, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.38, ease: easeNav, staggerChildren: 0.06, delayChildren: 0.08 },
    },
    exit: { opacity: 0, y: -16, scale: 0.98, transition: { duration: 0.26, ease: "easeIn" } },
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, x: -18 },
    show: { opacity: 1, x: 0, transition: { duration: 0.32, ease: easeNav } },
  };

  return (
    <motion.nav
      initial={reduceMotion ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: easeNav }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "nav-glass-luxury" : "bg-transparent",
      )}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="container-narrow mx-auto">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.a
              href="#home"
              className="flex items-center gap-3 min-w-0"
              whileHover={reduceMotion ? {} : { scale: 1.03 }}
              whileTap={reduceMotion ? {} : { scale: 0.97 }}
              transition={easeSpring}
            >
              <motion.img
                src={logo}
                alt=""
                width={56}
                height={56}
                className="h-11 w-11 sm:h-14 sm:w-14 shrink-0 object-contain drop-shadow-sm"
                decoding="async"
                animate={reduceMotion ? {} : { rotate: [0, 2, -2, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="flex flex-col min-w-0">
                <span
                  className={cn(
                    "font-display text-xl sm:text-2xl font-bold truncate transition-colors duration-300",
                    scrolled
                      ? "bg-gradient-to-r from-[hsl(152_64%_40%)] via-[hsl(156_58%_46%)] to-[hsl(160_62%_38%)] bg-clip-text text-transparent"
                      : "text-primary-foreground drop-shadow-[0_1px_10px_rgba(0,0,0,0.45)]",
                  )}
                >
                  Lingan Cream House
                </span>
                <span
                  className={cn(
                    "text-xs font-body tracking-wider transition-colors duration-300",
                    scrolled ? "text-muted-foreground" : "text-primary-foreground/80",
                  )}
                >
                  Since 1970
                </span>
              </div>
            </motion.a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, i) => (
                <NavLinkItem
                  key={link.href}
                  link={link}
                  scrolled={scrolled}
                  reduceMotion={reduceMotion}
                  index={i}
                />
              ))}

              {/* Branches Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setDesktopBranchesOpen(true)}
                onMouseLeave={() => setDesktopBranchesOpen(false)}
              >
                <motion.button
                  type="button"
                  onClick={() => setDesktopBranchesOpen((prev) => !prev)}
                  initial={reduceMotion ? false : { opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + navLinks.length * 0.06, duration: 0.45, ease: easeNav }}
                  whileHover={reduceMotion ? {} : { scale: 1.04 }}
                  whileTap={reduceMotion ? {} : { scale: 0.97 }}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-body text-sm font-medium transition-all duration-300",
                    scrolled
                      ? "border-primary/30 bg-primary/8 text-primary hover:bg-primary/15 hover:border-primary/50 shadow-sm"
                      : "border-primary-foreground/35 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:border-primary-foreground/55",
                  )}
                  aria-expanded={desktopBranchesOpen}
                  aria-label="Toggle branch list"
                >
                  <MapPin size={15} />
                  Branches
                  <motion.span
                    animate={{ rotate: desktopBranchesOpen ? 180 : 0 }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    className="inline-flex"
                  >
                    <ChevronDown size={14} />
                  </motion.span>
                </motion.button>

                <AnimatePresence>
                  {desktopBranchesOpen && (
                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0, y: -10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="absolute right-0 top-full z-50 mt-3 w-64 rounded-2xl border border-primary/20 bg-gradient-to-b from-[hsl(148_44%_98.5%)] via-[hsl(152_32%_96.5%)] to-[hsl(156_26%_93.5%)] p-2 shadow-[var(--shadow-elevated)] backdrop-blur-xl"
                      style={{ boxShadow: "0 20px 60px -10px hsl(152 48% 18% / 0.18), 0 0 0 1px hsl(152 30% 80% / 0.3)" }}
                    >
                      {/* Top green accent line */}
                      <div className="absolute top-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                      <ul className="space-y-1 mt-1" aria-label="Branches">
                        {BRANCHES.map((branch, i) => (
                          <motion.li
                            key={branch.id}
                            initial={reduceMotion ? false : { opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: reduceMotion ? 0 : i * 0.04, duration: 0.22, ease: easeNav }}
                          >
                            <button
                              type="button"
                              onClick={() => goToBranch(branch.id)}
                              className="group w-full rounded-xl px-3 py-2.5 text-left font-body text-sm text-foreground/85 transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:pl-4"
                            >
                              <span className="flex items-center gap-2">
                                <MapPin size={13} className="text-primary/60 group-hover:text-primary transition-colors shrink-0" />
                                {branch.name}
                              </span>
                            </button>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile Hamburger */}
            <div className="relative flex items-center gap-1 md:hidden">
              <motion.button
                onClick={() => {
                  setMobileQuickBranchesOpen((prev) => {
                    const next = !prev;
                    if (next) setMobileOpen(false);
                    return next;
                  });
                }}
                className={cn(
                  "inline-flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300",
                  scrolled
                    ? "text-[hsl(156_62%_40%)] drop-shadow-[0_2px_6px_hsl(152_58%_30%_/_0.35)]"
                    : "text-primary-foreground drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)] hover:bg-primary-foreground/10",
                )}
                whileHover={reduceMotion ? {} : { scale: 1.08 }}
                whileTap={reduceMotion ? {} : { scale: 0.92 }}
                transition={easeSpring}
                aria-label="Open branches"
                aria-expanded={mobileQuickBranchesOpen}
              >
                <MapPin size={22} />
              </motion.button>
              <motion.button
                onClick={() => {
                  setMobileOpen((prev) => {
                    const next = !prev;
                    if (next) setMobileQuickBranchesOpen(false);
                    return next;
                  });
                }}
                className={cn(
                  "inline-flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300",
                  scrolled
                    ? "text-[hsl(156_62%_40%)] drop-shadow-[0_2px_6px_hsl(152_58%_30%_/_0.35)]"
                    : "text-primary-foreground drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)] hover:bg-primary-foreground/10",
                )}
                whileHover={reduceMotion ? {} : { scale: 1.08 }}
                whileTap={reduceMotion ? {} : { scale: 0.92 }}
                transition={easeSpring}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="inline-flex"
                    >
                      <X size={24} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="inline-flex"
                    >
                      <Menu size={24} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
              <AnimatePresence>
                {mobileQuickBranchesOpen && (
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl border border-primary/20 bg-gradient-to-b from-[hsl(148_44%_98.5%)] via-[hsl(152_32%_96.5%)] to-[hsl(156_26%_93.5%)] p-2 shadow-[var(--shadow-elevated)] backdrop-blur-xl"
                  >
                    <ul className="space-y-1" aria-label="Branches">
                      {BRANCHES.map((branch, i) => (
                        <motion.li
                          key={branch.id}
                          initial={reduceMotion ? false : { opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: reduceMotion ? 0 : i * 0.04, duration: 0.2 }}
                        >
                          <button
                            type="button"
                            onClick={() => goToBranch(branch.id)}
                            className="group w-full rounded-xl px-3 py-2.5 text-left font-body text-sm text-foreground/85 transition-all duration-200 hover:bg-primary/10 hover:text-primary"
                          >
                            <span className="flex items-center gap-2">
                              <MapPin size={13} className="text-primary/60 group-hover:text-primary transition-colors" />
                              {branch.name}
                            </span>
                          </button>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 top-16 sm:top-20 z-40 bg-foreground/10 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="md:hidden relative z-50 border-t border-primary/15"
              style={{
                background: "linear-gradient(180deg, hsl(148 44% 98.5% / 0.97) 0%, hsl(152 32% 96% / 0.97) 100%)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow: "0 24px 64px -12px hsl(152 40% 18% / 0.18)",
              }}
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

              <div className="px-4 sm:px-6">
                <div className="container-narrow mx-auto py-5 space-y-1">
                  {navLinks.map((link) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      variants={mobileLinkVariants}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 font-body text-base font-medium text-foreground/80 transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:pl-5 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shrink-0" />
                      {link.label}
                    </motion.a>
                  ))}

                  {/* Mobile Branches */}
                  <motion.div variants={mobileLinkVariants} className="pt-1">
                    <button
                      type="button"
                      onClick={() => setMobileBranchesOpen((prev) => !prev)}
                      className="flex w-full items-center justify-between rounded-xl border border-primary/20 bg-primary/6 px-4 py-3 font-body text-base font-medium text-foreground transition-all duration-200 hover:bg-primary/12 hover:border-primary/35"
                      aria-expanded={mobileBranchesOpen}
                      aria-label="Toggle branches"
                    >
                      <span className="inline-flex items-center gap-2.5">
                        <MapPin size={16} className="text-primary" />
                        Branches
                      </span>
                      <motion.span
                        animate={{ rotate: mobileBranchesOpen ? 180 : 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="inline-flex"
                      >
                        <ChevronDown size={16} className="text-muted-foreground" />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {mobileBranchesOpen && (
                        <motion.div
                          initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                          transition={{ duration: 0.28, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="mt-2 rounded-2xl border border-primary/15 bg-gradient-to-b from-[hsl(150_40%_98.5%)] to-[hsl(154_30%_95%)] p-2 shadow-[var(--shadow-soft)]">
                            <div className="absolute-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-1" />
                            <ul className="space-y-1" aria-label="Branches">
                              {BRANCHES.map((branch, i) => (
                                <motion.li
                                  key={branch.id}
                                  initial={reduceMotion ? false : { opacity: 0, x: 10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: reduceMotion ? 0 : i * 0.04, duration: 0.2 }}
                                >
                                  <button
                                    type="button"
                                    onClick={() => goToBranch(branch.id)}
                                    className="group w-full rounded-xl px-3 py-2.5 text-left font-body text-sm text-foreground/85 transition-all duration-200 hover:bg-primary/10 hover:text-primary"
                                  >
                                    <span className="flex items-center gap-2">
                                      <MapPin size={13} className="text-primary/60 group-hover:text-primary transition-colors" />
                                      {branch.name}
                                    </span>
                                  </button>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
