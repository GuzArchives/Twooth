import qFetch from '$lib/qFetch';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, url }): Promise<Response> => {

	const token = request.headers.get('Authorization');
	const instanceUrl = url.searchParams.get('instance');
	const status = url.searchParams.get('status');

	if (!token || !instanceUrl || !status) throw error(400);

	const postReq = await qFetch<{ id: number }>(
		`${instanceUrl}/api/v1/statuses`,
		{
			query: { status },
			options: {
				headers: { Authorization: token },
				method: 'POST',
			},
		},
	);

	if (postReq) return new Response(
		JSON.stringify({ id: postReq.id }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		},
	);
	else return new Response('', { status: 500 });

}) satisfies RequestHandler;

