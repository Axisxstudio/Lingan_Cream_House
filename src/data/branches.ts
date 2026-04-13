/**
 * Branch list with Google Maps search queries.
 * To pin an exact listing: open Google Maps → your place → Share → Embed map → copy the iframe `src` into `embedSrc` (optional).
 */
export interface Branch {
  id: string;
  /** Short label (hero pills, tabs, footer) */
  name: string;
  /** Passed to Google Maps search / “Open in Maps” links */
  mapQuery: string;
  /**
   * Map centre + red pin (Google’s default marker) in the embed.
   * Fine-tune in Google Maps → right-click place → coordinates → paste here.
   */
  coords: { lat: number; lng: number };
  /** Optional full embed URL from Google Maps “Share → Embed” (overrides coords embed) */
  embedSrc?: string;
}

export const BRANCHES: Branch[] = [
  {
    id: "clock-tower",
    name: "Clock Tower Road",
    mapQuery: "Lingan Cream House, Clock Tower Road, Jaffna, Sri Lanka",
    coords: { lat: 9.66435, lng: 80.00972 },
  },
  {
    id: "nallur",
    name: "Nallur",
    mapQuery: "Lingan Cream House, 526 Jaffna-Point Pedro Road, Nallur, Jaffna, Sri Lanka",
    coords: { lat: 9.67785, lng: 80.02645 },
  },
  {
    id: "kasthuriyar",
    name: "Kasthuriyar Road",
    mapQuery: "Lingan Cream House, 119 Kasthuriyar Road, Jaffna, Sri Lanka",
    coords: { lat: 9.66685, lng: 80.01905 },
  },
  {
    id: "sannithi",
    name: "Sannithi",
    mapQuery: "Lingan Cream House, Sannithi, Jaffna, Sri Lanka",
    coords: { lat: 9.67355, lng: 80.0245 },
  },
  {
    id: "canada",
    name: "Canada",
    mapQuery: "Lingan Cream House, 6055 Steeles Avenue East, Scarborough, ON, Canada",
    coords: { lat: 43.82258, lng: -79.2691 },
  },
];

/** Sri Lanka branches (excludes Canada) — “All branches” map view stays usefully zoomed on Jaffna */
export const BRANCHES_LOCAL: Branch[] = BRANCHES.filter((b) => b.id !== "canada");

/** @deprecated Use BRANCHES — kept for simple lists */
export const BRANCH_LOCATIONS: readonly string[] = BRANCHES.map((b) => b.name);

/** Text search embed (no guaranteed single red pin). Prefer branch coords via branchEmbedSrc. */
export function getGoogleMapsEmbedUrl(mapQuery: string): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=16&output=embed&iwloc=near`;
}

/**
 * Embed centred on lat,lng — Google shows the standard red marker at this point.
 */
export function getGoogleMapsEmbedCoordsUrl(lat: number, lng: number, zoom = 17): string {
  const q = encodeURIComponent(`${lat},${lng}`);
  return `https://maps.google.com/maps?q=${q}&z=${zoom}&output=embed&iwloc=near`;
}

/** Centroid of local branches — iframe fallback when “All” is selected */
export function getGoogleMapsEmbedJaffnaOverviewUrl(zoom = 12): string {
  if (BRANCHES_LOCAL.length === 0) return getGoogleMapsEmbedCoordsUrl(9.67, 80.02, zoom);
  const lat = BRANCHES_LOCAL.reduce((s, b) => s + b.coords.lat, 0) / BRANCHES_LOCAL.length;
  const lng = BRANCHES_LOCAL.reduce((s, b) => s + b.coords.lng, 0) / BRANCHES_LOCAL.length;
  return getGoogleMapsEmbedCoordsUrl(lat, lng, zoom);
}

/** Label shown on / next to the pin in Google’s embed (classic “Name@lat,lng” format). */
export function branchMapPinLabel(branch: Branch): string {
  return `Lingan Cream House — ${branch.name}`;
}

/**
 * Embed with a named pin: `Label@lat,lng` so Google shows the branch title and a clickable side card in many locales.
 */
export function getGoogleMapsEmbedLabelUrl(branch: Branch, zoom = 17): string {
  const { lat, lng } = branch.coords;
  const q = `${branchMapPinLabel(branch)}@${lat},${lng}`;
  return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=${zoom}&output=embed&iwloc=near`;
}

/** Full Google Maps (new tab) with the same labelled query as the embed. */
export function getGoogleMapsOpenBranchUrl(branch: Branch, zoom = 17): string {
  const { lat, lng } = branch.coords;
  const q = `${branchMapPinLabel(branch)}@${lat},${lng}`;
  return `https://www.google.com/maps?q=${encodeURIComponent(q)}&z=${zoom}`;
}

export function getGoogleMapsOpenUrl(mapQuery: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
}

/** Opens Maps search for the Jaffna cluster (when “All branches” is selected on the JS map). */
export function getGoogleMapsOpenAllLocalUrl(): string {
  return getGoogleMapsOpenUrl("Lingan Cream House Jaffna Sri Lanka");
}

/** Opens Maps with the same coordinates as the embed (red pin context). */
export function getGoogleMapsOpenCoordsUrl(lat: number, lng: number, zoom = 17): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(`${lat},${lng}`)}&z=${zoom}`;
}

export function branchEmbedSrc(branch: Branch): string {
  if (branch.embedSrc) return branch.embedSrc;
  return getGoogleMapsEmbedLabelUrl(branch);
}
