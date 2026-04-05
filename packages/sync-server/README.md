# @adhar-ui/sync-server

Webhook handler and REST API for automated design-to-code synchronization. Receives events from Figma and Penpot, processes token changes, and coordinates sync operations.

## Features

- **Figma Webhooks**: Receives `FILE_UPDATE` and `LIBRARY_PUBLISH` events
- **Penpot Webhooks**: Receives file change events
- **Debounced Processing**: Batches rapid edits within a 5-second window
- **REST API**: Manual sync operations (pull, push, status)
- **Health Check**: Monitoring endpoint

## Architecture

```
packages/sync-server/
  src/
    index.ts                 # Deno.serve() entry point
    routes/
      webhooks.ts            # POST /webhooks/figma, POST /webhooks/penpot
      api.ts                 # REST API for manual sync
```

## API Endpoints

| Method | Path               | Description                               |
| ------ | ------------------ | ----------------------------------------- |
| `GET`  | `/health`          | Health check (returns `{ status: "ok" }`) |
| `POST` | `/webhooks/figma`  | Receive Figma webhook events              |
| `POST` | `/webhooks/penpot` | Receive Penpot webhook events             |
| `POST` | `/api/sync/pull`   | Pull tokens from a design tool            |
| `POST` | `/api/sync/push`   | Push code tokens to a design tool         |
| `GET`  | `/api/sync/status` | Get current sync state                    |

## Getting Started

### Step 1: Set up environment variables

Create a `.env` file:

```bash
# Figma integration
FIGMA_ACCESS_TOKEN=figd_xxxxxxxxxxxx
FIGMA_WEBHOOK_SECRET=your-webhook-secret

# Penpot integration
PENPOT_API_URL=https://design.penpot.app
PENPOT_AUTH_TOKEN=your-penpot-token

# Server
PORT=8080
```

### Step 2: Run the server locally

```bash
cd packages/sync-server

# Run with Deno
deno run -A src/index.ts

# Or from the monorepo root
deno run -A packages/sync-server/src/index.ts
```

The server starts on port 8080 (configurable via `PORT` env var):

```
Adhar UI Sync Server running on port 8080
```

### Step 3: Test the health endpoint

```bash
curl http://localhost:8080/health
# {"status":"ok","version":"0.1.0"}
```

### Step 4: Register Figma webhooks

Use the Figma REST API to register a webhook for your team or file:

```bash
curl -X POST https://api.figma.com/v2/webhooks \
  -H "X-Figma-Token: $FIGMA_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "event_type": "LIBRARY_PUBLISH",
    "team_id": "YOUR_TEAM_ID",
    "endpoint": "https://your-server.com/webhooks/figma",
    "passcode": "your-webhook-secret"
  }'
```

### Step 5: Register Penpot webhooks

In Penpot, go to Team Settings → Webhooks → Add:

- URL: `https://your-server.com/webhooks/penpot`
- Format: JSON

### Step 6: Test webhook processing

Simulate a Figma webhook:

```bash
curl -X POST http://localhost:8080/webhooks/figma \
  -H "Content-Type: application/json" \
  -d '{
    "event_type": "LIBRARY_PUBLISH",
    "file_key": "abc123",
    "file_name": "Design System"
  }'
# {"received":true}
```

### Step 7: Manual sync via REST API

```bash
# Pull tokens from Figma
curl -X POST http://localhost:8080/api/sync/pull \
  -H "Content-Type: application/json" \
  -d '{"source": "figma"}'

# Push tokens to Penpot
curl -X POST http://localhost:8080/api/sync/push \
  -H "Content-Type: application/json" \
  -d '{"target": "penpot"}'

# Check sync status
curl http://localhost:8080/api/sync/status
```

## Webhook Processing Flow

```
Figma: LIBRARY_PUBLISH event
  ↓
POST /webhooks/figma
  ↓
Verify HMAC signature
  ↓
Debounce queue (5s window)
  ↓ (after debounce)
Pull latest variables via Figma REST API
  ↓
Convert to DTCG via @adhar-ui/dtcg
  ↓
Diff against lockfile via @adhar-ui/design-sync
  ↓
If changed: create git branch + PR with updated ThemePreset
```

## Deployment

### Deno Deploy

```bash
deployctl deploy --project=adhar-ui-sync packages/sync-server/src/index.ts
```

### Docker

```dockerfile
FROM denoland/deno:2.6.0

WORKDIR /app
COPY packages/sync-server/ ./packages/sync-server/
COPY packages/dtcg/ ./packages/dtcg/
COPY packages/design-sync/ ./packages/design-sync/
COPY packages/tokens/ ./packages/tokens/
COPY deno.json .

EXPOSE 8080
CMD ["deno", "run", "-A", "packages/sync-server/src/index.ts"]
```

### Environment Variables

| Variable               | Required   | Description                          |
| ---------------------- | ---------- | ------------------------------------ |
| `PORT`                 | No         | Server port (default: 8080)          |
| `FIGMA_ACCESS_TOKEN`   | For Figma  | Figma REST API personal access token |
| `FIGMA_WEBHOOK_SECRET` | For Figma  | HMAC secret for webhook verification |
| `PENPOT_API_URL`       | For Penpot | Penpot instance URL                  |
| `PENPOT_AUTH_TOKEN`    | For Penpot | Penpot authentication token          |

## Development

```bash
# Type-check
deno check packages/sync-server/src/index.ts

# Run locally
deno run -A packages/sync-server/src/index.ts

# Lint
deno lint packages/sync-server/src
```
