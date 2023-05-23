import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import type { AccountCredentials } from '$lib/types/mastodon';
import qFetch from '$lib/qFetch';

export const GET = (async ({ request, url }): Promise<Response> => {

	const token = request.headers.get('Authorization');
	const instanceUrl = url.searchParams.get('instance');

	if (!token || !instanceUrl) throw error(400);

	const credentials = await qFetch<AccountCredentials>(
		`${instanceUrl}/api/v1/accounts/verify_credentials`,
		{ options: { headers: { Authorization: token } } },
	);

	return new Response(
		JSON.stringify(credentials),
		{ status: 200, headers: { 'Content-Type': 'application/json' } },
	);

}) satisfies RequestHandler;
