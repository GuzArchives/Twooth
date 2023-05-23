<script lang="ts">
  export let value = 0;
  export let max = 100;
  export let label: string | undefined = undefined;

  export let width = 'w-10';
  export let height = 'h-10';
  export let color = 'text-hue10';

  let className = '';
  export { className as class };
</script>

<span class={`${className} ${color}`}>
  <div class={`${height} flex gap-2 items-center justify-center`}>
    {#if label}
      <p>{ label }</p>
    {/if}
    <span class={`${width} ${height} block bg-hue2 rounded-[50%]`}>
      <span
        id="progress"
        class="block h-full w-full"
        style={`--deg: ${(value / max) * 360}deg;`}
      />
    </span>
  </div>
</span>

<style scoped>
  span#progress {
    background: conic-gradient(currentColor, transparent var(--deg));
    border-radius: 50%;
  }
</style>
