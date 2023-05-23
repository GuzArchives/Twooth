import type { Handle } from '@sveltejs/kit';
/// @ts-expect-error
import { handle as documentHandler } from '@sveltekit-addons/document/hooks';
import { dev } from '$app/environment';
import { sequence } from '@sveltejs/kit/hooks';

const handle: Handle = async ({ event, resolve }) => {
	if (event.url.origin !== 'https://twooth.vercel.app' && !dev) {
		return new Response(JSON.stringify({
			status: 200,
			message: 'Access Denied',
		}), {
			status: 200,
			statusText: 'Access Denied',
			headers: { 'Content-Type': 'application/json' },

		});
	}
	return await resolve(event);
};

export default sequence(handle, documentHandler);
