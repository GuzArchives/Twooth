import { ofetch, type FetchOptions } from 'ofetch';
import { withQuery, type QueryObject, normalizeURL } from 'ufo';

export default async function qFetch<T>(
	request: string,
	info?: {
		query?: QueryObject
		options?: FetchOptions<'json'>
	},
): Promise<T> {
	return ofetch<T>(withQuery(
		normalizeURL(request), { ...info?.query },
	), info?.options);
}
