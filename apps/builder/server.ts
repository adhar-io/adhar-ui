// ─── Adhar UI Builder — Collaboration Server ────────────────────────────────
// Runs a y-websocket server for real-time multiplayer editing.
// Start with: deno task collab

const { WebSocketServer } = await import("npm:ws@^8");
const { setupWSConnection } = await import("npm:y-websocket@^2/bin/utils");

const PORT = parseInt(Deno.env.get("PORT") || "4444");

const wss = new WebSocketServer({ port: PORT });

wss.on("connection", (ws: any, req: any) => {
  setupWSConnection(ws, req);
});

console.log(`✓ Collaboration server running on ws://localhost:${PORT}`);
console.log("  Connect the builder to start real-time editing.");
