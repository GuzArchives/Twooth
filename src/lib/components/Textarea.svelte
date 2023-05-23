<script lang="ts">
  import { writable } from 'svelte/store';
  import twitter from 'twitter-text';

  export let value = '';
  export let characters = 0;
  export let overLimit = false;
  export let characterLimit: number;
  export let required = false;

  export let cols = 50;
  export let rows = 10;
  export let name: string;
  export let placeholder: string;

  $: characters = twitter.parseTweet(value).weightedLength;
  $: overLimit = characters > characterLimit ? true : false;
</script>

<div class="rounded-xl bg-gray2 p-4 pr-5 focus-within:(outline-5 outline-hue9 outline-solid)"
>
  <textarea
    class={[
      "w-full m-0 block bg-transparent resize-none border-0 text-gray12 text-xl outline-none",
      "placeholder-text-2xl placeholder-gray5 placeholder-font-bold",
    ].join(' ')}
    id={`${name}-textarea`}
    maxlength={characterLimit + characterLimit / 2}
    {...{ placeholder, name, cols, rows }}
    bind:value
    {required}
  />
</div>
