import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type MutableRefObject,
  type SetStateAction,
} from "react";
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from "@react-google-maps/api";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import L from "leaflet";
import { ExternalLink } from "lucide-react";
import { MapContainer, Marker as LeafletMarker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import {
  BRANCHES,
  BRANCHES_LOCAL,
  branchMapPinLabel,
  getGoogleMapsOpenAllLocalUrl,
  getGoogleMapsOpenBranchUrl,
  type Branch,
} from "@/data/branches";
import { tabPillLayoutTransition } from "@/lib/tab-pill-motion";
import { cn } from "@/lib/utils";

const iconProto = L.Icon.Default.prototype as L.Icon.Default & { _getIconUrl?: string };
delete iconProto._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

/** `null` = map shows every branch (default). A branch id zooms to that location. */
export type BranchMapSelection = Branch["id"] | null;

const MAP_OPTIONS: google.maps.MapOptions = {
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
  zoomControl: true,
};

const SWITCH_OPTIONS: { id: Branch["id"]; label: string }[] = BRANCHES.map((b) => ({ id: b.id, label: b.name }));

/** Overview first, then each branch — auto-cycle order */
const BRANCH_CYCLE_SEQUENCE: BranchMapSelection[] = [null, ...BRANCHES.map((b) => b.id)];

const BRANCH_AUTO_CYCLE_MS = 4500;
const BRANCH_AUTO_PAUSE_AFTER_USER_MS = 12_000;

/**
 * Cycles branch tabs automatically (“running” mode). User clicks / map pins pause the timer,
 * then auto-cycle resumes. Disabled when `reduceMotion` is true.
 */
function useBranchTabAutoCycle(reduceMotion: boolean | null): [BranchMapSelection, Dispatch<SetStateAction<BranchMapSelection>>] {
  const [selected, setSelectedState] = useState<BranchMapSelection>(null);
  const cycleIndexRef = useRef(0);
  const pausedUntilRef = useRef(0);

  const onUserOrProgrammaticSelect = useCallback((updater: SetStateAction<BranchMapSelection>) => {
    setSelectedState((prev) => {
      const next = typeof updater === "function" ? (updater as (p: BranchMapSelection) => BranchMapSelection)(prev) : updater;
      const idx = BRANCH_CYCLE_SEQUENCE.indexOf(next);
      cycleIndexRef.current = idx >= 0 ? idx : 0;
      return next;
    });
  }, []);

  const setSelected: Dispatch<SetStateAction<BranchMapSelection>> = useCallback(
    (updater) => {
      pausedUntilRef.current = Date.now() + BRANCH_AUTO_PAUSE_AFTER_USER_MS;
      onUserOrProgrammaticSelect(updater);
    },
    [onUserOrProgrammaticSelect],
  );

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      if (Date.now() < pausedUntilRef.current) return;
      cycleIndexRef.current = (cycleIndexRef.current + 1) % BRANCH_CYCLE_SEQUENCE.length;
      setSelectedState(BRANCH_CYCLE_SEQUENCE[cycleIndexRef.current]);
    }, BRANCH_AUTO_CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return [selected, setSelected];
}

const mapShellClass =
  "relative w-full min-h-[260px] sm:min-h-[300px] rounded-xl overflow-hidden border border-border shadow-[var(--shadow-soft)] bg-muted/30";

