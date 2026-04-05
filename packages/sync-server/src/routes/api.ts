/**
 * REST API route handlers for manual sync operations.
 *
 * @module
 */

/**
 * Handle API requests.
 */
export async function handleApi(req: Request, path: string): Promise<Response> {
  const headers = { 'Content-Type': 'application/json' };

  // GET /api/sync/status
  if (path === '/api/sync/status' && req.method === 'GET') {
    return new Response(
      JSON.stringify({
        status: 'idle',
        lastSync: null,
        pendingConflicts: 0,
        message: 'Sync server is ready. No active sync operations.',
      }),
      { headers },
    );
  }

  // POST /api/sync/pull
  if (path === '/api/sync/pull' && req.method === 'POST') {
    const body = await req.json();
    const source = body.source as string; // 'figma' | 'penpot'

    console.log(`[API] Pull request from ${source}`);

    // In production: call orchestrator.pull(source)
    return new Response(
      JSON.stringify({
        success: true,
        source,
        message: `Pull from ${source} initiated. Check status for results.`,
      }),
      { headers },
    );
  }

  // POST /api/sync/push
  if (path === '/api/sync/push' && req.method === 'POST') {
    const body = await req.json();
    const target = body.target as string;

    console.log(`[API] Push request to ${target}`);

    // In production: call orchestrator.push(target)
    return new Response(
      JSON.stringify({
        success: true,
        target,
        message: `Push to ${target} initiated.`,
      }),
      { headers },
    );
  }

  return new Response('Not Found', { status: 404 });
}
