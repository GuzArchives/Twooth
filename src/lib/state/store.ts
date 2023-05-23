import { derived, get, writable, type Readable, type Writable, type Unsubscriber } from 'svelte/store';
import { browser } from '$app/environment';

export function persistent<T>(
	key: string,
	startValue?: T,
	encode: (v: T) => string = JSON.stringify,
	decode: (v: string) => T = JSON.parse,
): Writable<T> {

	const store = writable<T>(startValue);
	if (!browser) return store;

	const value = localStorage.getItem(key);
	if (value) {
		store.set(decode(value));
	}

	store.subscribe(storeValue => {
		if (startValue) {
			localStorage.setItem(key, encode(storeValue));
		} else {
			localStorage.removeItem(key);
		}
	});

	window.addEventListener('storage', () => {
		const localValue = localStorage.getItem(key);

		if (!localValue) return;

		if (decode(localValue) !== get(store)) store.set(decode(localValue));
	});

	return store;
}


