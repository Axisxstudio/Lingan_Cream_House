import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { BRANCH_LOCATIONS } from "@/data/branches";
import { BranchLocationsMap } from "@/components/BranchLocationsMap";

const branchLocationsLine = BRANCH_LOCATIONS.join(" · ");

const contactDetails = [
  { icon: MapPin, label: "Branches",   value: branchLocationsLine },
  { icon: Phone,  label: "Phone",  value: "+94 21 222 3456",          href: "tel:+94212223456" },
  { icon: Mail,   label: "Email",  value: "hello@lingancreamhouse.lk", href: "mailto:hello@lingancreamhouse.lk" },
  { icon: Clock,  label: "Hours",  value: "Mon–Sun: 10:00 AM – 10:00 PM" },
];

const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ContactSection = () => {
  const reduceMotion = useReducedMotion();
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [phone,   setPhone]   = useState("");
  const [message, setMessage] = useState("");

  const resetForm = () => { setName(""); setEmail(""); setPhone(""); setMessage(""); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim(); const em = email.trim(); const msg = message.trim();
    if (!n || !em || !msg) { toast.error("Please fill in your name, email, and message."); return; }
    toast.error("Currently you can't send messages. Please try again later.");
  };

  return (
    <section id="contact" className="section-padding section-luxury-contact overflow-hidden">
      {/* Floating orbs */}
      <div className="section-orb section-orb-lg" style={{ top: "-70px", right: "-80px", opacity: 0.52 }} aria-hidden />
      <div className="section-orb section-orb-md" style={{ bottom: "-50px", left: "-60px", animationDelay: "7s", opacity: 0.42 }} aria-hidden />
      <div className="section-orb section-orb-sm" style={{ top: "30%", right: "4%", animationDelay: "4s", opacity: 0.35 }} aria-hidden />

      <div className="container-narrow mx-auto relative z-10">
        <AnimatedSection variant="zoom" className="text-center mb-14">
          <h2 className="section-heading-premium">
            Visit <span className="text-primary">Us</span>
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Choose a branch on the map, get directions in Google Maps, or send us a note below.
          </p>
        </AnimatedSection>

        <div className="grid min-w-0 gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Left — contact details + WhatsApp */}
          <AnimatedSection variant="fade-left" className="min-w-0">
            <div className="mb-8 space-y-4">
              {contactDetails.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={reduceMotion ? false : { opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: easeOutExpo }}
                  whileHover={reduceMotion ? {} : { x: 4 }}
                  className="card-premium flex min-w-0 items-start gap-4 overflow-hidden p-5 group"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10 group-hover:bg-primary/18 transition-colors duration-300">
                    <item.icon size={18} className="text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="mb-1 font-body text-xs uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="block break-words text-pretty font-body text-sm font-medium leading-relaxed text-foreground underline-offset-2 transition-colors hover:text-primary"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="break-words text-pretty font-body text-sm font-medium leading-relaxed text-foreground">
                        {item.value}
                      </p>
                    )}
                  </div>
                  {/* Right accent line */}
                  <div className="absolute right-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                </motion.div>
              ))}
            </div>

            <motion.a
              href="https://wa.me/94212223456?text=Hi%20Lingan%20Cream%20House!%20I'd%20like%20to%20know%20more%20about%20your%20menu."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full justify-center"
              whileHover={reduceMotion ? {} : { scale: 1.02, y: -2 }}
              whileTap={reduceMotion ? {} : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              <WhatsAppIcon className="h-[18px] w-[18px]" />
              Chat on WhatsApp
            </motion.a>
          </AnimatedSection>

          {/* Right — form + map */}
          <AnimatedSection delay={0.15} variant="fade-right" className="min-w-0">
            <div className="flex h-full flex-col gap-8">
              {/* Message form */}
              <motion.div
                className="card-premium p-6 sm:p-8 relative overflow-hidden"
                whileHover={reduceMotion ? {} : { boxShadow: "0 24px 64px -14px hsl(152 38% 18% / 0.16)" }}
                transition={{ duration: 0.35 }}
              >
                {/* Top accent */}
                <div className="absolute top-0 left-6 right-6 h-[2px] rounded-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                  Send us a message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="contact-name">Name</Label>
                    <Input
                      id="contact-name" name="name" value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name" placeholder="Your name"
                      className="rounded-2xl focus:ring-primary/40" required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email" name="email" type="email" value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email" placeholder="you@example.com"
                      className="rounded-2xl focus:ring-primary/40" required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="contact-phone">
                      Phone <span className="text-muted-foreground font-normal">(optional)</span>
                    </Label>
                    <Input
                      id="contact-phone" name="phone" type="tel" value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      autoComplete="tel" placeholder="+94 …"
                      className="rounded-2xl focus:ring-primary/40"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea
                      id="contact-message" name="message" value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help?" rows={5}
                      className="resize-none rounded-2xl min-h-[120px] focus:ring-primary/40" required
                    />
                  </div>
                  <div className="w-full pt-1 sm:flex sm:justify-end">
                    <motion.div
                      whileHover={reduceMotion ? {} : { scale: 1.02 }}
                      whileTap={reduceMotion ? {} : { scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 400, damping: 22 }}
                      className="w-full sm:w-auto"
                    >
                      <Button
                        type="submit"
                        size="lg"
                        className="h-auto min-h-11 w-full gap-2 whitespace-normal rounded-2xl px-6 py-3 text-base font-semibold sm:w-auto sm:whitespace-nowrap"
                      >
                        <Send size={18} className="shrink-0" aria-hidden />
                        <span>Send message</span>
                      </Button>
                    </motion.div>
                  </div>
                </form>
              </motion.div>

              {/* Map */}
              <div id="branch-locations" className="card-premium overflow-hidden p-4 sm:p-5 flex-1 flex flex-col min-h-0">
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">Branch locations</h3>
                <p className="font-body text-sm text-muted-foreground mb-4">
                  Every branch on one map — tap a location to zoom in, or tap it again to see the full view.
                </p>
                <div className="w-full flex flex-col flex-1 min-h-[280px]">
                  <BranchLocationsMap />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
