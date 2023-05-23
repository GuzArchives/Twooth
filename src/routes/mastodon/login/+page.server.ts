import { fail, redirect, type ActionFailure, type Redirect } from '@sveltejs/kit';
import { withHttps, withQuery } from 'ufo';
import type { Actions, PageServerLoad } from './$types';
import type { Client, Instance } from '$lib/types/mastodon';
import { BASE_URL, MASTODON_REDIRECT, MASTODON_SCOPES } from '$lib/env/globals';
import { instanceList, getInstanceInfo } from './instances';
import qFetch from '$lib/qFetch';

export const load = ((): { instances: Instance[] } => {
	return { instances: instanceList };
}) satisfies PageServerLoad;


export const actions = {
	default: async ({ request, url }): Promise<ActionFailure<any> | Redirect> => {
		const data = await request.formData();

		const instanceInput = data.get('Instance Search');
		if (!instanceInput) return fail(400, { instanceInput, missing: true });

		const instanceUrl = withHttps(instanceInput.toString());
		const instance = await getInstance(instanceUrl);

		if (!instance) return fail(400, { instanceInput, incorrect: true });

		const client = await getClient(instanceUrl);
		if (!client) return fail(400, { instanceInput, incorrect: true });

		throw redirect(304, withQuery(
			url.pathname, {
				client_id: client.client_id,
				client_secret: client.client_secret,
				client_instance: instance,
			},
		));

	},
} satisfies Actions;

async function getInstance(instanceUrl: string): Promise<Instance | undefined> {
	const fromList = instanceList.find(instance => instance.domain.toLowerCase() === instanceUrl);

	if (fromList?.info) {
		return fromList;
	}

	const instance = await getInstanceInfo(instanceUrl);
	return instance;
}

async function getClient(instanceUrl: string): Promise<Client | undefined> {
	return qFetch<Client>(`${instanceUrl}/api/v1/apps`, {
		query: {
			client_name: 'Twooth',
			redirect_uris: MASTODON_REDIRECT,
			scopes: MASTODON_SCOPES,
			website: BASE_URL,
		},
		options: { method: 'POST' },
	}).catch(() => undefined);
}
