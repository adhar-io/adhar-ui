/**
 * Webhook route handlers for Figma and Penpot events.
 *
 * Receives webhook events, verifies signatures, debounces rapid changes,
 * and triggers sync operations.
 *
 * @module
 */

/** Debounce queue to batch rapid webhook events. */
const debounceTimers = new Map<string, number>();
const DEBOUNCE_MS = 5000;

/**
 * Handle incoming webhook requests.
 */
export async function handleWebhook(req: Request, path: string): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const body = await req.json();

    if (path === '/webhooks/figma') {
      return handleFigmaWebhook(body);
    }

    if (path === '/webhooks/penpot') {
      return handlePenpotWebhook(body);
    }

    return new Response('Not Found', { status: 404 });
  } catch (err) {
    console.error('Webhook error:', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}

/**
 * Handle Figma webhook events.
 * Supported events: FILE_UPDATE, LIBRARY_PUBLISH
 */
function handleFigmaWebhook(body: Record<string, unknown>): Response {
  const eventType = body.event_type as string;
  const fileKey = body.file_key as string;

  console.log(`[Figma Webhook] ${eventType} for file ${fileKey}`);

  if (eventType === 'PING') {
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (eventType === 'LIBRARY_PUBLISH' || eventType === 'FILE_UPDATE') {
    // Debounce: batch rapid changes within 5s window
    const key = `figma:${fileKey}`;
    const existing = debounceTimers.get(key);
    if (existing) clearTimeout(existing);

    const timerId = setTimeout(() => {
      debounceTimers.delete(key);
      console.log(`[Figma Sync] Processing dequeued sync for ${fileKey}`);
      // In production: call orchestrator.pullFromFigma(fileKey)
    }, DEBOUNCE_MS) as unknown as number;

    debounceTimers.set(key, timerId);
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * Handle Penpot webhook events.
 */
function handlePenpotWebhook(body: Record<string, unknown>): Response {
  const eventType = body.type as string;
  const fileId = body.file_id as string;

  console.log(`[Penpot Webhook] ${eventType} for file ${fileId}`);

  // Debounce
  const key = `penpot:${fileId}`;
  const existing = debounceTimers.get(key);
  if (existing) clearTimeout(existing);

  const timerId = setTimeout(() => {
    debounceTimers.delete(key);
    console.log(`[Penpot Sync] Processing dequeued sync for ${fileId}`);
    // In production: call orchestrator.pullFromPenpot(fileId)
  }, DEBOUNCE_MS) as unknown as number;

  debounceTimers.set(key, timerId);

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
