import { get } from 'svelte/store';
import { posts } from './data';
import { currentUser, lastMastodonPost, lastTwitterPost } from '$lib/state/users';
import qFetch from '$lib/qFetch';

export async function submitTwooth(): Promise<void> {

	const user = get(currentUser);
	const success = [false, false];

	if (user.mastodon.enabled) {
		const { id } = await qFetch<{ id: number }>(
			'/api/mastodon/post',
			{
				query: { instance: user.mastodon.instance?.url, status: get(text) },
				options: {
					headers: { Authorization: `Bearer ${user.mastodon.token}` },
					method: 'POST',
				},
			},
		);
		lastMastodonPost.set(id);
		success[0] = true;
	} else {
		lastMastodonPost.set(undefined);
	}
	if (user.twitter.enabled) {
		const { id } = await qFetch<{ id: number }>(
			'/api/twitter/post',
			{
				query: { status: get(text) },
				options: {
					headers: { Authorization: `Bearer ${user.twitter.token}` },
					method: 'POST',
				},
			},
		);
		lastTwitterPost.set(id);
		success[1] = true;
	} else {
		lastTwitterPost.set(undefined);
	}

	if (success[0] || success[1]) text.set('');

}
