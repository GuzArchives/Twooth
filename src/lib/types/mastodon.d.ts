
export interface Instance {
	domain: string
	active_users: number
	version: string
	info?: {
		max_characters: number
		max_attached_files: number
		supported_files: string[]
		image_size_limit: number
		video_size_limit: number
		polls: {
			max_options: number
			max_character_per_option: number
			min_expiration: number
			max_expiration: number
		}
		version: string
	}
}

export interface Client {
	id: number
	name: string
	website: string | null
	redirect_uri: string
	client_id: string
	client_secret: string
	vapid_key: string
}

export interface AccountCredentials {
	id: number
	username: string
	acct: string
	display_name: string
	locked: boolean
	bot: boolean
	discoverable: boolean
	group: boolean
	created_at: string
	note: string
	url: string
	avatar: string
	avatar_static: string
	header: string
	header_static: string
	followers_count: number
	following_count: number
	statuses_count: number
	last_status_at: string
	noindex: boolean
	source: {
		privacy: string
		sensitive: boolean
		language: string | null
		note: string
		fields: {
			name: string
			value: string
			verified_at: string
		}[]
		follow_request_count: number
	}
	emojis: {
		shortcode: string
		url: string
		static_url: string
		visible_in_picker: boolean
	}[]
	roles: any[]
	fields: {
		name: string
		value: string
		verified_at: string
	}[]
}
