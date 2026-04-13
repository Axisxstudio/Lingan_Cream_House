import { MapPin, Phone, Mail } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import logo from "@/assets/logo.png";
import { BRANCHES, getGoogleMapsOpenBranchUrl } from "@/data/branches";

const footerLinks = [
  { label: "Home",    href: "#home" },
  { label: "About",   href: "#about" },
  { label: "Menu",    href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

const Footer = () => {
  const reduceMotion = useReducedMotion();

  const colVariant = {
    hidden: { opacity: 0, y: 24 },
    show:   { opacity: 1, y: 0 },
  };

  const colParent = {
    hidden: {},
    show: {
      transition: reduceMotion
        ? { duration: 0 }
        : { staggerChildren: 0.09, delayChildren: 0.05 },
    },
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(170deg, hsl(158 48% 10%) 0%, hsl(156 52% 7%) 100%)",
        color: "hsl(150 38% 98% / 0.8)",
      }}
    >
      {/* Decorative orbs on dark bg */}
      <div
        style={{
          position: "absolute", borderRadius: "50%", pointerEvents: "none",
          width: 400, height: 400, top: -120, left: -100,
          background: "radial-gradient(circle, hsl(152 50% 38% / 0.18), transparent 70%)",
          animation: reduceMotion ? "none" : "orb-drift 28s ease-in-out infinite",
        }}
        aria-hidden
      />
      <div
        style={{
          position: "absolute", borderRadius: "50%", pointerEvents: "none",
          width: 280, height: 280, bottom: -80, right: -60,
          background: "radial-gradient(circle, hsl(156 44% 34% / 0.14), transparent 70%)",
          animation: reduceMotion ? "none" : "orb-drift-reverse 20s ease-in-out infinite",
          animationDelay: "6s",
        }}
        aria-hidden
      />
      {/* Top shimmer accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <div className="container-narrow mx-auto">
          <motion.div
            variants={colParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8"
          >
            {/* Brand */}
            <motion.div
              variants={colVariant}
              transition={{ duration: 0.6, ease: easeOutExpo }}
              className="sm:col-span-2 lg:col-span-1 xl:col-span-1"
            >
              <div className="flex items-center gap-3 mb-3">
                <motion.img
                  src={logo}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain opacity-95"
                  decoding="async"
                  animate={reduceMotion ? {} : { rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <div>
                  <h3 className="font-display text-xl font-bold text-background mb-0.5">
                    Lingan Cream House
                  </h3>
                  <p className="font-body text-xs opacity-60">Since 1970</p>
                </div>
              </div>
              <p className="font-body text-sm leading-relaxed opacity-70">
                A beloved dessert destination with branches in Sri Lanka and Canada —
                trusted by three generations for quality, warmth, and unforgettable flavours.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              variants={colVariant}
              transition={{ duration: 0.6, ease: easeOutExpo }}
            >
              <h4 className="font-display text-sm font-semibold text-background mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <motion.a
                      href={link.href}
                      className="font-body text-sm opacity-70 hover:opacity-100 transition-all duration-200 hover:pl-1 inline-block"
                      whileHover={reduceMotion ? {} : { x: 4 }}
                      transition={{ duration: 0.18 }}
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Branches */}
            <motion.div
              variants={colVariant}
              transition={{ duration: 0.6, ease: easeOutExpo }}
            >
              <h4 className="font-display text-sm font-semibold text-background mb-4">
                Branches
              </h4>
              <ul className="space-y-2">
                {BRANCHES.map((branch) => (
                  <li key={branch.id} className="font-body text-sm flex items-start gap-2">
                    <MapPin size={14} className="mt-0.5 flex-shrink-0 opacity-60" aria-hidden />
                    <motion.a
                      href={getGoogleMapsOpenBranchUrl(branch)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-70 hover:opacity-100 transition-opacity underline-offset-2 hover:underline"
                      whileHover={reduceMotion ? {} : { x: 3 }}
                      transition={{ duration: 0.18 }}
                    >
                      {branch.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div
              variants={colVariant}
              transition={{ duration: 0.6, ease: easeOutExpo }}
            >
              <h4 className="font-display text-sm font-semibold text-background mb-4">
                Contact
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <MapPin size={14} className="mt-1 flex-shrink-0 opacity-60" />
                  <span className="font-body text-sm opacity-70">
                    Multiple branches in Sri Lanka & Canada — see Branches for locations.
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={14} className="flex-shrink-0 opacity-60" />
                  <a href="tel:+94212223456" className="font-body text-sm opacity-70 hover:opacity-100 transition-opacity">
                    +94 21 222 3456
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={14} className="flex-shrink-0 opacity-60" />
                  <a href="mailto:hello@lingancreamhouse.lk" className="font-body text-sm opacity-70 hover:opacity-100 transition-opacity">
                    hello@lingancreamhouse.lk
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Hours */}
            <motion.div
              variants={colVariant}
              transition={{ duration: 0.6, ease: easeOutExpo }}
            >
              <h4 className="font-display text-sm font-semibold text-background mb-4">
                Opening Hours
              </h4>
              <ul className="space-y-2 font-body text-sm opacity-70">
                <li>Monday – Sunday</li>
                <li>10:00 AM – 10:00 PM</li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Bottom bar */}
          <motion.div
            className="mt-12 pt-8 border-t border-background/10 text-center"
            initial={reduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <p className="font-body text-sm opacity-50">
              © {new Date().getFullYear()} Lingan Cream House. All rights reserved. Branches in Sri Lanka & Canada.
            </p>
            <p className="mt-2 font-body text-xs opacity-60">
              Designed &amp; Developed by{" "}
              <a
                href="https://axisxstudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-background/85 transition-opacity hover:opacity-100 hover:underline underline-offset-4"
              >
                AxisX Studio
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
