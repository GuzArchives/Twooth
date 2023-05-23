import {
	derived, get,
	writable,
	type Subscriber,
	type Unsubscriber,
	type Writable,
} from 'svelte/store';
import { v4 as uuid } from 'uuid';

import type { Instance } from '$lib/types/mastodon';
import { persistent } from '$lib/state/store';
import { type Color, getRandomColor } from '$lib/env/colors';

export interface UserProfile {
	id: string
	mastodon: {
		profilePicture?: string
		username?: string
		instance?: {
			domain: Instance['domain']
			url: string
			info: Instance['info']
		}
		token?: string
		client?: {
			id: string
			secret: string
		}
		enabled: boolean
	}
	twitter: {
		profilePicture?: string
		username?: string
		token?: string
		enabled: boolean
	}
	config: {
		color: Color
		darkMode: boolean
	}
	state: {
		text: string
	}
}

export type UserMap = Map<string, UserProfile>;

export const currentUserId = persistent<UserProfile['id']>('twooth.logged-user', uuid());

export const usersMap = persistent<UserMap>(

	'twooth.users',
	(new Map<string, UserProfile>()).set(get(currentUserId), {
		id: get(currentUserId),
		twitter: { enabled: true },
		mastodon: { enabled: true },
		config: { color: getRandomColor(), darkMode: true },
		state: { text: '' },
	}),

	(map) => JSON.stringify(
		Object.fromEntries(map),
	),
	(string) => new Map<string, UserProfile>(
		Object.entries(JSON.parse(string)),
	),

);

export const currentUser = ((): {
	subscribe(this: void, run: Subscriber<UserProfile>, invalidate?: any): Unsubscriber
	set(value: UserProfile): void
	update(callback: (storedProfile: UserProfile) => UserProfile): void
} => {

	const { subscribe } = derived<Writable<UserProfile['id']>, UserProfile>(
		currentUserId, $id => get(usersMap).get($id)!,
	);

	return {
		subscribe,
		set(value: UserProfile): void {
			usersMap.update(storedMap => {
				storedMap.set(get(currentUserId), value);
				return storedMap;
			});
		},
		update(callback: (storedProfile: UserProfile) => UserProfile): void {
			this.set(
				callback(
					get(usersMap).get(get(currentUserId))!,
				),
			);
		},
	};
})();

export function createNewUser(): UserProfile {

	const newUUID = uuid();

	function getUniqueColor(): Color {
		let color = getRandomColor();
		get(usersMap).forEach(user => {
			if (user.config.color === color) color = getUniqueColor();
		});
		return color;
	}

	usersMap.update(map => {
		map.set(newUUID, {
			id: newUUID,
			twitter: { enabled: true },
			mastodon: { enabled: true },
			config: { color: getUniqueColor(), darkMode: true },
			state: { text: '' },
		});
		return map;
	});

	return get(usersMap).get(newUUID)!;
}

export function switchUser(id: UserProfile['id']): void {
	currentUserId.set(id);
}

export function deleteUser(id: UserProfile['id']): void {
	usersMap.update($userMap => {
		$userMap.delete(id);
		return $userMap;
	});
}

export const lastMastodonPost = writable<number | undefined>();
export const lastTwitterPost = writable<number | undefined>();


