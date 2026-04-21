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
		description: 'Process text and data using the CleanTextLab API',
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
			{
				displayName: 'Tool',
				name: 'tool',
				type: 'options',
				options: [
					{ name: 'Accent Remover', value: 'remove-accents' },
					{ name: 'ASCII Tree Generator', value: 'ascii-tree-generator' },
					{ name: 'Base64 Encode/Decode', value: 'base64-encode-decode' },
					{ name: 'Collapse Spaces', value: 'collapse-spaces' },
					{ name: 'Cron Generator', value: 'cron-generator' },
					{ name: 'CSV to JSON Converter', value: 'csv-json-converter' },
					{ name: 'Email Extractor', value: 'email-extractor' },
					{ name: 'Hash Generator', value: 'hash-generator' },
					{ name: 'Hex Converter', value: 'hex-converter' },
					{ name: 'JSON Formatter', value: 'json-formatter' },
					{ name: 'Line Break Remover', value: 'remove-line-breaks' },
					{ name: 'Password Generator', value: 'password-generator' },
					{ name: 'Lower Case', value: 'lower-case' },
					{ name: 'Remove All Spaces', value: 'remove-all-spaces' },
					{ name: 'Sanitize URL', value: 'sanitize-url' },
					{ name: 'Sort & Remove Duplicates', value: 'sort-remove-duplicates' },
					{ name: 'Title Case Converter', value: 'title-case-converter' },
					{ name: 'Trim Lines', value: 'trim-lines' },
					{ name: 'Unix Timestamp Converter', value: 'unix-timestamp-converter' },
					{ name: 'Upper Case', value: 'upper-case' },
					{ name: 'UUID Generator', value: 'uuid-generator' },
					{ name: 'YAML to JSON Converter', value: 'yaml-json-converter' },
				],
				default: 'trim-lines',
				description: 'The CleanTextLab tool to run against your input',
			},

			{
				displayName: 'Input Text',
				name: 'inputText',
				type: 'string',
				default: '',
				required: true,
				description: 'The text, CSV, JSON, or data you want to process',
			},
			
			// --- CSV CONFIGURATION (Only shows when CSV tool is selected) ---
			{
				displayName: 'Delimiter',
				name: 'csvDelimiter',
				type: 'options',
				displayOptions: { show: { tool: ['csv-json-converter'] } },
				options: [
					{ name: 'Comma (,)', value: ',' },
					{ name: 'Semicolon (;)', value: ';' },
					{ name: 'Tab', value: '\t' },
					{ name: 'Pipe (|)', value: '|' },
				],
				default: ',',
				description: 'The character that separates your CSV columns',
			},
			{
				displayName: 'Has Headers',
				name: 'csvHasHeaders',
				type: 'boolean',
				displayOptions: { show: { tool: ['csv-json-converter'] } },
				default: true,
				description: 'Whether the first row contains column names',
			},

			// --- HASH CONFIGURATION (Only shows when Hash tool is selected) ---
			{
				displayName: 'Algorithm',
				name: 'hashAlgorithm',
				type: 'options',
				displayOptions: { show: { tool: ['hash-generator'] } },
				options: [
					{ name: 'SHA-256', value: 'SHA-256' },
					{ name: 'SHA-512', value: 'SHA-512' },
					{ name: 'SHA-1', value: 'SHA-1' },
					{ name: 'MD5', value: 'MD5' },
				],
				default: 'SHA-256',
			},
			{
				displayName: 'Format',
				name: 'hashFormat',
				type: 'options',
				displayOptions: { show: { tool: ['hash-generator'] } },
				options: [
					{ name: 'Hex', value: 'hex' },
					{ name: 'Base64', value: 'base64' },
				],
				default: 'hex',
			},

			// --- BASE64 CONFIGURATION (Only shows when Base64 tool is selected) ---
			{
				displayName: 'Direction',
				name: 'base64Direction',
				type: 'options',
				displayOptions: { show: { tool: ['base64-encode-decode'] } },
				options: [
					{ name: 'Auto-detect', value: 'auto' },
					{ name: 'Encode', value: 'encode' },
					{ name: 'Decode', value: 'decode' },
				],
				default: 'auto',
			},

			// --- YAML/JSON CONFIGURATION (Only shows when YAML tool is selected) ---
			{
				displayName: 'Conversion Mode',
				name: 'yamlConversionMode',
				type: 'options',
				displayOptions: { show: { tool: ['yaml-json-converter'] } },
				options: [
					{ name: 'Auto-detect', value: 'auto' },
					{ name: 'YAML to JSON', value: 'yaml-to-json' },
					{ name: 'JSON to YAML', value: 'json-to-yaml' },
				],
				default: 'auto',
			},

			// --- PASSWORD GENERATOR CONFIGURATION ---
			{
				displayName: 'Password Length',
				name: 'passwordLength',
				type: 'number',
				displayOptions: { show: { tool: ['password-generator'] } },
				default: 16,
				typeOptions: { minValue: 8, maxValue: 128 },
			},
			{
				displayName: 'Include Uppercase',
				name: 'passwordUppercase',
				type: 'boolean',
				displayOptions: { show: { tool: ['password-generator'] } },
				default: true,
			},
			{
				displayName: 'Include Lowercase',
				name: 'passwordLowercase',
				type: 'boolean',
				displayOptions: { show: { tool: ['password-generator'] } },
				default: true,
			},
			{
				displayName: 'Include Numbers',
				name: 'passwordNumbers',
				type: 'boolean',
				displayOptions: { show: { tool: ['password-generator'] } },
				default: true,
			},
			{
				displayName: 'Include Symbols',
				name: 'passwordSymbols',
				type: 'boolean',
				displayOptions: { show: { tool: ['password-generator'] } },
				default: true,
			},

			// --- UUID GENERATOR CONFIGURATION ---
			{
				displayName: 'UUID Version',
				name: 'uuidVersion',
				type: 'options',
				displayOptions: { show: { tool: ['uuid-generator'] } },
				options: [
					{ name: 'v4 (Random)', value: 'v4' },
					{ name: 'v1 (Timestamp)', value: 'v1' },
					{ name: 'v7 (Time-ordered)', value: 'v7' },
				],
				default: 'v4',
			},
			{
				displayName: 'Count',
				name: 'uuidCount',
				type: 'number',
				displayOptions: { show: { tool: ['uuid-generator'] } },
				default: 1,
				typeOptions: { minValue: 1, maxValue: 1000 },
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const inputText = this.getNodeParameter('inputText', i) as string;
				const tool = this.getNodeParameter('tool', i) as string;

				// 1. Build the config object dynamically based on the selected tool
				const config: Record<string, unknown> = {};

				if (tool === 'csv-json-converter') {
					config.delimiter = this.getNodeParameter('csvDelimiter', i) as string;
					config.hasHeaders = this.getNodeParameter('csvHasHeaders', i) as boolean;
				} else if (tool === 'hash-generator') {
					config.algorithm = this.getNodeParameter('hashAlgorithm', i) as string;
					config.format = this.getNodeParameter('hashFormat', i) as string;
				} else if (tool === 'base64-encode-decode') {
					config.direction = this.getNodeParameter('base64Direction', i) as string;
				} else if (tool === 'yaml-json-converter') {
					config.conversionMode = this.getNodeParameter('yamlConversionMode', i) as string;
				} else if (tool === 'password-generator') {
					config.length = this.getNodeParameter('passwordLength', i) as number;
					config.includeUppercase = this.getNodeParameter('passwordUppercase', i) as boolean;
					config.includeLowercase = this.getNodeParameter('passwordLowercase', i) as boolean;
					config.includeNumbers = this.getNodeParameter('passwordNumbers', i) as boolean;
					config.includeSymbols = this.getNodeParameter('passwordSymbols', i) as boolean;
				} else if (tool === 'uuid-generator') {
					config.version = this.getNodeParameter('uuidVersion', i) as string;
					config.count = this.getNodeParameter('uuidCount', i) as number;
				}

				// 2. Construct the CleanTextLab API payload
				const body = {
					input: inputText,
					steps: [
						Object.keys(config).length > 0
							? { toolSlug: tool, config }
							: tool
					]
				};

				// 3. Make the request using n8n's authenticated helper
				const responseData = await this.helpers.requestWithAuthentication.call(this, 'cleanTextLabApi', {
					method: 'POST',
					url: 'https://cleantextlab.com/api/v1/run',
					body,
					json: true,
				});

				// 4. Push the successful result
				returnData.push({
					json: { 
						output: responseData.output || responseData,
						steps: responseData.steps || []
					},
					pairedItem: { item: i }
				});

			} catch (error: any) {
				// Extract CleanTextLab API specific error messages if available
				const apiError = error.response?.data?.error || error.description || error.message || String(error);
				
				if (this.continueOnFail()) {
					returnData.push({ json: { error: apiError }, pairedItem: { item: i } });
					continue;
				}
				throw new NodeOperationError(this.getNode(), `CleanTextLab API Error: ${apiError}`, { itemIndex: i });
			}
		}

		return [returnData];
	}
}