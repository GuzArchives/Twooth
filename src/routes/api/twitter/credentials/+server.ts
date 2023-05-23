import type { AccountCredentials } from '$lib/types/twitter';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import qFetch from '$lib/qFetch';

export const GET = (async ({ request }): Promise<Response> => {

	const token = request.headers.get('Authorization');

	if (!token) throw error(400);

	const credentials = await qFetch<{ data: AccountCredentials }>(
		'https://api.twitter.com/2/users/me?user.fields=profile_image_url,username',
		{ options: { headers: { Authorization: token } } },
	);

	console.log(credentials);

	return new Response(
		JSON.stringify(credentials.data),
		{ status: 200, headers: { 'Content-Type': 'application/json' } },
	);

}) satisfies RequestHandler;
