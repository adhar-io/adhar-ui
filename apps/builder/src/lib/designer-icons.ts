import { registerIcons, type IconDefinition } from "@adhar-ui/icons";

// Register additional icons needed by the Designer app.
// These complement the 17 built-in Lucide-based icons.

const customIcons: IconDefinition[] = [
  {
    name: "cursor",
    svg: '<line x1="3" y1="3" x2="10.07" y2="19.97"/><line x1="10.07" y1="19.97" x2="12.58" y2="12.58"/><line x1="12.58" y1="12.58" x2="19.97" y2="10.07"/><line x1="19.97" y1="10.07" x2="3" y2="3"/>',
    keywords: ["select", "pointer", "arrow"],
  },
  {
    name: "frame",
    svg: '<rect x="3" y="3" width="18" height="18" rx="0"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/>',
    keywords: ["frame", "grid", "layout"],
  },
  {
    name: "text",
    svg: '<line x1="4" y1="7" x2="4" y2="4"/><line x1="4" y1="4" x2="20" y2="4"/><line x1="20" y1="4" x2="20" y2="7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/>',
    keywords: ["text", "type", "font"],
  },
  {
    name: "shape",
    svg: '<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>',
    keywords: ["shape", "hexagon", "polygon"],
  },
  {
    name: "connector",
    svg: '<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
    keywords: ["connector", "link", "arrow"],
  },
  {
    name: "note",
    svg: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>',
    keywords: ["note", "file", "document"],
  },
  {
    name: "image",
    svg: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
    keywords: ["image", "picture", "photo"],
  },
  {
    name: "component",
    svg: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    keywords: ["component", "layers", "stack"],
  },
  {
    name: "sparkles",
    svg: '<path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/><path d="M5 19l1 3 1-3 3-1-3-1-1-3-1 3-3 1 3 1z"/>',
    keywords: ["sparkles", "ai", "magic", "generate"],
  },
  {
    name: "plus",
    svg: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    keywords: ["plus", "add", "new"],
  },
  {
    name: "trash",
    svg: '<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>',
    keywords: ["trash", "delete", "remove"],
  },
  {
    name: "undo",
    svg: '<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>',
    keywords: ["undo", "back", "reverse"],
  },
  {
    name: "redo",
    svg: '<polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.13-9.36L23 10"/>',
    keywords: ["redo", "forward", "repeat"],
  },
  {
    name: "grid",
    svg: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
    keywords: ["grid", "layout", "squares"],
  },
  {
    name: "layers",
    svg: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    keywords: ["layers", "stack"],
  },
  {
    name: "settings",
    svg: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>',
    keywords: ["settings", "gear", "cog"],
  },
  {
    name: "download",
    svg: '<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    keywords: ["download", "save"],
  },
  {
    name: "zoom-in",
    svg: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>',
    keywords: ["zoom", "in", "magnify"],
  },
  {
    name: "zoom-out",
    svg: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/>',
    keywords: ["zoom", "out", "shrink"],
  },
  {
    name: "zoom-fit",
    svg: '<polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>',
    keywords: ["zoom", "fit", "maximize"],
  },
  {
    name: "panel-left",
    svg: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/>',
    keywords: ["panel", "sidebar", "left"],
  },
  {
    name: "panel-right",
    svg: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="15" y1="3" x2="15" y2="21"/>',
    keywords: ["panel", "sidebar", "right"],
  },
  {
    name: "link",
    svg: '<path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>',
    keywords: ["link", "chain", "connect"],
  },
  {
    name: "penpot",
    svg: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6" fill="none"/>',
    keywords: ["penpot", "design"],
  },
  {
    name: "figma",
    svg: '<path d="M5 5.5A3.5 3.5 0 018.5 2H12v7H8.5A3.5 3.5 0 015 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 110 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 117 0 3.5 3.5 0 11-7 0z"/><path d="M5 19.5A3.5 3.5 0 018.5 16H12v3.5a3.5 3.5 0 11-7 0z"/><path d="M5 12.5A3.5 3.5 0 018.5 9H12v7H8.5A3.5 3.5 0 015 12.5z"/>',
    keywords: ["figma", "design"],
  },
  {
    name: "builder",
    svg: '<rect x="4" y="4" width="16" height="16" rx="0"/><line x1="4" y1="8" x2="20" y2="8"/><line x1="8" y1="4" x2="8" y2="20"/>',
    keywords: ["builder", "layout", "app"],
  },
  {
    name: "align-left",
    svg: '<line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/>',
    keywords: ["align", "left"],
  },
  {
    name: "align-center",
    svg: '<line x1="18" y1="10" x2="6" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="18" y1="18" x2="6" y2="18"/>',
    keywords: ["align", "center"],
  },
  {
    name: "align-right",
    svg: '<line x1="21" y1="10" x2="7" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="7" y2="18"/>',
    keywords: ["align", "right"],
  },
  {
    name: "prototype",
    svg: '<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M10 8l6 4-6 4V8z" fill="currentColor"/>',
    keywords: ["prototype", "play", "interaction"],
  },
  {
    name: "hand",
    svg: '<path d="M18 11V6a2 2 0 00-4 0v4"/><path d="M14 10V4a2 2 0 00-4 0v7"/><path d="M10 10.5V6a2 2 0 00-4 0v8"/><path d="M18 8a2 2 0 014 0v6a8 8 0 01-8 8h-2c-3.5 0-5.4-2.1-7.4-4.7l-.5-.7a1.8 1.8 0 012.4-2.4L6 16"/>',
    keywords: ["hand", "grab", "pan", "move"],
  },
  {
    name: "palette",
    svg: '<circle cx="13.5" cy="6.5" r="2"/><circle cx="17.5" cy="10.5" r="2"/><circle cx="8.5" cy="7.5" r="2"/><circle cx="6.5" cy="12.5" r="2"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.5-.7 1.5-1.5 0-.4-.1-.7-.4-1-.3-.3-.4-.6-.4-1 0-.8.7-1.5 1.5-1.5H16c3.3 0 6-2.7 6-6 0-5.5-4.5-9-10-9z"/>',
    keywords: ["palette", "color", "design-system"],
  },
  {
    name: "tokens",
    svg: '<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>',
    keywords: ["tokens", "design-tokens", "layers"],
  },
  {
    name: "export",
    svg: '<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
    keywords: ["export", "upload", "share"],
  },
  {
    name: "artboard",
    svg: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    keywords: ["artboard", "frames", "screens"],
  },
  {
    name: "interaction",
    svg: '<path d="M15 15l-2 5L9 9l11 4-5 2z"/><path d="M14.828 14.828L21 21"/>',
    keywords: ["interaction", "cursor", "click", "tap"],
  },
  {
    name: "route",
    svg: '<circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M6 9a9 9 0 009 9"/>',
    keywords: ["route", "path", "navigation"],
  },
  {
    name: "play",
    svg: '<polygon points="5 3 19 12 5 21 5 3"/>',
    keywords: ["play", "preview", "run"],
  },
  {
    name: "eye",
    svg: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
    keywords: ["eye", "view", "visible", "preview"],
  },
  {
    name: "copy",
    svg: '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>',
    keywords: ["copy", "duplicate", "clipboard"],
  },
  {
    name: "type",
    svg: '<polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/>',
    keywords: ["type", "typography", "font"],
  },
  {
    name: "paintbrush",
    svg: '<path d="M18.37 2.63a2.12 2.12 0 013 3L14 13l-4 1 1-4 7.37-7.37z"/><path d="M9 8c-2 3-4 4.5-4 8a5 5 0 0010 0 4 4 0 00-1-3"/>',
    keywords: ["paint", "brush", "design", "style"],
  },
];

export function registerDesignerIcons() {
  registerIcons(customIcons);
}
