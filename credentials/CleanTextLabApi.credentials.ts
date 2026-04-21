import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class CleanTextLabApi implements ICredentialType {
	name = 'cleanTextLabApi';
	displayName = 'CleanTextLab API';
	documentationUrl = 'https://cleantextlab.com/docs/n8n';
	
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'The API key from your CleanTextLab Settings (requires Pro plan)',
		},
	];

	authenticate = {
		type: 'generic' as const,
		properties: {
			headers: {
				'x-api-key': '={{$credentials.apiKey}}',
			},
		},
	};

	test = {
		request: {
			baseURL: 'https://cleantextlab.com/api/v1',
			url: '/run',
			method: 'POST' as const,
			body: {
				input: 'test',
				steps: ['trim-lines']
			}
		},
	};
}