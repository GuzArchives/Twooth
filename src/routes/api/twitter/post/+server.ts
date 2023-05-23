import qFetch from '$lib/qFetch';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, url }): Promise<Response> => {

	const token = request.headers.get('Authorization');
	const status = url.searchParams.get('status');

	if (!token || !status) throw error(400);

	const postReq = await qFetch<{ data: { id: number } }>(
		'https://api.twitter.com/2/tweets',
		{
			options: {
				headers: { Authorization: token },
				method: 'POST',
				body: { text: status },
			},
		},
	);

	if (postReq) return new Response(
		JSON.stringify({ id: postReq.data.id }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		},
	);
	else return new Response('', { status: 500 });

}) satisfies RequestHandler;

