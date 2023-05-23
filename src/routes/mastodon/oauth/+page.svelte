<script lang="ts">
  import { goto } from '$app/navigation';
  import qFetch from '$lib/qFetch';
  import { currentUser, type UserProfile } from '$lib/state/users';
  import type { AccountCredentials as MastodonAccountCredentials } from '$lib/types/mastodon';
  import type { PageData } from './$types';

  export let data: PageData;

  async function getToken(): Promise<string> {
    const token: UserProfile['mastodon']['token'] = await qFetch(
      "/mastodon/oauth/token",
      {
        query: {
          client_id: $currentUser.mastodon.client?.id,
          client_secret: $currentUser.mastodon.client?.secret,
          instance: $currentUser.mastodon.instance?.url,
          code: data.code,
        },
        options: { method: 'GET' },
      }
    );

    return token ?? '';
  }

  async function getUserInfo(): Promise<void> {
    const token = await getToken();

    const credentials = await qFetch<MastodonAccountCredentials>(
      "/api/mastodon/credentials",
      {
        query: { instance: $currentUser.mastodon.instance?.url },
        options: { headers: { Authorization: `Bearer ${token}` } },
      }
    );

    currentUser.update((user) => {
      user.mastodon.username = credentials.username;
      user.mastodon.profilePicture = credentials.avatar;
      user.mastodon.token = token;
      return user;
    });

    goto('/', { invalidateAll: true, replaceState: true });
  }
</script>

<section
  un-flex
  un-justify-center
  un-items-center
  un-left="0"
  un-top="0"
  un-w="full"
  un-h="full"
  un-z="1"
>
  <div un-text="center" un-p="10">
    {#await getUserInfo()}
      <span
        un-block
        un-m="x-auto"
        un-text="7xl hue8"
        class="i-solar:lock-password-unlocked-line-duotone"
      />
      <h1>Getting authorization token...</h1>
      <p un-text="sm gray8" />
    {:then _}
      <span
        un-block
        un-m="x-auto"
        un-text="7xl hue8"
        class="i-solar:lock-password-line-duotone"
      />
      <h1>Token returned</h1>
      <p un-text="sm gray8">Redirecting...</p>
    {/await}
  </div>
</section>
