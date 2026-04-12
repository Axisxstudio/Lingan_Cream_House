import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const contactDetails = [
  { icon: MapPin, label: "Address", value: "123 Hospital Road, Jaffna 40000, Sri Lanka" },
  { icon: Phone, label: "Phone", value: "+94 21 222 3456", href: "tel:+94212223456" },
  { icon: Mail, label: "Email", value: "hello@lingancreamhouse.lk", href: "mailto:hello@lingancreamhouse.lk" },
  { icon: Clock, label: "Hours", value: "Mon–Sun: 10:00 AM – 10:00 PM" },
];

const CONTACT_EMAIL = "hello@lingancreamhouse.lk";

const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    const em = email.trim();
    const msg = message.trim();
    if (!n || !em || !msg) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }
    const subject = `Website message from ${n}`;
    const body = `Name: ${n}\nEmail: ${em}\nPhone: ${phone.trim() || "—"}\n\n${msg}`;
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    toast.success("Opening your email app… If it doesn’t open, write to us at " + CONTACT_EMAIL);
    resetForm();
  };

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container-narrow mx-auto">
        <AnimatedSection className="text-center mb-14">
          <h2 className="heading-lg text-foreground mb-4">
            Visit <span className="text-primary">Us</span>
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            We're right on Hospital Road in the heart of Jaffna. Come say hello — or send us a note below.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
          <AnimatedSection>
            <div className="space-y-4 mb-8">
              {contactDetails.map((item) => (
                <div key={item.label} className="card-premium p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="font-body text-sm font-medium text-foreground hover:text-primary transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-body text-sm font-medium text-foreground">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/94212223456?text=Hi%20Lingan%20Cream%20House!%20I'd%20like%20to%20know%20more%20about%20your%20menu."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full justify-center"
            >
              <WhatsAppIcon className="h-[18px] w-[18px]" />
              Chat on WhatsApp
            </a>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="flex flex-col gap-8 h-full">
              <div className="card-premium p-6 sm:p-8">
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">Send us a message</h3>
                <p className="font-body text-sm text-muted-foreground mb-6">
                  We’ll open your email app with your message ready to send to {CONTACT_EMAIL}.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="contact-name">Name</Label>
                    <Input
                      id="contact-name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      placeholder="Your name"
                      className="rounded-2xl"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="rounded-2xl"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="contact-phone">Phone <span className="text-muted-foreground font-normal">(optional)</span></Label>
                    <Input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      autoComplete="tel"
                      placeholder="+94 …"
                      className="rounded-2xl"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help?"
                      rows={5}
                      className="resize-none rounded-2xl min-h-[120px]"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full sm:w-auto gap-2">
                    <Send size={18} />
                    Send message
                  </Button>
                </form>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-card)] flex-1 min-h-[260px] lg:min-h-[280px]">
                <iframe
                  title="Lingan Cream House Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3933.0!2d80.025!3d9.661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMzknNDAuMCJOIDgwwrAwMScyOS4wIkU!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 260 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
