<script lang="ts">
  import { quintOut } from 'svelte/easing';
  import { crossfade } from 'svelte/transition';
  import {
    type UserProfile,
    currentUser,
    currentUserId,
  } from '$lib/state/users';
  import { derived } from 'svelte/store';
  import UserDelete from './UserDelete.svelte';

  export let user: UserProfile;

  const selected = derived(
    currentUser,
    ($currentUser) => $currentUser.id === user.id,
  );

  // https://svelte.dev/tutorial/animate
  const [send, receive] = crossfade({
    duration: (d) => Math.sqrt(d * 200),

    fallback(node, _params) {
      const style = getComputedStyle(node);
      const transform = style.transform === 'none' ? '' : style.transform;

      return {
        duration: 600,
        easing: quintOut,
        css: (t) => `
        transform: translate(0px, ${t - 1}rem);
        opacity: ${t};
      `,
      };
    },
  });
</script>

<li
  class={`hue-${user.config.color} ${
    $selected
      ? 'bg-hue3 outline-hue9 outline-2 outline-solid'
      : 'bg-gray2 hover:(outline-hue9 outline-2 outline-solid)'
  }`}
  un-flex
  un-p="2"
  un-rounded="xl"
  un-items-center
  un-justify-between
  un-relative
  in:receive={{ key: user.id }}
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <label
    for="account"
    empty
    un-flex
    un-items-center
    un-cursor="pointer"
    on:click|once={() => {
      currentUserId.set(user.id);
      console.log(user.id);
    }}
  >
    <button type="radio" id="account" name="account" un-hidden />
    <div un-block un-rounded="full">
      {#if user.twitter.profilePicture}
        <img
          src={`${user.twitter.profilePicture}`}
          un-block
          un-rounded="full"
          un-w="9"
          un-h="9"
          alt="Mastodon profile"
          id="profile-picture"
        />
      {:else if user.mastodon.profilePicture}
        <img
          src={`${user.mastodon.profilePicture}`}
          un-block
          un-rounded="full"
          un-w="9"
          un-h="9"
          alt="Mastodon profile"
          id="profile-picture"
        />
      {:else}
        <picture
          un-block
          un-rounded="full"
          un-w="9"
          un-h="9"
          empty
          id="profile-picture"
        />
      {/if}
    </div>
    <div un-text="sm" un-m="l-1">
      {#if user.mastodon.token || user.twitter.token}
        {@const single = !(user.mastodon.token && user.twitter.token)}
        {#if user.twitter.token}
          <p
            un-m="0"
            un-truncate
            un-w={$selected ? 40 : 30}
            un-text={`gray11 ${single ? 'base' : ''}`}
            un-flex
            un-items-center
          >
            <span class="i-custom:twitter" un-p="r-2" un-inline-block />
            @{ user.twitter.username }
            <a
              href={`https://twitter.com/${user.twitter.username}`}
              target="_blank"
            >
              <span
                class="i-solar:square-top-down-broken"
                un-p="r-2"
                un-text="gray11"
                un-inline-block
              />
            </a>
          </p>
        {/if}
        {#if user.mastodon.token}
          <p
            un-m="0"
            un-truncate
            un-w={$selected ? 40 : 30}
            un-text={`gray11 ${single ? 'base' : ''}`}
            un-flex
            un-items-center
          >
            <span class="i-custom:mastodon" un-p="r-2" un-inline-block />
            @{ user.mastodon.username }
            <a
              href={`https://${user.mastodon.instance?.domain}/@${user.mastodon.username}`}
              target="_blank"
            >
              <span
                class="i-solar:square-top-down-broken"
                un-p="r-2"
                un-text="gray11"
                un-inline-block
              />
            </a>
          </p>
        {/if}
      {:else}
        <p
          un-m="0"
          un-truncate
          un-w={$selected ? 40 : 30}
          un-text="gray11 base"
          un-flex
          un-items-center
        >
          <span
            class="i-solar:users-group-rounded-bold-duotone"
            un-p="r-2"
            un-text="xl"
            un-inline-block
          />@{ user.config.color }
        </p>
      {/if}
    </div>
  </label>
  {#if !$selected}
    <UserDelete {user} />
  {/if}
</li>

<style>
  #profile-picture[empty] {
    background-image: linear-gradient(
      to bottom right,
      var(--un-preset-radix-hue5),
      var(--un-preset-radix-hue9)
    );
  }
</style>
