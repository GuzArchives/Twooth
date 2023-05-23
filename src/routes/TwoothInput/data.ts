import { get, writable } from 'svelte/store';
import { currentUser } from '$lib/state/users';

export const text = writable<string>(get(currentUser).state.text);
export const posted = writable<boolean>(false);
