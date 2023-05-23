<script lang="ts">
  import Checkbox from '$lib/components/Checkbox.svelte';
  import { currentUser } from '$lib/state/users';

  let twitterCheck = $currentUser.twitter.enabled ?? true;
  let mastodonCheck = $currentUser.mastodon.enabled ?? true;

  $: togglePlatform(twitterCheck, 'twitter');
  $: togglePlatform(mastodonCheck, 'mastodon');

  function togglePlatform(value: boolean, platform: 'twitter' | 'mastodon') {
    currentUser.update((user) => {
      user[platform] = { ...user[platform], enabled: value };
      return user;
    });
  }
</script>

<div class="inline-flex items-center">
  <Checkbox
    bind:value={twitterCheck}
    class="mr-5"
    id="twitter"
    disabled={$currentUser.twitter.token ? false : true}
  >
    <span class="i-custom:twitter inline-block text-xl" /> Twitter
  </Checkbox>
  <Checkbox
    bind:value={mastodonCheck}
    id="mastodon"
    disabled={$currentUser.mastodon.token ? false : true}
  >
    <span class="i-custom:mastodon inline-block text-xl" /> Mastodon
  </Checkbox>
</div>
