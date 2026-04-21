# n8n Community Node - Setup & Publishing Guide

This guide walks through testing, publishing, and submitting the CleanTextLab n8n community node.

## ✅ What's Been Completed

- [x] Package structure created
- [x] Credential class implemented (API key authentication)
- [x] Main node with 35+ tools implemented
- [x] **Full configuration support** for 11 configurable tools
- [x] README with examples
- [x] MIT License
- [x] Git repository initialized

## 📋 Next Steps

### Step 1: Install Dependencies & Build

```bash
cd /Users/tysonk/projects/n8n-nodes-cleantextlab
npm install
npm run build
```

**Expected output:**
- `dist/` directory created
- Compiled `.js` and `.d.ts` files
- SVG icon copied to `dist/`

### Step 2: Test Locally with n8n

#### Option A: Using npm link (Recommended for Development)

```bash
# In the node package directory
npm link

# In your n8n custom nodes directory
cd ~/.n8n/custom
npm link n8n-nodes-cleantextlab

# Restart n8n
n8n stop
n8n start
```

#### Option B: Direct Installation

```bash
cd ~/.n8n/custom
npm install /Users/tysonk/projects/n8n-nodes-cleantextlab

# Restart n8n
n8n stop
n8n start
```

#### Verify Installation

1. Open n8n UI (http://localhost:5678)
2. Create a new workflow
3. Click **+** to add a node
4. Search for "CleanTextLab"
5. You should see the CleanTextLab node

### Step 3: Test the Node

Create a test workflow:

1. Add a **Manual Trigger** node
2. Add the **CleanTextLab** node
3. Configure credentials:
   - Get API key from https://cleantextlab.com/settings
   - Create new CleanTextLab API credential
   - Paste API key
4. Test configuration options:

**Test Case 1: CSV with Semicolon Delimiter**
```
Input Text:
name;age;city
Alice;30;Paris

Tool: CSV to JSON Converter
CSV Delimiter: Semicolon (;)
Has Headers: true

Expected Output:
[{"name":"Alice","age":"30","city":"Paris"}]
```

**Test Case 2: SHA-512 Hash**
```
Input Text: password123

Tool: Hash Generator
Algorithm: SHA-512
Output Format: base64

Expected Output: (base64 encoded SHA-512 hash)
```

**Test Case 3: Base64 Encode**
```
Input Text: Hello World

Tool: Base64 Encode/Decode
Direction: Encode

Expected Output: SGVsbG8gV29ybGQ=
```

### Step 4: Publish to npm

#### Prerequisites
- npm account (create at https://www.npmjs.com/signup)
- Verify email
- Enable 2FA (recommended)

#### Publishing Steps

```bash
cd /Users/tysonk/projects/n8n-nodes-cleantextlab

# Login to npm (one-time)
npm login

# Verify package name is available
npm search n8n-nodes-cleantextlab

# Build for production
npm run build

# Publish (first time)
npm publish
```

**Expected output:**
```
+ n8n-nodes-cleantextlab@0.1.0
```

#### Verify Publication

1. Visit https://www.npmjs.com/package/n8n-nodes-cleantextlab
2. Check that README displays correctly
3. Verify version number

### Step 5: Submit to n8n Community Nodes

#### Create GitHub Repository (if not already done)

```bash
# Create repo on GitHub first: https://github.com/new
# Name: n8n-nodes-cleantextlab

cd /Users/tysonk/projects/n8n-nodes-cleantextlab
git remote add origin https://github.com/gravitasse/n8n-nodes-cleantextlab.git
git branch -M main
git push -u origin main
```

#### Submit to n8n

1. Go to https://github.com/n8n-io/n8n-nodes-registry
2. Click **Fork**
3. Edit `registry.json`:

```json
{
  "name": "n8n-nodes-cleantextlab",
  "description": "35+ privacy-focused text processing tools for n8n workflows",
  "npm": "n8n-nodes-cleantextlab",
  "repository": "https://github.com/gravitasse/n8n-nodes-cleantextlab",
  "author": {
    "name": "CleanTextLab",
    "email": "support@cleantextlab.com"
  },
  "categories": ["Transform", "Data Processing", "Development"],
  "keywords": ["text", "csv", "json", "hash", "base64", "privacy", "automation"]
}
```

4. Commit and create Pull Request
5. Wait for n8n team review (typically 1-2 weeks)

### Step 6: Marketing & Launch

Once the npm package is live and the n8n PR is submitted:

#### Update CleanTextLab Website

1. Add "Official n8n Node" badge to [/docs/n8n](https://cleantextlab.com/docs/n8n)
2. Update FAQ #1 to mention the node:

```
Q1: How do I use CleanTextLab with n8n?
A: Install our official n8n community node (search "CleanTextLab" in n8n)
   or use the HTTP Request node with Header Auth...
```

3. Add installation section:

```markdown
## Quick Start: Official n8n Node (Recommended)

1. In n8n, go to **Settings > Community Nodes**
2. Click **Install** and enter: `n8n-nodes-cleantextlab`
3. Add your CleanTextLab API key
4. Start processing text!

## Alternative: HTTP Request Node
...existing HTTP Request documentation...
```

#### Announcement Content

**Twitter/X:**
```
🎉 Introducing the official CleanTextLab n8n node!

35+ text processing tools now available in the n8n marketplace:
✓ CSV/JSON conversion with custom delimiters
✓ Hash generation (SHA-256/512, MD5)
✓ Base64/Hex encoding
✓ And 30+ more tools

Install: npm i n8n-nodes-cleantextlab

https://cleantextlab.com/docs/n8n
```

**n8n Community Forum:**
Title: "CleanTextLab - 35+ Text Processing Tools for n8n"
Post:
```
Hi n8n community!

I've just published a community node for CleanTextLab - a privacy-focused
text processing suite with 35+ tools.

What it does:
- Convert CSV to JSON with custom delimiters (,;|tab)
- Generate hashes (SHA-256/512, MD5) in hex or base64
- Encode/decode Base64, Hex, URLs
- Extract emails, sanitize URLs, format phone numbers
- And much more...

Why it's useful:
- All processing is deterministic (no AI hallucinations)
- Privacy-first (HTTPS, no logging)
- Configurable options for each tool
- Perfect for data pipelines and ETL workflows

Installation:
npm i n8n-nodes-cleantextlab

Documentation:
https://cleantextlab.com/docs/n8n

Would love feedback from the community!
```

**Email to Existing Pro Users:**
Subject: "New: Official CleanTextLab n8n Node"

```
Hi [Name],

Great news! We've just launched an official n8n community node for
CleanTextLab.

If you use n8n, you can now install the CleanTextLab node directly
from the n8n marketplace - no more manual HTTP Request setup!

Install in seconds:
1. Settings > Community Nodes
2. Install "n8n-nodes-cleantextlab"
3. Add your API key

All 35+ tools with full configuration support (CSV delimiters, hash
algorithms, etc.) are now available as dropdown menus.

Learn more: https://cleantextlab.com/docs/n8n

Happy automating!
The CleanTextLab Team
```

## 🐛 Troubleshooting

### Build Errors

**Error:** `Cannot find module 'n8n-workflow'`
**Fix:** Install peer dependencies manually
```bash
npm install n8n-workflow --save-dev
```

### Node Not Appearing in n8n

**Check:**
1. Did you restart n8n after installation?
2. Is the package in `~/.n8n/custom/node_modules`?
3. Check n8n logs: `n8n start --tunnel` (look for errors)

### Credential Test Fails

**Error:** "Invalid API key"
**Fix:**
1. Verify API key is correct
2. Ensure you're using a Pro account (not Free tier)
3. Check API URL is `https://cleantextlab.com/api/v1`

### Config Options Not Showing

**Check:**
1. Build completed successfully (`npm run build`)
2. `dist/` directory contains compiled files
3. Restart n8n to load latest changes

## 📊 Success Metrics

Track these metrics post-launch:

### Week 1
- npm downloads: Target 20+
- GitHub stars: Target 5+
- n8n PR submitted: Yes/No

### Month 1
- npm downloads: Target 100+
- Active users (via API): Target 10+
- n8n marketplace approved: Yes/No

### Month 3
- npm downloads: Target 500+
- Active users (via API): Target 50+
- n8n Pro conversions: Target 5+

## 📞 Support

**Questions?**
- GitHub Issues: https://github.com/gravitasse/n8n-nodes-cleantextlab/issues
- Email: support@cleantextlab.com
- Docs: https://cleantextlab.com/docs/n8n

---

**Ready to publish?** Follow steps 4-6 above!
