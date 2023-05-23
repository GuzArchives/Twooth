<script lang="ts">
  import { derived } from 'svelte/store';
  import { submitTwooth } from './SubmitButton';
  import { currentUser } from '$lib/state/users';

  export let disabled = false;

  const canPost = derived(currentUser, (user) => {
    if (user.mastodon.token || user.twitter.token) return true;
    else return false;
  });

  let isDisabled = disabled || !$canPost;
  $: isDisabled = disabled || !$canPost;
</script>

<button
  type="submit"
  class:cursor-pointer={!isDisabled}
  un-h="10"
  un-gap="2"
  un-font="bold"
  un-inline-flex
  un-justify="between"
  un-items="center"
  un-duration="200"
  un-rounded="full"
  un-outline="none"
  un-border="none"
  un-text={`hue9 ${isDisabled ? '' : 'focus:(hue12) hover:(hue12)'}`}
  un-bg={`hue2 ${isDisabled ? '' : 'focus:(hue8) hover:(hue8)'}`}
  on:click={() => (isDisabled ? null : submitTwooth())}
  disabled={isDisabled}
>
  <span id="label">Twooth!</span>
  <span class="i-solar:plain-bold-duotone inline-block text-xl" />
</button>

<style scoped>
  button {
    padding: 0 0.7rem;
  }

  button span#label {
    display: none;
    padding: 0;
    margin: 0;
  }

  button:hover:not([disabled]),
  button:focus:not([disabled]) {
    padding: 0 1.25rem;
  }

  button:hover:not([disabled]) span#label,
  button:focus:not([disabled]) span#label {
    display: initial;
    padding: 0;
    margin: 0;
  }
</style>
