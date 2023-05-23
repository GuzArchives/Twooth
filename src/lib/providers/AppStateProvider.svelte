<script lang="ts">
  import { derived, type Writable } from 'svelte/store';
  import { currentUser, type UserProfile } from '$lib/state/users';
  import { updateAppState, version } from '$lib/state/config';
  import { persistent } from '$lib/state/store';

  const config = derived<Writable<UserProfile>, UserProfile['config']>(
    currentUser,
    (user) => user.config,
  );

  updateAppState();

</script>

<svelte:body twooth-version={$version} class={`hue-${$config.color} ${$config.darkMode ? 'dark-theme' : 'light-theme'} bg-gray1 `} />

<style>
  :global(*) {
    @apply transition-all duration-50;
  }
</style>
