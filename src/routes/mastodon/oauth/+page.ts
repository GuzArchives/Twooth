import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (({ url }): { code: string } => {
	const code = url.searchParams.get('code');

	if (!code) throw error(400);

	return { code };
}) satisfies PageLoad;
