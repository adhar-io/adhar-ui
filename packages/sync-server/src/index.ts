/**
 * @adhar-ui/sync-server
 *
 * Webhook handler and REST API for automated design-to-code synchronization.
 * Receives webhooks from Figma and Penpot, processes token changes,
 * and creates git PRs with updated ThemePreset files.
 *
 * Endpoints:
 *  - POST /webhooks/figma     - Figma webhook receiver
 *  - POST /webhooks/penpot    - Penpot webhook receiver
 *  - POST /api/sync/pull      - Manual pull from design tool
 *  - POST /api/sync/push      - Manual push to design tool
 *  - GET  /api/sync/status    - Current sync state
 *  - GET  /health             - Health check
 *
 * Deployable to Deno Deploy, Docker, or any Deno-compatible platform.
 *
 * Environment variables:
 *  - FIGMA_ACCESS_TOKEN       - Figma REST API token
 *  - FIGMA_WEBHOOK_SECRET     - HMAC verification secret
 *  - PENPOT_API_URL           - Penpot instance URL
 *  - PENPOT_AUTH_TOKEN         - Penpot auth token
 *  - PORT                     - Server port (default 8080)
 *
 * @module
 */

import { handleWebhook } from './routes/webhooks.ts';
import { handleApi } from './routes/api.ts';

const PORT = parseInt(Deno.env.get('PORT') ?? '8080');

/**
 * Main HTTP server entry point.
 */
Deno.serve({ port: PORT }, (req: Request): Response | Promise<Response> => {
  const url = new URL(req.url);
  const path = url.pathname;

  // Health check
  if (path === '/health' && req.method === 'GET') {
    return new Response(JSON.stringify({ status: 'ok', version: '0.1.0' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Webhook routes
  if (path.startsWith('/webhooks/')) {
    return handleWebhook(req, path);
  }

  // API routes
  if (path.startsWith('/api/')) {
    return handleApi(req, path);
  }

  // 404
  return new Response('Not Found', { status: 404 });
});

console.log(`Adhar UI Sync Server running on port ${PORT}`);
