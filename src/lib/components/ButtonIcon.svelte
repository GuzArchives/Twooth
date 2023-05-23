<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let icon: string;
  export let type: string | undefined = undefined;

  const dispatch = createEventDispatcher();
</script>

<button
  class="h-10 w-full cursor-pointer appearance-none gap-2 b-0 rounded-xl font-bold"
  un-outline="hover:(hue8 2 solid)"
  un-p="x-3 y-2 hover:(x-3 y-2)"
  un-text="hue12 hover:(gray12)"
  un-flex="~ items-center"
  un-bg="hue8 hover:gray2"
  on:click={() => dispatch('click')}
  {type}
>
  <span class={`my-auto text-xl inline-block ${icon}`} />
  <span class="my-auto"><slot /></span>
</button>
