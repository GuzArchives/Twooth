<script lang="ts">
  import Users from './Users.svelte';
  import ButtonIcon from '$lib/components/ButtonIcon.svelte';
  import {
    lastMastodonPost,
    lastTwitterPost,
    currentUser,
  } from '$lib/state/users';
</script>

<menu class="m-0 h-full flex flex-col items-end justify-between">
  <Users />
  <section class="mb-6 w-full flex flex-col gap-2">
    {#if !$currentUser.twitter.token}
      <a
        href={`/twitter/login?noise=${Math.random()}`}
        un-w="full"
        un-decoration="none"
      >
        <ButtonIcon icon="i-custom:twitter">Login Twitter</ButtonIcon>
      </a>
    {:else if $lastTwitterPost}
      <a
        href={`https://twitter.com/${$currentUser.twitter.username}/status/${$lastTwitterPost}`}
        target="_blank"
        un-w="full"
        un-decoration="none"
      >
        <ButtonIcon icon="i-custom:twitter">
          <span un-inline-flex un-items="center" un-gap="1">
            Previous post
            <span
              class="i-solar:square-top-down-bold-duotone"
              un-p="r-2"
              un-inline-block
            />
          </span>
        </ButtonIcon>
      </a>
    {/if}
    {#if !$currentUser.mastodon.token}
      <a href="/mastodon/login" un-w="full" un-decoration="none">
        <ButtonIcon icon="i-custom:mastodon">Login Mastodon</ButtonIcon>
      </a>
    {:else if $lastMastodonPost}
      {#key $lastMastodonPost}
        <a
          href={`${$currentUser.mastodon.instance?.url}/@${$currentUser.mastodon.username}/${$lastMastodonPost}`}
          target="_blank"
          un-w="full"
          un-decoration="none"
        >
          <ButtonIcon icon="i-custom:mastodon">
            <span un-inline-flex un-items="center" un-gap="1">
              Previous post
              <span
                class="i-solar:square-top-down-bold-duotone"
                un-p="r-2"
                un-inline-block
              />
            </span>
          </ButtonIcon>
        </a>
      {/key}
    {/if}
  </section>
</menu>
