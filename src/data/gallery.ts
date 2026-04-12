import galleryShakes from "@/assets/gallery-shakes.jpg";
import galleryFamily from "@/assets/gallery-family.jpg";
import galleryCounter from "@/assets/gallery-counter.jpg";
import galleryDrinks from "@/assets/gallery-drinks.jpg";
import gallerySundae from "@/assets/gallery-sundae.jpg";
import rosePistachio from "@/assets/rose-pistachio.jpg";
import falooda from "@/assets/falooda.jpg";
import brownieSundae from "@/assets/brownie-sundae.jpg";

export interface GalleryImage {
  src: string;
  alt: string;
  span?: "wide" | "tall" | "normal";
}

export const galleryImages: GalleryImage[] = [
  { src: galleryShakes, alt: "Colourful milkshakes at Lingan Cream House", span: "wide" },
  { src: rosePistachio, alt: "Rose & Pistachio ice cream", span: "normal" },
  { src: galleryFamily, alt: "Family enjoying desserts", span: "wide" },
  { src: falooda, alt: "Heritage Falooda", span: "tall" },
  { src: galleryCounter, alt: "Ice cream display counter", span: "wide" },
  { src: brownieSundae, alt: "Warm Brownie Sundae", span: "normal" },
  { src: galleryDrinks, alt: "Fresh tropical drinks", span: "wide" },
  { src: gallerySundae, alt: "Banana Split Sundae", span: "normal" },
];
