import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import SignatureItemsSection from "@/components/SignatureItemsSection";
import MenuSection from "@/components/MenuSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (window.location.hash) {
      const cleanUrl = `${window.location.pathname}${window.location.search}`;
      window.history.replaceState(null, "", cleanUrl);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    // Coordinate with PageLoader duration (1.6s) + fade out duration
    const timer = setTimeout(() => setIsLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen texture-overlay">
      <PageLoader />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Navbar />
        <HeroSection />
        <SignatureItemsSection />
        <MenuSection />
        <TestimonialsSection />
        <AboutSection />
        <WhyChooseUsSection />
        <GallerySection />
        <ContactSection />
        <CTASection />
        <Footer />
        <WhatsAppFloat />
      </motion.div>
    </div>
  );
};

export default Index;
