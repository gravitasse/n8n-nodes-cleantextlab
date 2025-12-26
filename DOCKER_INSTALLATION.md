# Installing CleanTextLab n8n Node in Docker

This guide documents the installation process for the CleanTextLab n8n community node in a local Docker n8n instance.

## Prerequisites

- n8n running in Docker
- Built CleanTextLab node package (`npm run build` completed)

## Installation Steps

### 1. Find Your Running n8n Container

```bash
docker ps --filter "ancestor=n8nio/n8n"
```

Example output:
```
f0c3ad96d8b8   n8nio/n8n   Up 47 hours   0.0.0.0:5678->5678/tcp
```

Note the container ID (e.g., `f0c3ad96d8b8`).

### 2. Create Custom Nodes Directory

```bash
# Replace CONTAINER_ID with your container ID
docker exec CONTAINER_ID mkdir -p /home/node/.n8n/custom
```

### 3. Copy Package Files to Container

From the `n8n-nodes-cleantextlab` directory:

```bash
# Copy dist folder
docker cp dist CONTAINER_ID:/home/node/.n8n/custom/n8n-nodes-cleantextlab/

# Copy package.json
docker cp package.json CONTAINER_ID:/home/node/.n8n/custom/n8n-nodes-cleantextlab/
```

### 4. Fix Directory Structure

The `docker cp` command copies the contents of `dist/` directly. We need to restructure it:

```bash
docker exec --user root CONTAINER_ID sh -c 'cd /home/node/.n8n/custom/n8n-nodes-cleantextlab && mkdir -p dist && mv credentials nodes dist/ && chown -R node:node .'
```

This ensures the structure matches the `package.json` configuration:
```
n8n-nodes-cleantextlab/
├── package.json
└── dist/
    ├── credentials/
    │   └── CleanTextLabApi.credentials.js
    └── nodes/
        └── CleanTextLab/
            ├── CleanTextLab.node.js
            └── cleantextlab.svg
```

### 5. Install Dependencies (Optional)

```bash
docker exec CONTAINER_ID sh -c 'cd /home/node/.n8n/custom/n8n-nodes-cleantextlab && npm install --omit=dev'
```

This should show:
```
up to date, audited 1 package in 13s
found 0 vulnerabilities
```

### 6. Restart n8n Container

```bash
docker restart CONTAINER_ID
```

Wait ~15 seconds for n8n to fully restart.

### 7. Verify Installation

1. Open n8n UI: http://localhost:5678
2. Click **+** to add a new node
3. Search for "CleanTextLab"
4. You should see the **CleanTextLab** node in the search results

## Troubleshooting

### Node Not Appearing in UI

**Check file structure:**
```bash
docker exec CONTAINER_ID ls -la /home/node/.n8n/custom/n8n-nodes-cleantextlab/dist/
```

Should show:
```
drwxr-xr-x    2 node     node          4096 credentials
drwxr-xr-x    3 node     node          4096 nodes
```

**Check package.json is present:**
```bash
docker exec CONTAINER_ID cat /home/node/.n8n/custom/n8n-nodes-cleantextlab/package.json
```

**Check n8n logs for errors:**
```bash
docker logs --tail 50 CONTAINER_ID
```

### Permission Issues

If you see "EACCES: permission denied" errors:

```bash
docker exec --user root CONTAINER_ID chown -R node:node /home/node/.n8n/custom/n8n-nodes-cleantextlab
docker restart CONTAINER_ID
```

## Testing the Node

Once installed, test with these critical use cases:

### Test 1: CSV with Semicolon Delimiter (FAQ #2)

1. Add **Manual Trigger** node
2. Add **CleanTextLab** node
3. Configure credentials (get API key from https://cleantextlab.com/settings)
4. Set:
   - Tool: **CSV to JSON Converter**
   - Input Text:
     ```
     name;age;city
     Alice;30;Paris
     Bob;25;London
     ```
   - CSV Delimiter: **Semicolon (;)**
   - Has Headers: **true**
5. Execute workflow
6. Expected output:
   ```json
   {
     "result": [
       {"name": "Alice", "age": "30", "city": "Paris"},
       {"name": "Bob", "age": "25", "city": "London"}
     ]
   }
   ```

### Test 2: Hash Generator with SHA-512

1. Set:
   - Tool: **Hash Generator**
   - Input Text: `password123`
   - Hash Algorithm: **SHA-512**
   - Output Format: **base64**
2. Execute
3. Should return base64-encoded SHA-512 hash

### Test 3: Base64 Encode

1. Set:
   - Tool: **Base64 Encode/Decode**
   - Input Text: `Hello World`
   - Direction: **Encode**
2. Execute
3. Expected output: `SGVsbG8gV29ybGQ=`

## Uninstalling

```bash
docker exec --user root CONTAINER_ID rm -rf /home/node/.n8n/custom/n8n-nodes-cleantextlab
docker restart CONTAINER_ID
```

## Alternative: Volume Mount (For Development)

For easier development iteration, mount the local package as a volume:

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  -v /Users/tysonk/projects/n8n-nodes-cleantextlab:/home/node/.n8n/custom/n8n-nodes-cleantextlab \
  n8nio/n8n
```

Then any local changes to the package will be reflected after rebuilding:
```bash
npm run build
docker restart n8n
```

## Success Criteria

✅ Node appears in n8n search results
✅ Credentials can be created and tested
✅ CSV semicolon delimiter works (FAQ #2)
✅ Hash generator configs work
✅ Base64 direction option works
✅ All 35 tools are available in the dropdown
✅ All 11 config options display correctly

---

**Last Updated**: December 26, 2024
**Tested with**: n8n Docker image, CleanTextLab node v0.1.0
