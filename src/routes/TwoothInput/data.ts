import { get, writable } from 'svelte/store';
import { currentUser } from '$lib/state/users';

export const posts = writable<{ text: string }[]>(get(currentUser).state.posts);
export const posted = writable<boolean>(false);
export const currentPostId = writable(0);
