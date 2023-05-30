import qFetch from '$lib/qFetch';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, url }): Promise<Response> => {

	const token = request.headers.get('Authorization');
	const statuses: { text: string }[] = JSON.parse(url.searchParams.get('statuses') ?? 'undefined');

	if (!token || !statuses) throw error(400);

	const postReq = await postStatus(statuses[0].text, token);

	if (statuses.length > 1) {
		let pastStatusId: number = postReq.data.id;
		for (const status of statuses) {
			if (
				statuses.indexOf(status) === 0 ||
				status.text === ''
			) continue;

			const replyReq = await replyStatus(status.text, pastStatusId, token);
			if (!replyReq) new Response('', { status: 500 });

			pastStatusId = replyReq.data.id;
		}
	}

	if (postReq) return new Response(
		JSON.stringify({ id: postReq.data.id }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		},
	);
	else return new Response('', { status: 500 });

}) satisfies RequestHandler;

async function postStatus(status: string, token: string): Promise<{ data: { id: number } }> {
	return await qFetch<{ data: { id: number } }>(
		'https://api.twitter.com/2/tweets',
		{
			options: {
				headers: { Authorization: token },
				method: 'POST',
				body: { text: status },
			},
		},
	);
}

async function replyStatus(reply: string, replyToId: number, token: string): Promise<{ data: { id: number } }> {
	return await qFetch<{ data: { id: number } }>(
		'https://api.twitter.com/2/tweets',
		{
			options: {
				headers: { Authorization: token },
				method: 'POST',
				body: { text: reply, reply: { in_reply_to_tweet_id: replyToId } },
			},
		},
	);
}
