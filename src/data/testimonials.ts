export interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
  submittedAt?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Kavitha Rajaratnam",
    location: "Nallur branch",
    rating: 5,
    text: "We've been coming to Lingan Cream House since I was a child. The falooda is still the best — generous portions and authentic taste every single time.",
    submittedAt: "2025-12-18T09:15:00.000Z",
  },
  {
    name: "Suren Mahendran",
    location: "Colombo",
    rating: 5,
    text: "Every time I'm in town, Lingan Cream House is a must-stop. The Rose & Pistachio ice cream is absolutely divine. A true institution!",
    submittedAt: "2026-01-07T12:10:00.000Z",
  },
  {
    name: "Priya Selvanathan",
    location: "Clock Tower Road",
    rating: 5,
    text: "My family's go-to place for desserts. The warm brownie sundae is heavenly and the staff always treats us like family. Three generations of trust!",
    submittedAt: "2026-01-22T17:40:00.000Z",
  },
  {
    name: "Arjun Krishnapillai",
    location: "Kilinochchi",
    rating: 5,
    text: "Best milkshakes in the Northern Province, hands down. Fair prices, huge servings, and the quality has never dropped in all these years.",
    submittedAt: "2026-02-04T15:30:00.000Z",
  },
  {
    name: "Meena Yogeswaran",
    location: "Sannithi",
    rating: 5,
    text: "I bring all my guests from abroad here. Lingan Cream House represents the best of our culinary heritage. The mango sundae is our family favourite!",
    submittedAt: "2026-02-18T11:05:00.000Z",
  },
  {
    name: "Dinesh Kumar",
    location: "Batticaloa",
    rating: 5,
    text: "Drove two hours just for their Heritage Falooda and it was absolutely worth it. The atmosphere is warm and welcoming — a real gem.",
    submittedAt: "2026-03-03T19:20:00.000Z",
  },
];
