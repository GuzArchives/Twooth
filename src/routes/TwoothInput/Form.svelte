<script lang="ts">
  import { fade } from 'svelte/transition';
  import RadialProgress from '$lib/components/RadialProgress.svelte';
  import Textarea from '$lib/components/Textarea.svelte';
  import { currentUser } from '$lib/state/users';
  import PlatformSelection from './PlatformSelection.svelte';

  import SubmitButton from './SubmitButton.svelte';
  import { text } from './data';

  let overLimit = false;
  let characters = 0;
  let characterLimit = 240;

  text.subscribe((text) => {
    currentUser.update((user) => {
      user.state.text = text;
      return user;
    });
  });
</script>

<div class="w-full">
  <Textarea
    placeholder="Make a twooth!"
    name="twooth"
    {characterLimit}
    bind:value={$text}
    bind:overLimit
    bind:characters
    required
  />
  <menu class="h-10 flex items-center justify-between p-0 py-3">
    <section>
      <p class="m-0 mb-1 text-sm text-gray7">Post on:</p>
      <div>
        <PlatformSelection />
      </div>
    </section>
    <section class="inline-flex items-center justify-between gap-3">
      {#if characters > characterLimit / 3}
        <span transition:fade={{ delay: 100, duration: 200 }}>
          <RadialProgress
            width="w-8"
            height="h-8"
            color={overLimit ? 'hue-red text-hue10' : 'text-hue7'}
            class="inline-block"
            label={`${characters} / ${characterLimit}`}
            value={characters}
            max={characterLimit}
          />
        </span>
      {/if}
      {#if characters > 0}
        <span transition:fade={{ delay: 100, duration: 200 }}>
          <SubmitButton disabled={overLimit} />
        </span>
      {/if}
    </section>
  </menu>
</div>
