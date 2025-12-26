#!/bin/bash

# Test script for CleanTextLab n8n node configuration options
# This script tests all 11 configurable tools to ensure configs are properly passed

set -e

API_URL="https://cleantextlab.com/api/v1"
API_KEY="${CLEANTEXTLAB_API_KEY}"

if [ -z "$API_KEY" ]; then
    echo "Error: CLEANTEXTLAB_API_KEY environment variable not set"
    echo "Get your API key from: https://cleantextlab.com/settings"
    exit 1
fi

echo "Testing CleanTextLab n8n Node Configuration Options"
echo "===================================================="
echo ""

# Test 1: CSV with Semicolon Delimiter (CRITICAL - FAQ #2)
echo "Test 1: CSV with Semicolon Delimiter"
echo "-------------------------------------"
RESPONSE=$(curl -s -X POST "$API_URL/run" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "input": "name;age;city\nAlice;30;Paris\nBob;25;London",
    "steps": [
      {
        "toolSlug": "csv-json-converter",
        "config": {
          "delimiter": ";",
          "hasHeaders": true
        }
      }
    ]
  }')

echo "Input: name;age;city\\nAlice;30;Paris\\nBob;25;London"
echo "Config: delimiter=';', hasHeaders=true"
echo "Response: $RESPONSE"
echo ""

# Test 2: CSV with Pipe Delimiter
echo "Test 2: CSV with Pipe Delimiter"
echo "--------------------------------"
RESPONSE=$(curl -s -X POST "$API_URL/run" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "input": "name|age|city\nCarol|28|Berlin",
    "steps": [
      {
        "toolSlug": "csv-json-converter",
        "config": {
          "delimiter": "|",
          "hasHeaders": true
        }
      }
    ]
  }')

echo "Input: name|age|city\\nCarol|28|Berlin"
echo "Config: delimiter='|', hasHeaders=true"
echo "Response: $RESPONSE"
echo ""

# Test 3: Hash Generator - SHA-512 with Base64
echo "Test 3: Hash Generator - SHA-512 with Base64"
echo "--------------------------------------------"
RESPONSE=$(curl -s -X POST "$API_URL/run" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "input": "password123",
    "steps": [
      {
        "toolSlug": "hash-generator",
        "config": {
          "algorithm": "SHA-512",
          "format": "base64"
        }
      }
    ]
  }')

echo "Input: password123"
echo "Config: algorithm='SHA-512', format='base64'"
echo "Response: $RESPONSE"
echo ""

# Test 4: Hash Generator - MD5 with Hex
echo "Test 4: Hash Generator - MD5 with Hex"
echo "--------------------------------------"
RESPONSE=$(curl -s -X POST "$API_URL/run" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "input": "test",
    "steps": [
      {
        "toolSlug": "hash-generator",
        "config": {
          "algorithm": "MD5",
          "format": "hex"
        }
      }
    ]
  }')

echo "Input: test"
echo "Config: algorithm='MD5', format='hex'"
echo "Response: $RESPONSE"
echo ""

# Test 5: Base64 Encode
echo "Test 5: Base64 Encode"
echo "---------------------"
RESPONSE=$(curl -s -X POST "$API_URL/run" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "input": "Hello World",
    "steps": [
      {
        "toolSlug": "base64-encode-decode",
        "config": {
          "direction": "encode"
        }
      }
    ]
  }')

echo "Input: Hello World"
echo "Config: direction='encode'"
echo "Response: $RESPONSE"
echo ""

# Test 6: Base64 Decode
echo "Test 6: Base64 Decode"
echo "---------------------"
RESPONSE=$(curl -s -X POST "$API_URL/run" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "input": "SGVsbG8gV29ybGQ=",
    "steps": [
      {
        "toolSlug": "base64-encode-decode",
        "config": {
          "direction": "decode"
        }
      }
    ]
  }')

echo "Input: SGVsbG8gV29ybGQ="
echo "Config: direction='decode'"
echo "Response: $RESPONSE"
echo ""

# Test 7: Hex Converter - Text to Hex with Colon Delimiter
echo "Test 7: Hex Converter - Text to Hex with Colon Delimiter"
echo "---------------------------------------------------------"
RESPONSE=$(curl -s -X POST "$API_URL/run" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "input": "ABC",
    "steps": [
      {
        "toolSlug": "hex-converter",
        "config": {
          "mode": "text",
          "direction": "encode",
          "delimiter": "colon"
        }
      }
    ]
  }')

echo "Input: ABC"
echo "Config: mode='text', direction='encode', delimiter='colon'"
echo "Response: $RESPONSE"
echo ""

# Test 8: UUID Generator - v7 with Count 5
echo "Test 8: UUID Generator - v7 with Count 5"
echo "----------------------------------------"
RESPONSE=$(curl -s -X POST "$API_URL/run" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "input": "",
    "steps": [
      {
        "toolSlug": "uuid-generator",
        "config": {
          "version": "v7",
          "count": 5
        }
      }
    ]
  }')

echo "Input: (empty)"
echo "Config: version='v7', count=5"
echo "Response: $RESPONSE"
echo ""

# Test 9: YAML to JSON Conversion
echo "Test 9: YAML to JSON Conversion"
echo "--------------------------------"
RESPONSE=$(curl -s -X POST "$API_URL/run" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "input": "name: Alice\nage: 30\ncity: Paris",
    "steps": [
      {
        "toolSlug": "yaml-json-converter",
        "config": {
          "conversionMode": "yaml-to-json"
        }
      }
    ]
  }')

echo "Input: name: Alice\\nage: 30\\ncity: Paris"
echo "Config: conversionMode='yaml-to-json'"
echo "Response: $RESPONSE"
echo ""

# Test 10: Phone Number Formatter - E.164
echo "Test 10: Phone Number Formatter - E.164"
echo "---------------------------------------"
RESPONSE=$(curl -s -X POST "$API_URL/run" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "input": "(415) 555-2671",
    "steps": [
      {
        "toolSlug": "phone-number-formatter",
        "config": {
          "format": "e164"
        }
      }
    ]
  }')

echo "Input: (415) 555-2671"
echo "Config: format='e164'"
echo "Response: $RESPONSE"
echo ""

# Test 11: Sort & Dedupe - Descending
echo "Test 11: Sort & Dedupe - Descending"
echo "------------------------------------"
RESPONSE=$(curl -s -X POST "$API_URL/run" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "input": "apple\nbanana\napple\ncherry\nbanana",
    "steps": [
      {
        "toolSlug": "dedupe-sort",
        "config": {
          "direction": "desc"
        }
      }
    ]
  }')

echo "Input: apple\\nbanana\\napple\\ncherry\\nbanana"
echo "Config: direction='desc'"
echo "Response: $RESPONSE"
echo ""

# Test 12: Remove Line Breaks - Preserve Paragraphs
echo "Test 12: Remove Line Breaks - Preserve Paragraphs"
echo "--------------------------------------------------"
RESPONSE=$(curl -s -X POST "$API_URL/run" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "input": "Line 1\nLine 2\n\nParagraph 2\nLine 1",
    "steps": [
      {
        "toolSlug": "remove-line-breaks",
        "config": {
          "mode": "preserve-paragraphs"
        }
      }
    ]
  }')

echo "Input: Line 1\\nLine 2\\n\\nParagraph 2\\nLine 1"
echo "Config: mode='preserve-paragraphs'"
echo "Response: $RESPONSE"
echo ""

echo "===================================================="
echo "All configuration tests completed!"
echo "===================================================="
