import { MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={logo}
                alt=""
                width={48}
                height={48}
                className="h-12 w-12 object-contain opacity-95"
                decoding="async"
              />
              <div>
                <h3 className="font-display text-xl font-bold text-background mb-0.5">Lingan Cream House</h3>
                <p className="font-body text-xs opacity-60">Since 1970</p>
              </div>
            </div>
            <p className="font-body text-sm leading-relaxed opacity-70">
              Jaffna's beloved dessert destination — trusted by three generations
              for quality, warmth, and unforgettable flavours.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-semibold text-background mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="font-body text-sm opacity-70 hover:opacity-100 transition-opacity">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-semibold text-background mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-1 flex-shrink-0 opacity-60" />
                <span className="font-body text-sm opacity-70">123 Hospital Road, Jaffna 40000, Sri Lanka</span>
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
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display text-sm font-semibold text-background mb-4">Opening Hours</h4>
            <ul className="space-y-2 font-body text-sm opacity-70">
              <li>Monday – Sunday</li>
              <li>10:00 AM – 10:00 PM</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 text-center">
          <p className="font-body text-sm opacity-50">
            © {new Date().getFullYear()} Lingan Cream House. All rights reserved. Hospital Road, Jaffna, Sri Lanka.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