function BranchMapSwitch({
  selected,
  onChange,
}: {
  selected: BranchMapSelection;
  onChange: (id: BranchMapSelection) => void;
}) {
  const reduceMotion = useReducedMotion();
  const tablistRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => {
    const tablist = tablistRef.current;
    if (!tablist) return;
    const behavior: ScrollBehavior = reduceMotion ? "auto" : "smooth";
    if (selected === null) {
      tablist.scrollTo({ left: 0, behavior });
      return;
    }
    const btn = itemRefs.current.get(selected);
    if (!btn) return;
    const listRect = tablist.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const scrollDelta = btnRect.left - listRect.left - (listRect.width / 2 - btnRect.width / 2);
    const maxLeft = Math.max(0, tablist.scrollWidth - tablist.clientWidth);
    const nextLeft = Math.max(0, Math.min(tablist.scrollLeft + scrollDelta, maxLeft));
    tablist.scrollTo({ left: nextLeft, behavior });
  }, [selected, reduceMotion]);

  return (
    <LayoutGroup id="branch-location-map-tabs">
      <div
        ref={tablistRef}
        className={cn(
          "mb-3 flex w-full min-w-0 flex-nowrap items-stretch gap-2 overflow-x-auto overflow-y-visible rounded-[1.75rem] border border-border/70",
          "bg-gradient-to-b from-muted/95 via-muted/85 to-muted/55 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
          "scroll-smooth overscroll-x-contain scrollbar-none",
        )}
        role="tablist"
        aria-label="Branch locations"
      >
        {SWITCH_OPTIONS.map((opt) => {
          const isActive = selected === opt.id;
          return (
            <motion.button
              key={opt.id}
              ref={(el) => {
                if (el) itemRefs.current.set(opt.id, el);
                else itemRefs.current.delete(opt.id);
              }}
              type="button"
              role="tab"
              layout={false}
              aria-selected={isActive}
              onClick={() => onChange(isActive ? null : opt.id)}
              whileTap={reduceMotion ? undefined : { scale: 0.96 }}
              whileHover={
                reduceMotion ? undefined : isActive ? { scale: 1.02 } : { y: -2, scale: 1.01 }
              }
              transition={{ type: "spring", stiffness: 480, damping: 32, mass: 0.85 }}
              className={cn(
                "relative shrink-0 overflow-hidden whitespace-nowrap rounded-full px-4 py-2.5 text-left font-body text-xs font-semibold sm:px-5 sm:py-3 sm:text-sm",
                "transition-[color,box-shadow] duration-300 ease-out",
                isActive
                  ? "text-primary-foreground"
                  : cn(
                      "text-foreground/78 hover:text-foreground",
                      "bg-gradient-to-br from-muted/90 via-background/55 to-[hsl(152_30%_42%_/_0.14)]",
                      "shadow-[inset_0_1px_0_rgba(255,255,255,0.42)] ring-1 ring-border/35",
                      "hover:shadow-[0_10px_28px_-12px_hsl(var(--primary)/0.16)] hover:ring-primary/25",
                      "dark:from-muted/45 dark:via-muted/30 dark:to-[hsl(152_28%_22%_/_0.22)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]",
                    ),
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="branchMapActivePill"
                  initial={false}
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-[hsl(152_58%_38%)] to-[hsl(162_46%_22%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_10px_32px_-10px_hsl(var(--primary)/0.5)] ring-[1.5px] ring-white/32"
                  transition={reduceMotion ? { duration: 0 } : tabPillLayoutTransition}
                  aria-hidden
                />
              )}
              <span className="relative z-10">{opt.label}</span>
            </motion.button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}

function OsmMapSync({
  selected,
  markersById,
  reduceMotion,
}: {
  selected: BranchMapSelection;
  markersById: MutableRefObject<Map<string, L.Marker>>;
  reduceMotion: boolean | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (selected === null) {
      map.closePopup();
      const bounds = L.latLngBounds(BRANCHES_LOCAL.map((b) => [b.coords.lat, b.coords.lng]));
      map.fitBounds(bounds, { padding: [48, 48], maxZoom: 14 });
      return;
    }
    const b = BRANCHES.find((x) => x.id === selected);
    if (!b) return;
    if (reduceMotion) {
      map.setView([b.coords.lat, b.coords.lng], 16);
    } else {
      map.flyTo([b.coords.lat, b.coords.lng], 16);
    }
    const id = window.setTimeout(() => {
      markersById.current.get(selected)?.openPopup();
    }, 50);
    return () => window.clearTimeout(id);
  }, [selected, map, markersById, reduceMotion]);

  return null;
}

/** All-branch pins without a Google Maps JavaScript API key (OpenStreetMap tiles). */
function OsmNoApiBranchMap() {
  const reduceMotion = useReducedMotion();
  const [selected, setSelected] = useBranchTabAutoCycle(reduceMotion);
  const markersById = useRef<Map<string, L.Marker>>(new Map());

  const center = useMemo((): [number, number] => {
    const lat = BRANCHES_LOCAL.reduce((s, b) => s + b.coords.lat, 0) / BRANCHES_LOCAL.length;
    const lng = BRANCHES_LOCAL.reduce((s, b) => s + b.coords.lng, 0) / BRANCHES_LOCAL.length;
    return [lat, lng];
  }, []);

  const branch = BRANCHES.find((b) => b.id === selected);
  const openHref =
    selected === null || !branch ? getGoogleMapsOpenAllLocalUrl() : getGoogleMapsOpenBranchUrl(branch);

  return (
    <>
      <BranchMapSwitch selected={selected} onChange={setSelected} />
      <div className={cn(mapShellClass, "min-h-[280px]")}>
        <MapContainer
          center={center}
          zoom={12}
          className="absolute inset-0 z-0 h-full w-full min-h-[260px] rounded-none [&_.leaflet-control-attribution]:hidden [&_.leaflet-control-container]:font-sans"
          scrollWheelZoom
          attributionControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {BRANCHES.map((b) => (
            <LeafletMarker
              key={b.id}
              position={[b.coords.lat, b.coords.lng]}
              eventHandlers={{
                add: (e) => {
                  markersById.current.set(b.id, e.target);
                },
                remove: () => {
                  markersById.current.delete(b.id);
                },
                click: () => {
                  setSelected((prev) => (prev === b.id ? null : b.id));
                },
              }}
            >
              <Popup>
                <div className="max-w-[220px] font-sans">
                  <p className="mb-2 text-sm font-semibold text-foreground">{branchMapPinLabel(b)}</p>
                  <a
                    href={getGoogleMapsOpenBranchUrl(b)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    <ExternalLink size={14} aria-hidden />
                    Open in Google Maps
                  </a>
                </div>
              </Popup>
            </LeafletMarker>
          ))}
          <OsmMapSync selected={selected} markersById={markersById} reduceMotion={reduceMotion} />
        </MapContainer>
        <p className="sr-only">
          Map data ©{" "}
          <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>. Tiles © OpenStreetMap
          contributors.
        </p>
      </div>
      <a
        href={openHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center justify-center gap-2 font-body text-sm font-medium text-primary hover:underline"
      >
        <ExternalLink size={16} aria-hidden />
        Open in Google Maps
      </a>
    </>
  );
}

function GoogleBranchMap({ apiKey }: { apiKey: string }) {
  const reduceMotion = useReducedMotion();
  const [selected, setSelected] = useBranchTabAutoCycle(reduceMotion);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [infoOpenId, setInfoOpenId] = useState<string | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "lingan-google-map",
    googleMapsApiKey: apiKey,
  });

  const center = useMemo(() => {
    const lat = BRANCHES_LOCAL.reduce((s, b) => s + b.coords.lat, 0) / BRANCHES_LOCAL.length;
    const lng = BRANCHES_LOCAL.reduce((s, b) => s + b.coords.lng, 0) / BRANCHES_LOCAL.length;
    return { lat, lng };
  }, []);

  const fitLocalBounds = useCallback((m: google.maps.Map) => {
    const bounds = new google.maps.LatLngBounds();
    BRANCHES_LOCAL.forEach((b) => bounds.extend(b.coords));
    m.fitBounds(bounds, { top: 56, right: 48, bottom: 48, left: 48 });
    google.maps.event.addListenerOnce(m, "idle", () => {
      const z = m.getZoom();
      if (z !== undefined && z > 14) m.setZoom(14);
    });
  }, []);

  const onMapLoad = useCallback(
    (m: google.maps.Map) => {
      setMap(m);
      fitLocalBounds(m);
    },
    [fitLocalBounds],
  );

  useEffect(() => {
    if (!map || !isLoaded) return;
    if (selected === null) {
      fitLocalBounds(map);
      setInfoOpenId(null);
      return;
    }
    const b = BRANCHES.find((x) => x.id === selected);
    if (b) {
      map.panTo(b.coords);
      map.setZoom(16);
      setInfoOpenId(b.id);
    }
  }, [selected, map, isLoaded, fitLocalBounds]);

  if (loadError) {
    return <OsmNoApiBranchMap />;
  }

  if (!isLoaded) {
    return (
      <div className="space-y-3">
        <BranchMapSwitch selected={selected} onChange={setSelected} />
        <div className={cn(mapShellClass, "flex min-h-[280px] items-center justify-center")}>
          <p className="text-sm text-muted-foreground">Loading map…</p>
        </div>
      </div>
    );
  }

  const infoBranch = infoOpenId ? BRANCHES.find((b) => b.id === infoOpenId) : undefined;
  const selectedBranch = BRANCHES.find((b) => b.id === selected);
  const openHref =
    selected === null || !selectedBranch
      ? getGoogleMapsOpenAllLocalUrl()
      : getGoogleMapsOpenBranchUrl(selectedBranch);

  return (
    <>
      <BranchMapSwitch selected={selected} onChange={setSelected} />
      <div className={mapShellClass}>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%", minHeight: 280 }}
          center={center}
          zoom={12}
          onLoad={onMapLoad}
          options={MAP_OPTIONS}
        >
          {BRANCHES.map((branch) => (
            <Marker
              key={branch.id}
              position={branch.coords}
              title={branchMapPinLabel(branch)}
              onClick={() => {
                if (selected === branch.id) {
                  setSelected(null);
                  setInfoOpenId(null);
                } else {
                  setSelected(branch.id);
                  setInfoOpenId(branch.id);
                }
              }}
            />
          ))}
          {infoBranch && (
            <InfoWindow position={infoBranch.coords} onCloseClick={() => setInfoOpenId(null)}>
              <div className="max-w-[220px] p-1 font-sans">
                <p className="mb-2 text-sm font-semibold text-gray-900">{branchMapPinLabel(infoBranch)}</p>
                <a
                  href={getGoogleMapsOpenBranchUrl(infoBranch)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-emerald-800 hover:underline"
                >
                  <ExternalLink size={14} />
                  Open in Google Maps
                </a>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
      <a
        href={openHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center justify-center gap-2 font-body text-sm font-medium text-primary hover:underline"
      >
        <ExternalLink size={16} aria-hidden />
        Open in Google Maps
      </a>
    </>
  );
}

export function BranchLocationsMap() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim();
  if (!apiKey) {
    return <OsmNoApiBranchMap />;
  }
  return <GoogleBranchMap apiKey={apiKey} />;
}
