import qFetch from '$lib/qFetch';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PUBLIC_TWITTER_OAUTH2_API_ID } from '$env/static/public';
import { TWITTER_REDIRECT } from '$lib/env/globals';

export const GET = (async ({ url }): Promise<Response> => {

	const code = url.searchParams.get('code');
	if (!code) throw error(400);

	const token = await qFetch<{
		token_type: 'bearer'
		expires_in: number
		access_token: string
		scope: string
	}>(
		'https://api.twitter.com/2/oauth2/token',
		{
			query: {
				code: code,
				grant_type: 'authorization_code',
				client_id: PUBLIC_TWITTER_OAUTH2_API_ID,
				redirect_uri: TWITTER_REDIRECT,
				code_verifier: 'challenge',
				challenge_method: 'plain',
			},
			options: { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, method: 'POST' },
		},
	);

	return new Response(token.access_token, { status: 200, headers: { 'Content-Type': 'text/plain' } });

}) satisfies RequestHandler;
