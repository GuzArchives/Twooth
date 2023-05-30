import { get } from 'svelte/store';
import { persistent } from './store';
import { PUBLIC_DEPLOYED_VERSION } from '$env/static/public';

export interface Config {
	customClient?: {
		twitter?: {
			id: string
			secret: string
		}
	}
}

export const config = persistent<Config>('twooth.config', {});

export const version = persistent<string>('twooth.version', '1.0.0');

export function updateAppState(): void {
	if (get(version) !== PUBLIC_DEPLOYED_VERSION) {
		console.log('Updated!');
		version.set(PUBLIC_DEPLOYED_VERSION);
	}
	return;
}
