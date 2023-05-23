<script lang="ts">
  import { goto } from '$app/navigation';
  import { withQuery } from 'ufo';
  import { onMount } from 'svelte';
  import { PUBLIC_TWITTER_OAUTH2_API_ID } from '$env/static/public';
  import { TWITTER_REDIRECT } from '$lib/env/globals';

  const url = withQuery('https://twitter.com/i/oauth2/authorize', {
    response_type: 'code',
    client_id: PUBLIC_TWITTER_OAUTH2_API_ID,
    redirect_uri: TWITTER_REDIRECT,
    scope: 'tweet.read tweet.write users.read',
    code_challenge: 'challenge',
    code_challenge_method: 'plain',
    state: 'state',
  });

  onMount(() => {
    goto(url);
  });
</script>

<section
  un-flex
  un-justify-center
  un-items-center
  un-w="full"
  un-h="full"
  un-bg="gray2"
  un-rounded="xl"
>
  <div un-text="center" un-p="10">
    <span
      un-block
      un-m="x-auto"
      un-text="7xl hue8"
      class="i-svg-spinners:180-ring-with-bg"
    />
    <h1>Logging into twitter</h1>
    <p un-text="sm gray8">Redirecting...</p>
  </div>
</section>
