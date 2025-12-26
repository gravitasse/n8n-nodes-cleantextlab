import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class CleanTextLabApi implements ICredentialType {
	name = 'cleanTextLabApi';
	displayName = 'CleanTextLab API';
	documentationUrl = 'https://cleantextlab.com/docs/api';
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
			description: 'Your CleanTextLab Pro API key (get it from Settings → API Keys)',
			placeholder: 'ctl_live_...',
		},
		{
			displayName: 'API URL',
			name: 'apiUrl',
			type: 'string',
			default: 'https://cleantextlab.com/api/v1',
			description: 'CleanTextLab API base URL (change only for testing)',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.apiUrl}}',
			url: '/run',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: {
				input: 'test',
				steps: ['trim-lines'],
			},
		},
	};
}
