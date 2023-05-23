import { MASTODON_REDIRECT } from '$lib/env/globals';
import qFetch from '$lib/qFetch';
import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';

export const GET = (async ({ url }): Promise<Response> => {
	const clientId = url.searchParams.get('client_id');
	const clientSecret = url.searchParams.get('client_secret');
	const instanceUrl = url.searchParams.get('instance');
	const code = url.searchParams.get('code');

	if (!clientId || !clientSecret || !instanceUrl || !code) throw error(400);

	const token = await qFetch<{
		access_token: string
		token_type: 'Bearer'
		scope: string
		created_at: number
	}>(`${instanceUrl}/oauth/token`, {
		query: {
			grant_type: 'authorization_code',
			code: code,
			client_id: clientId,
			client_secret: clientSecret,
			redirect_uri: MASTODON_REDIRECT,
		},
		options: { method: 'POST' },
	});

	if (!token) throw error(500);

	return new Response(token.access_token, { status: 200, headers: { 'Content-Type': 'text/plain' } });

}) satisfies RequestHandler;

