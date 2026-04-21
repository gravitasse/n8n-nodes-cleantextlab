# n8n-nodes-cleantextlab

This is an n8n community node that provides access to [CleanTextLab](https://cleantextlab.com) - a privacy-focused text processing suite with 35+ tools.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

**✨ Key Features:**
- 35+ text processing tools in one node
- Configurable options (CSV delimiters, hash algorithms, encoding, etc.)
- Privacy-first: Deterministic processing, no AI hallucinations
- 5,000 API calls/day on Pro plan
- Perfect for data pipelines, ETL workflows, and text automation

[Installation](#installation) | [Operations](#operations) | [Credentials](#credentials) | [Compatibility](#compatibility) | [Usage](#usage) | [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Using npm

1. Go to **Settings > Community Nodes** in n8n
2. Click **Install**
3. Enter `n8n-nodes-cleantextlab`
4. Agree to the risks
5. Click **Install**

After installation, restart your n8n instance to load the node.

## Operations

The CleanTextLab node supports 35+ text processing operations across three categories:

### Text Formatting
- Trim Lines
- Collapse Spaces
- Upper/Lower/Title Case
- Remove Line Breaks
- Sort & Remove Duplicates
- Remove Accents
- Remove All Spaces
- Rosetta Stone (Multi-Language Cleaner)

### Data Processing
- **CSV to JSON Converter** (supports custom delimiters `,` `;` `tab` `|`)
- JSON Formatter
- YAML/JSON Converter
- **Base64 Encode/Decode** (auto-detect or force direction)
- **Hash Generator** (SHA-256/512/1, MD5, hex/base64 output)
- **Hex Converter** (text/binary/number modes)

### Developer Tools
- UUID Generator (v4/v7)
- Unix Timestamp Converter
- Email Extractor
- URL Sanitizer
- Phone Number Formatter
- Word Counter
- Password Strength Checker
- SQL Formatter
- JWT Decoder
- Regex Tester
- And 15+ more...

## Credentials

This node requires **CleanTextLab API** credentials.

### Getting Your API Key

1. Sign up for a [CleanTextLab Pro account](https://cleantextlab.com/pricing) ($5/month launch pricing)
2. Go to **Settings → API Keys**
3. Generate a new API key
4. Copy the key (starts with `ctl_live_...`)

### Adding Credentials to n8n

1. In n8n, go to **Credentials** in the left sidebar
2. Click **+ Add Credential**
3. Search for "CleanTextLab API"
4. Paste your API key
5. Click **Save**

## Compatibility

- **n8n version**: 1.0.0 or later
- **Node version**: 16.x or later

## Usage

### Basic Example: Trim and Uppercase Text

```
Input: "  hello world  "
Tool: Upper Case
Output: "HELLO WORLD"
```

### Advanced Example: CSV with Semicolon Delimiter

```
Input:
name;age;city
Alice;30;Paris
Bob;25;London

Tool: CSV to JSON Converter
Config:
  - CSV Delimiter: Semicolon (;)
  - Has Headers: true

Output:
[
  {"name": "Alice", "age": "30", "city": "Paris"},
  {"name": "Bob", "age": "25", "city": "London"}
]
```

### Advanced Example: SHA-512 Hash in Base64

```
Input: "my-secret-password"
Tool: Hash Generator
Config:
  - Hash Algorithm: SHA-512
  - Output Format: Base64

Output: "dvfV6XyNZM+DWczsaq/c3..."
```

### Chaining Multiple Tools (via API)

While the n8n node processes one tool at a time, you can use multiple nodes in sequence or call the CleanTextLab API directly for multi-step workflows:

```json
{
  "input": "  HELLO\n  WORLD  ",
  "steps": [
    "trim-lines",
    "lower-case",
    "collapse-spaces"
  ]
}
```

Result: `"hello world"`

## Configuration Options

### Tools with Configurable Parameters

#### CSV to JSON Converter
- **CSV Delimiter**: `,` `;` `tab` `|`
- **Has Headers**: `true` | `false`

#### Hash Generator
- **Algorithm**: `SHA-256` | `SHA-512` | `SHA-1` | `MD5`
- **Output Format**: `hex` | `base64`

#### Base64 Encode/Decode
- **Direction**: `auto` | `encode` | `decode`

#### Hex Converter
- **Mode**: `text` | `binary` | `number`
- **Direction**: `auto` | `encode` | `decode`
- **Delimiter**: `none` | `space` | `colon`

#### UUID Generator
- **Version**: `v4` (random) | `v7` (timestamp-based)
- **Count**: `1-100`

#### Phone Number Formatter
- **Format**: `e164` | `national` | `international`

#### Sort & Remove Duplicates
- **Sort Direction**: `asc` | `desc`

#### And more...

See the [full configuration documentation](https://cleantextlab.com/docs/n8n) for all options.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [CleanTextLab Documentation](https://cleantextlab.com/docs/n8n)
- [CleanTextLab API Reference](https://cleantextlab.com/docs/api)
- [Example n8n Workflows](https://cleantextlab.com/automation)

### Support

- **Issues**: [GitHub Issues](https://github.com/cleantextlab/n8n-nodes-cleantextlab/issues)
- **Email**: support@cleantextlab.com
- **Documentation**: https://cleantextlab.com/docs/n8n

## Development

### Building the Node

```bash
npm install
npm run build
```

### Testing Locally

1. Link the package:
```bash
npm link
```

2. In your n8n installation:
```bash
cd ~/.n8n/custom
npm link n8n-nodes-cleantextlab
```

3. Restart n8n

### Publishing

```bash
npm run build
npm publish
```

## License

[MIT](LICENSE.md)

## Version History

### 0.1.0 (2025-12-26)
- Initial release
- 35+ text processing tools
- Full configuration support for CSV, Hash, Base64, Hex, UUID, and more
- Privacy-focused, deterministic processing

---

Made with ❤️ by the [CleanTextLab](https://cleantextlab.com) team
