# Manual Testing Guide for CleanTextLab n8n Node

This guide provides step-by-step instructions for manually testing the CleanTextLab n8n node in the UI.

## Prerequisites

1. n8n running at http://localhost:5678
2. CleanTextLab node installed (search for "CleanTextLab" when adding nodes)
3. CleanTextLab Pro API key from https://cleantextlab.com/settings

## Setup Credentials

Before testing, you need to set up your CleanTextLab API credentials:

1. In n8n, go to **Settings** → **Credentials**
2. Click **+ Add Credential**
3. Search for "CleanTextLab API"
4. Fill in:
   - **API Key**: Your Pro API key from cleantextlab.com/settings (starts with `ctl_live_`)
   - **API URL**: `https://cleantextlab.com/api/v1` (default, don't change)
5. Click **Save**
6. Click **Test** to verify the credential works

## Critical Tests (Configuration Options)

### Test 1: CSV with Semicolon Delimiter ⭐ CRITICAL (FAQ #2)

**Why Critical**: This addresses FAQ #2 which asks "Can I use a different CSV delimiter?"

1. Create new workflow
2. Add **Manual Trigger** node
3. Add **CleanTextLab** node
4. Configure CleanTextLab node:
   - **Credentials**: Select your CleanTextLab API credential
   - **Tool**: `CSV to JSON Converter`
   - **Input Text**:
     ```
     name;age;city
     Alice;30;Paris
     Bob;25;London
     ```
   - **CSV Delimiter**: `Semicolon (;)`
   - **Has Headers**: `true`
5. Click **Execute Node**

**Expected Output**:
```json
{
  "result": [
    {
      "name": "Alice",
      "age": "30",
      "city": "Paris"
    },
    {
      "name": "Bob",
      "age": "25",
      "city": "London"
    }
  ],
  "tool": "csv-json-converter",
  "config": {
    "delimiter": ";",
    "hasHeaders": true
  }
}
```

✅ **Success Criteria**:
- Data is parsed correctly with semicolon delimiter
- Output contains 2 objects with correct field names
- Config object is returned showing delimiter and hasHeaders settings

---

### Test 2: CSV with Tab Delimiter

1. Update the CleanTextLab node:
   - **Input Text**:
     ```
     product	price	stock
     Widget	9.99	150
     Gadget	19.99	75
     ```
   - **CSV Delimiter**: `Tab`
   - **Has Headers**: `true`
2. Click **Execute Node**

**Expected Output**:
```json
{
  "result": [
    {"product": "Widget", "price": "9.99", "stock": "150"},
    {"product": "Gadget", "price": "19.99", "stock": "75"}
  ]
}
```

---

### Test 3: CSV with Pipe Delimiter

1. Update the CleanTextLab node:
   - **Input Text**:
     ```
     country|capital|population
     France|Paris|67000000
     UK|London|68000000
     ```
   - **CSV Delimiter**: `Pipe (|)`
   - **Has Headers**: `true`
2. Click **Execute Node**

**Expected Output**: Correctly parsed with pipe delimiter

---

### Test 4: Hash Generator - SHA-512 with Base64

1. Update the CleanTextLab node:
   - **Tool**: `Hash Generator`
   - **Input Text**: `password123`
   - **Hash Algorithm**: `SHA-512`
   - **Output Format**: `Base64`
2. Click **Execute Node**

**Expected Output**:
```json
{
  "result": "EJ9LZaRTvbUcEBV2mPDy16ktMVCE1Aqi5JV2neOSYNjBkXnHmFRGcAVJ5sF3beFdLiYBpPCCVp5pQaQPYCjmOQ==",
  "tool": "hash-generator",
  "config": {
    "algorithm": "SHA-512",
    "format": "base64"
  }
}
```

---

### Test 5: Hash Generator - SHA-256 with Hex

1. Update settings:
   - **Input Text**: `test`
   - **Hash Algorithm**: `SHA-256`
   - **Output Format**: `Hexadecimal`
2. Click **Execute Node**

**Expected Output**:
```json
{
  "result": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
  "tool": "hash-generator",
  "config": {
    "algorithm": "SHA-256",
    "format": "hex"
  }
}
```

---

### Test 6: Hash Generator - MD5 with Hex

1. Update settings:
   - **Input Text**: `hello`
   - **Hash Algorithm**: `MD5`
   - **Output Format**: `Hexadecimal`
2. Click **Execute Node**

**Expected Output**: MD5 hash in hex format

---

### Test 7: Base64 Encode

1. Update the CleanTextLab node:
   - **Tool**: `Base64 Encode/Decode`
   - **Input Text**: `Hello World`
   - **Direction**: `Encode`
2. Click **Execute Node**

**Expected Output**:
```json
{
  "result": "SGVsbG8gV29ybGQ=",
  "tool": "base64-encode-decode",
  "config": {
    "direction": "encode"
  }
}
```

---

### Test 8: Base64 Decode

1. Update settings:
   - **Input Text**: `SGVsbG8gV29ybGQ=`
   - **Direction**: `Decode`
2. Click **Execute Node**

**Expected Output**:
```json
{
  "result": "Hello World",
  "tool": "base64-encode-decode",
  "config": {
    "direction": "decode"
  }
}
```

---

### Test 9: Base64 Auto-detect

1. Update settings:
   - **Input Text**: `SGVsbG8gV29ybGQ=`
   - **Direction**: `Auto-detect`
2. Click **Execute Node**

**Expected**: Should auto-detect it's Base64 and decode to "Hello World"

---

### Test 10: Hex Converter - Text to Hex with Colon Delimiter

1. Update the CleanTextLab node:
   - **Tool**: `Hex Converter`
   - **Input Text**: `ABC`
   - **Conversion Mode**: `Text`
   - **Direction**: `Encode (to hex)`
   - **Hex Delimiter**: `Colon (:)`
2. Click **Execute Node**

**Expected Output**:
```json
{
  "result": "41:42:43",
  "tool": "hex-converter",
  "config": {
    "mode": "text",
    "direction": "encode",
    "delimiter": "colon"
  }
}
```

---

### Test 11: Hex Converter - Text to Hex with Space Delimiter

1. Update settings:
   - **Hex Delimiter**: `Space`
2. Click **Execute Node**

**Expected Output**: `41 42 43`

---

### Test 12: UUID Generator - v4 (Random)

1. Update the CleanTextLab node:
   - **Tool**: `UUID Generator`
   - **Input Text**: (leave empty)
   - **UUID Version**: `v4 (Random)`
   - **Count**: `1`
2. Click **Execute Node**

**Expected Output**: One random UUID v4 (e.g., `f47ac10b-58cc-4372-a567-0e02b2c3d479`)

---

### Test 13: UUID Generator - v7 (Timestamp-based) with Count 5

1. Update settings:
   - **UUID Version**: `v7 (Timestamp-based)`
   - **Count**: `5`
2. Click **Execute Node**

**Expected Output**: 5 UUIDs, one per line

---

### Test 14: YAML to JSON

1. Update the CleanTextLab node:
   - **Tool**: `YAML/JSON Converter`
   - **Input Text**:
     ```yaml
     name: Alice
     age: 30
     city: Paris
     hobbies:
       - reading
       - cycling
     ```
   - **Conversion Mode**: `YAML to JSON`
2. Click **Execute Node**

**Expected Output**: Valid JSON with the same data structure

---

### Test 15: JSON to YAML

1. Update settings:
   - **Input Text**: `{"name":"Bob","age":25,"active":true}`
   - **Conversion Mode**: `JSON to YAML`
2. Click **Execute Node**

**Expected Output**: YAML format

---

### Test 16: Phone Number Formatter - E.164

1. Update the CleanTextLab node:
   - **Tool**: `Phone Number Formatter`
   - **Input Text**: `(415) 555-2671`
   - **Format**: `E.164 (+14155552671)`
2. Click **Execute Node**

**Expected Output**: `+14155552671`

---

### Test 17: Phone Number Formatter - National

1. Update settings:
   - **Input Text**: `4155552671`
   - **Format**: `National ((415) 555-2671)`
2. Click **Execute Node**

**Expected Output**: `(415) 555-2671`

---

### Test 18: Sort & Remove Duplicates - Ascending

1. Update the CleanTextLab node:
   - **Tool**: `Sort & Remove Duplicates`
   - **Input Text**:
     ```
     banana
     apple
     cherry
     banana
     apple
     ```
   - **Sort Direction**: `Ascending (A-Z)`
2. Click **Execute Node**

**Expected Output**:
```
apple
banana
cherry
```

---

### Test 19: Sort & Remove Duplicates - Descending

1. Update settings:
   - **Sort Direction**: `Descending (Z-A)`
2. Click **Execute Node**

**Expected Output**:
```
cherry
banana
apple
```

---

### Test 20: Remove Line Breaks - Single Line

1. Update the CleanTextLab node:
   - **Tool**: `Remove Line Breaks`
   - **Input Text**:
     ```
     This is line 1
     This is line 2
     This is line 3
     ```
   - **Mode**: `Single Line (remove all)`
2. Click **Execute Node**

**Expected Output**: `This is line 1 This is line 2 This is line 3`

---

### Test 21: Remove Line Breaks - Preserve Paragraphs

1. Update settings:
   - **Input Text**:
     ```
     Line 1 of paragraph 1
     Line 2 of paragraph 1

     Line 1 of paragraph 2
     Line 2 of paragraph 2
     ```
   - **Mode**: `Preserve Paragraphs`
2. Click **Execute Node**

**Expected Output**: Two paragraphs separated by double newline, single line breaks within paragraphs removed

---

## Tools Without Configuration (Simple Tests)

For tools without config options, test basic functionality:

### Test 22: Trim Lines

- **Input**: `  hello  \n  world  `
- **Expected**: `hello\nworld`

### Test 23: Collapse Spaces

- **Input**: `hello    world`
- **Expected**: `hello world`

### Test 24: Upper Case

- **Input**: `hello world`
- **Expected**: `HELLO WORLD`

### Test 25: Lower Case

- **Input**: `HELLO WORLD`
- **Expected**: `hello world`

### Test 26: Title Case

- **Input**: `hello world from n8n`
- **Expected**: `Hello World From N8n`

### Test 27: Remove Accents

- **Input**: `Café résumé naïve`
- **Expected**: `Cafe resume naive`

### Test 28: JSON Formatter

- **Input**: `{"name":"Alice","age":30}`
- **Expected**: Properly formatted/indented JSON

### Test 29: Email Extractor

- **Input**: `Contact us at support@example.com or sales@test.org for help`
- **Expected**: `support@example.com\nsales@test.org`

### Test 30: Sanitize URL

- **Input**: `https://example.com/<script>alert('xss')</script>`
- **Expected**: Sanitized URL without dangerous content

## Success Checklist

After completing all tests, verify:

- ✅ All 35 tools appear in the Tool dropdown
- ✅ CSV semicolon delimiter works (FAQ #2 - CRITICAL)
- ✅ CSV tab delimiter works
- ✅ CSV pipe delimiter works
- ✅ Hash generator with 4 algorithms (SHA-256, SHA-512, SHA-1, MD5)
- ✅ Hash generator with 2 formats (hex, base64)
- ✅ Base64 encode works
- ✅ Base64 decode works
- ✅ Base64 auto-detect works
- ✅ Hex converter with 3 modes (text, binary, number)
- ✅ Hex converter with 3 delimiters (none, space, colon)
- ✅ UUID v4 generation works
- ✅ UUID v7 generation works
- ✅ UUID count parameter works (1-100)
- ✅ YAML to JSON conversion works
- ✅ JSON to YAML conversion works
- ✅ Phone formatter with 3 formats (E.164, National, International)
- ✅ Sort ascending works
- ✅ Sort descending works
- ✅ Remove line breaks (single line) works
- ✅ Remove line breaks (preserve paragraphs) works
- ✅ All config options display conditionally based on tool selection
- ✅ Config object is returned in output
- ✅ Error handling works (test with invalid input)

## Troubleshooting

### Node Not Appearing in Search

1. Check Docker container is running: `docker ps`
2. Verify node files exist: `docker exec CONTAINER_ID ls -la /home/node/.n8n/custom/n8n-nodes-cleantextlab/dist/`
3. Restart n8n: `docker restart CONTAINER_ID`

### Credential Test Fails

- Verify API key is correct (starts with `ctl_live_`)
- Ensure you have a Pro account (not Free tier)
- Check API URL is exactly: `https://cleantextlab.com/api/v1`

### Config Options Not Showing

- Make sure you've selected a tool first
- Config options only appear for 11 specific tools
- Restart n8n if changes aren't appearing

### Execution Fails

- Check n8n logs: `docker logs CONTAINER_ID`
- Verify credentials are set on the node
- Test API key directly with curl to isolate issue

---

**Pro Tip**: Create a test workflow with all 11 configurable tools and save it. This makes regression testing easy when updating the node.

**Test Workflow Template**: See `test-workflow.json` in the package root for a pre-configured workflow with the 3 most critical tests.
