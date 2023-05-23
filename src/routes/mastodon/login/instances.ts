import { withHttps } from 'ufo';
import { PRIVATE_INSTANCES_API_TOKEN } from '$env/static/private';
import type { Instance } from '$lib/types/mastodon';
import qFetch from '$lib/qFetch';

export const instanceList = await ((): Promise<Instance[]> => {
	try {
		return getDynamicList();
	} catch (err) {
		console.error(`ERROR:\n${err}\n(Getting static list instead)`);
		return getStaticList();
	}
})();

export async function getDynamicList(): Promise<Instance[]> {
	const { instances } = await qFetch<{
		instances: {
			name: string
			active_users: number
			version: string | undefined
			[other: string]: any
		}[]
	}>('https://instances.social/api/1.0/instances/list', {
		query: {
			sort_by: 'active_users',
			sort_order: 'desc',
			count: '100',
		},
		options: { headers: { Authorization: `Bearer ${PRIVATE_INSTANCES_API_TOKEN}` } },
	});

	const filteredInstances = instances.filter<{
		name: string
		active_users: number
		version: string
		[other: string]: any
	// @ts-expect-error
	}>(i => {
		return i.version?.startsWith('4');
	});

	return filteredInstances.map(i => {
		return {
			domain: i.name,
			active_users: i.active_users,
			version: i.version,
		};
	});
};

export async function getStaticList(): Promise<Instance[]> {
	/**
	 * Instances picked based on active and total user number;
	 * name similar to mastodon (for easier searching);
	 * ~~and randomly.~~
	 */
	const instanceDomains = [
		'mastodon.social',
		'mstdn.jp',
		'mastodon.cloud',
		'mastodon.online',
		'counter.social',
		'mstdn.social',
		'mastodon.world',
		'home.social',
		'fosstodon.org',
		'social.vivaldi.net',
		'mastodon.art',
		'techhub.social',
		'mastodon.lol',
		'toot.community',
		'mastodon.scot',
		'mastodon.xyz',
		'mastodon.au',
		'mastodon.gamedev.place',
		'mastodon.ie',
		'masto.nu',
		'awscommunity.social',
		'mstdn.plus',
	];

	const instancesList: Instance[] = [];

	for (const instanceDomain of instanceDomains) {
		const instanceInfo = await getInstanceInfo(withHttps(instanceDomain));

		if (!instanceInfo) continue;
		if (!instanceInfo.version.startsWith('4')) continue;

		instancesList.push(instanceInfo);
	}

	return instancesList;
}

export async function getInstanceInfo(instanceUrl: string): Promise<Instance | undefined> {

	const query = await qFetch<{
		domain: string
		description: string
		usage: { users: { active_month: number } }
		[other: string]: any
	}>(`${instanceUrl}/api/v2/instance`).catch(() => undefined);

	console.log('QUERY ' + query);

	if (!query) return undefined;

	return {
		domain: query.domain,
		active_users: query.usage.users.active_month,
		version: query.version,
		info: {
			max_characters: query.configuration.statuses.max_characters,
			max_attached_files: query.configuration.statuses.max_media_attachments,
			supported_files: query.configuration.media_attachments.supported_mime_types,
			image_size_limit: query.configuration.media_attachments.image_size_limit,
			video_size_limit: query.configuration.media_attachments.video_size_limit,
			polls: {
				max_options: query.configuration.polls.max_options,
				max_character_per_option: query.configuration.polls.max_character_per_option,
				min_expiration: query.configuration.polls.min_expiration,
				max_expiration: query.configuration.polls.max_expiration,
			},
			version: query.version,
		},
	};
}
