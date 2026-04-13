import type { Transition } from "framer-motion";

/** Shared layoutId pill: smooth point-to-point travel between tabs (not springy). */
export const tabPillLayoutTransition: Transition = {
  type: "tween",
  duration: 0.45,
  ease: [0.25, 0.1, 0.25, 1],
};
