import qFetch from '$lib/qFetch';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, url }): Promise<Response> => {

	const token = request.headers.get('Authorization');
	const instanceUrl = url.searchParams.get('instance');
	const statuses: { text: string }[] = JSON.parse(url.searchParams.get('statuses') ?? 'undefined');

	if (!token || !instanceUrl || !statuses) throw error(400);

	console.log(statuses);

	const postReq = await postStatus(statuses[0].text, instanceUrl, token);

	if (statuses.length > 1) {
		let pastStatusId: number = postReq.id;
		for (const status of statuses) {
			if (
				statuses.indexOf(status) === 0 ||
				status.text === ''
			) continue;

			const replyReq = await replyStatus(status.text, pastStatusId, instanceUrl, token);
			if (!replyReq) new Response('', { status: 500 });

			pastStatusId = replyReq.id;
		}
	}

	if (postReq) return new Response(
		JSON.stringify({ id: postReq.id }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		},
	);
	else return new Response('', { status: 500 });

}) satisfies RequestHandler;

async function postStatus(status: string, instanceUrl: string, token: string): Promise<{ id: number }> {
	return await qFetch<{ id: number }>(
		`${instanceUrl}/api/v1/statuses`,
		{
			query: { status },
			options: {
				headers: { Authorization: token },
				method: 'POST',
			},
		},
	);
}

async function replyStatus(reply: string, replyToId: number, instanceUrl: string, token: string): Promise<{ id: number }> {
	return await qFetch<{ id: number }>(
		`${instanceUrl}/api/v1/statuses`,
		{
			query: { status: reply, in_reply_to_id: replyToId },
			options: {
				headers: { Authorization: token },
				method: 'POST',
			},
		},
	);
}
