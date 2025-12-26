import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

export class CleanTextLab implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'CleanTextLab',
		name: 'cleanTextLab',
		icon: 'file:cleantextlab.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["tool"]}}',
		description: 'Process text with 35+ privacy-focused tools',
		defaults: {
			name: 'CleanTextLab',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'cleanTextLabApi',
				required: true,
			},
		],
		properties: [
			// Tool Selector
			{
				displayName: 'Tool',
				name: 'tool',
				type: 'options',
				required: true,
				default: 'trim-lines',
				description: 'The text processing tool to use',
				options: [
					// Text Formatting
					{ name: 'Trim Lines', value: 'trim-lines' },
					{ name: 'Collapse Spaces', value: 'collapse-spaces' },
					{ name: 'Upper Case', value: 'upper-case' },
					{ name: 'Lower Case', value: 'lower-case' },
					{ name: 'Title Case Converter', value: 'title-case-converter' },
					{ name: 'Remove Line Breaks', value: 'remove-line-breaks' },
					{ name: 'Sort & Remove Duplicates', value: 'dedupe-sort' },
					{ name: 'Remove Accents', value: 'remove-accents' },
					// Data Processing
					{ name: 'JSON Formatter', value: 'json-formatter' },
					{ name: 'CSV to JSON Converter', value: 'csv-json-converter' },
					{ name: 'YAML/JSON Converter', value: 'yaml-json-converter' },
					{ name: 'Base64 Encode/Decode', value: 'base64-encode-decode' },
					{ name: 'Hash Generator', value: 'hash-generator' },
					{ name: 'Hex Converter', value: 'hex-converter' },
					// Developer Tools
					{ name: 'UUID Generator', value: 'uuid-generator' },
					{ name: 'Unix Timestamp Converter', value: 'unix-timestamp-converter' },
					{ name: 'Sanitize URL', value: 'sanitize-url' },
					{ name: 'Email Extractor', value: 'email-extractor' },
					{ name: 'Cron Generator', value: 'cron-generator' },
					{ name: 'ASCII Tree Generator', value: 'ascii-tree-generator' },
					{ name: 'Word Counter', value: 'word-counter' },
					{ name: 'Password Strength Checker', value: 'password-strength-checker' },
					{ name: 'Phone Number Formatter', value: 'phone-number-formatter' },
					{ name: 'Roman Numerals Converter', value: 'roman-numerals-converter' },
					{ name: 'Number to Words', value: 'number-to-words' },
					{ name: 'URL Encode/Decode', value: 'url-encode-decode' },
					{ name: 'SQL Formatter', value: 'sql-formatter' },
					{ name: 'JWT Decoder', value: 'jwt-decoder' },
					{ name: 'Markdown Preview', value: 'markdown-preview' },
					{ name: 'Diff Checker', value: 'diff-checker' },
					{ name: 'Token Analyzer', value: 'token-analyzer' },
					{ name: 'MIME Type Lookup', value: 'mime-type-lookup' },
					{ name: 'SMS Length Calculator', value: 'sms-length-calculator' },
					{ name: 'Subnet Calculator', value: 'subnet-calculator' },
					{ name: 'Regex Tester', value: 'regex-tester' },
				],
			},
			// Input field
			{
				displayName: 'Input Text',
				name: 'inputText',
				type: 'string',
				typeOptions: {
					rows: 10,
				},
				default: '',
				required: true,
				description: 'The text to process (can use expressions like {{$json.fieldName}})',
				placeholder: 'Enter text or reference a field from previous node',
			},

			// ============= CSV Converter Config =============
			{
				displayName: 'CSV Delimiter',
				name: 'csvDelimiter',
				type: 'options',
				displayOptions: {
					show: {
						tool: ['csv-json-converter'],
					},
				},
				options: [
					{ name: 'Comma (,)', value: ',' },
					{ name: 'Semicolon (;)', value: ';' },
					{ name: 'Tab', value: '\t' },
					{ name: 'Pipe (|)', value: '|' },
				],
				default: ',',
				description: 'Character that separates CSV columns',
			},
			{
				displayName: 'Has Headers',
				name: 'csvHasHeaders',
				type: 'boolean',
				displayOptions: {
					show: {
						tool: ['csv-json-converter'],
					},
				},
				default: true,
				description: 'Whether the first row contains column names',
			},

			// ============= Hash Generator Config =============
			{
				displayName: 'Hash Algorithm',
				name: 'hashAlgorithm',
				type: 'options',
				displayOptions: {
					show: {
						tool: ['hash-generator'],
					},
				},
				options: [
					{ name: 'SHA-256', value: 'SHA-256' },
					{ name: 'SHA-512', value: 'SHA-512' },
					{ name: 'SHA-1', value: 'SHA-1' },
					{ name: 'MD5', value: 'MD5' },
				],
				default: 'SHA-256',
				description: 'The hashing algorithm to use',
			},
			{
				displayName: 'Output Format',
				name: 'hashFormat',
				type: 'options',
				displayOptions: {
					show: {
						tool: ['hash-generator'],
					},
				},
				options: [
					{ name: 'Hexadecimal', value: 'hex' },
					{ name: 'Base64', value: 'base64' },
				],
				default: 'hex',
				description: 'How to format the hash output',
			},

			// ============= Base64 Config =============
			{
				displayName: 'Direction',
				name: 'base64Direction',
				type: 'options',
				displayOptions: {
					show: {
						tool: ['base64-encode-decode'],
					},
				},
				options: [
					{ name: 'Auto-detect', value: 'auto' },
					{ name: 'Encode', value: 'encode' },
					{ name: 'Decode', value: 'decode' },
				],
				default: 'auto',
				description: 'Force encoding/decoding direction or auto-detect',
			},

			// ============= Hex Converter Config =============
			{
				displayName: 'Conversion Mode',
				name: 'hexMode',
				type: 'options',
				displayOptions: {
					show: {
						tool: ['hex-converter'],
					},
				},
				options: [
					{ name: 'Text', value: 'text' },
					{ name: 'Binary', value: 'binary' },
					{ name: 'Number', value: 'number' },
				],
				default: 'text',
				description: 'What type of conversion to perform',
			},
			{
				displayName: 'Direction',
				name: 'hexDirection',
				type: 'options',
				displayOptions: {
					show: {
						tool: ['hex-converter'],
					},
				},
				options: [
					{ name: 'Auto-detect', value: 'auto' },
					{ name: 'Encode (to hex)', value: 'encode' },
					{ name: 'Decode (from hex)', value: 'decode' },
				],
				default: 'auto',
			},
			{
				displayName: 'Hex Delimiter',
				name: 'hexDelimiter',
				type: 'options',
				displayOptions: {
					show: {
						tool: ['hex-converter'],
					},
				},
				options: [
					{ name: 'None', value: 'none' },
					{ name: 'Space', value: 'space' },
					{ name: 'Colon (:)', value: 'colon' },
				],
				default: 'space',
				description: 'How to format hex output',
			},

			// ============= UUID Generator Config =============
			{
				displayName: 'UUID Version',
				name: 'uuidVersion',
				type: 'options',
				displayOptions: {
					show: {
						tool: ['uuid-generator'],
					},
				},
				options: [
					{ name: 'v4 (Random)', value: 'v4' },
					{ name: 'v7 (Timestamp-based)', value: 'v7' },
				],
				default: 'v4',
				description: 'UUID version to generate',
			},
			{
				displayName: 'Count',
				name: 'uuidCount',
				type: 'number',
				displayOptions: {
					show: {
						tool: ['uuid-generator'],
					},
				},
				default: 1,
				typeOptions: {
					minValue: 1,
					maxValue: 100,
				},
				description: 'How many UUIDs to generate',
			},

			// ============= YAML/JSON Converter Config =============
			{
				displayName: 'Conversion Mode',
				name: 'yamlConversionMode',
				type: 'options',
				displayOptions: {
					show: {
						tool: ['yaml-json-converter'],
					},
				},
				options: [
					{ name: 'Auto-detect', value: 'auto' },
					{ name: 'YAML to JSON', value: 'yaml-to-json' },
					{ name: 'JSON to YAML', value: 'json-to-yaml' },
				],
				default: 'auto',
			},

			// ============= Phone Number Formatter Config =============
			{
				displayName: 'Format',
				name: 'phoneFormat',
				type: 'options',
				displayOptions: {
					show: {
						tool: ['phone-number-formatter'],
					},
				},
				options: [
					{ name: 'E.164 (+14155552671)', value: 'e164' },
					{ name: 'National ((415) 555-2671)', value: 'national' },
					{ name: 'International (+1 415 555 2671)', value: 'international' },
				],
				default: 'e164',
			},

			// ============= Sort/Dedupe Config =============
			{
				displayName: 'Sort Direction',
				name: 'sortDirection',
				type: 'options',
				displayOptions: {
					show: {
						tool: ['dedupe-sort'],
					},
				},
				options: [
					{ name: 'Ascending (A-Z)', value: 'asc' },
					{ name: 'Descending (Z-A)', value: 'desc' },
				],
				default: 'asc',
			},

			// ============= Line Break Remover Config =============
			{
				displayName: 'Mode',
				name: 'lineBreakMode',
				type: 'options',
				displayOptions: {
					show: {
						tool: ['remove-line-breaks'],
					},
				},
				options: [
					{ name: 'Single Line (remove all)', value: 'single-line' },
					{ name: 'Preserve Paragraphs', value: 'preserve-paragraphs' },
				],
				default: 'single-line',
			},

			// ============= Remove Spaces Config =============
			{
				displayName: 'Mode',
				name: 'removeSpacesMode',
				type: 'options',
				displayOptions: {
					show: {
						tool: ['remove-all-spaces'],
					},
				},
				options: [
					{ name: 'All Spaces', value: 'all-spaces' },
					{ name: 'Leading/Trailing Only', value: 'leading-trailing' },
					{ name: 'Extra Spaces Only', value: 'extra-spaces' },
				],
				default: 'all-spaces',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials('cleanTextLabApi');

		for (let i = 0; i < items.length; i++) {
			try {
				const tool = this.getNodeParameter('tool', i) as string;
				const inputText = this.getNodeParameter('inputText', i, '') as string;

				// Build config object based on selected tool
				const config: Record<string, unknown> = {};

				// CSV Converter config
				if (tool === 'csv-json-converter') {
					config.delimiter = this.getNodeParameter('csvDelimiter', i, ',') as string;
					config.hasHeaders = this.getNodeParameter('csvHasHeaders', i, true) as boolean;
				}
				// Hash Generator config
				else if (tool === 'hash-generator') {
					config.algorithm = this.getNodeParameter('hashAlgorithm', i, 'SHA-256') as string;
					config.format = this.getNodeParameter('hashFormat', i, 'hex') as string;
				}
				// Base64 config
				else if (tool === 'base64-encode-decode') {
					config.direction = this.getNodeParameter('base64Direction', i, 'auto') as string;
				}
				// Hex Converter config
				else if (tool === 'hex-converter') {
					config.mode = this.getNodeParameter('hexMode', i, 'text') as string;
					config.direction = this.getNodeParameter('hexDirection', i, 'auto') as string;
					config.delimiter = this.getNodeParameter('hexDelimiter', i, 'space') as string;
				}
				// UUID Generator config
				else if (tool === 'uuid-generator') {
					config.version = this.getNodeParameter('uuidVersion', i, 'v4') as string;
					config.count = this.getNodeParameter('uuidCount', i, 1) as number;
				}
				// YAML/JSON Converter config
				else if (tool === 'yaml-json-converter') {
					config.conversionMode = this.getNodeParameter('yamlConversionMode', i, 'auto') as string;
				}
				// Phone Number Formatter config
				else if (tool === 'phone-number-formatter') {
					config.format = this.getNodeParameter('phoneFormat', i, 'e164') as string;
				}
				// Sort/Dedupe config
				else if (tool === 'dedupe-sort' || tool === 'sort-remove-duplicates') {
					config.direction = this.getNodeParameter('sortDirection', i, 'asc') as string;
				}
				// Line Break Remover config
				else if (tool === 'remove-line-breaks') {
					config.mode = this.getNodeParameter('lineBreakMode', i, 'single-line') as string;
				}
				// Remove Spaces config
				else if (tool === 'remove-all-spaces') {
					config.mode = this.getNodeParameter('removeSpacesMode', i, 'all-spaces') as string;
				}

				// Construct API request body
				const requestBody: {
					input: string;
					steps: Array<string | { toolSlug: string; config?: Record<string, unknown> }>;
				} = {
					input: inputText,
					steps: [
						Object.keys(config).length > 0
							? {
									toolSlug: tool,
									config,
							  }
							: tool,
					],
				};

				// Make API request
				const apiUrl = credentials.apiUrl as string;
				const response = await this.helpers.request({
					method: 'POST',
					url: `${apiUrl}/run`,
					headers: {
						'Content-Type': 'application/json',
						'x-api-key': credentials.apiKey as string,
					},
					body: requestBody,
					json: true,
				});

				// Return result
				returnData.push({
					json: {
						result: response.result,
						meta: response.meta || {},
						tool,
						config: Object.keys(config).length > 0 ? config : undefined,
					},
					pairedItem: { item: i },
				});
			} catch (error) {
				if (this.continueOnFail()) {
					const errorMessage = error instanceof Error ? error.message : String(error);
					returnData.push({
						json: {
							error: errorMessage,
						},
						pairedItem: { item: i },
					});
					continue;
				}
				throw new NodeOperationError(this.getNode(), error as Error);
			}
		}

		return [returnData];
	}
}
