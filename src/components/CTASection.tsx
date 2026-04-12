import AnimatedSection from "./AnimatedSection";
import { MapPin } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const CTASection = () => {
  return (
    <section className="section-padding bg-secondary text-secondary-foreground">
      <div className="container-narrow mx-auto text-center">
        <AnimatedSection>
          <h2 className="heading-lg mb-4">
            Come Taste the Tradition
          </h2>
          <p className="font-body text-base sm:text-lg opacity-80 max-w-xl mx-auto mb-8">
            Visit Lingan Cream House on Hospital Road, Jaffna — where every scoop is made
            with love and served with a smile. We're waiting to welcome you!
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="#contact" className="btn-primary">
              <MapPin size={16} />
              Visit Us Today
            </a>
            <a
              href="https://wa.me/94212223456?text=Hi%20Lingan%20Cream%20House!"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp gap-2"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp Us
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CTASection;
