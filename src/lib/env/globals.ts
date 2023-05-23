export const BASE_URL = import.meta.env.DEV ? 'http://localhost:3000' : 'https://twooth.vercel.app';
export const TWITTER_REDIRECT = `${BASE_URL}/twitter/oauth`;
export const MASTODON_REDIRECT = `${BASE_URL}/mastodon/oauth`;
export const MASTODON_SCOPES = 'read:accounts read:statuses write:media write:statuses';
