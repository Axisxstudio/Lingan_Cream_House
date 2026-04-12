import type { Testimonial } from "@/data/testimonials";

const STORAGE_KEY = "lingan-cream-house-feedback-v1";

export type StoredFeedback = Testimonial & {
  id: string;
  submittedAt: string;
};

function safeParse(raw: string | null): StoredFeedback[] {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw) as unknown;
    if (!Array.isArray(data)) return [];
    return data.filter(
      (item): item is StoredFeedback =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as StoredFeedback).id === "string" &&
        typeof (item as StoredFeedback).name === "string" &&
        typeof (item as StoredFeedback).text === "string" &&
        typeof (item as StoredFeedback).rating === "number",
    );
  } catch {
    return [];
  }
}

export function loadUserFeedback(): StoredFeedback[] {
  if (typeof window === "undefined") return [];
  return safeParse(localStorage.getItem(STORAGE_KEY));
}

export function saveUserFeedback(items: StoredFeedback[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function appendUserFeedback(entry: Testimonial): StoredFeedback {
  const id =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `fb-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const item: StoredFeedback = {
    ...entry,
    id,
    submittedAt: new Date().toISOString(),
  };
  const next = [...loadUserFeedback(), item];
  saveUserFeedback(next);
  return item;
}
