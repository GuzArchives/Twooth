<script lang="ts">
  export let id: string;
  export let value = false;
  export let disabled = false;
  export let required = false;

  let className = '';
  export { className as class };

  if (disabled) value = false;

</script>

<span
  class={`inline-flex items-center gap-1 transition-colors cursor-pointer ${className} ${
    !disabled
      ? value
        ? 'text-hue9 focus-within:(text-hue10) hover:(text-hue10)'
        : 'text-hue7 focus-within:(text-hue8) hover:(text-hue8)'
      : 'text-gray6 line-through'
  }`}
>
  <input
    class={`accent-hue11 w-5 h-5 appearance-none text-xl cursor-pointer ${
      value
        ? [
          "i-solar:check-square-bold-duotone",
          "focus:(i-solar:check-square-bold) hover:(i-solar:check-square-bold)",
        ].join(' ')
        : [
          "i-solar:close-square-line-duotone",
          "focus:(i-solar:close-square-bold-duotone) hover:(i-solar:close-square-bold-duotone)",
        ].join(' ')
    }`}
    bind:value
    type="checkbox"
    name={id}
    id={`${id}-check`}
    on:click|preventDefault={() => (value = !value)}
    {disabled}
    {required}
  />
  <label
    for={`${id}-check`}
    class="inline-flex cursor-pointer items-center gap-1"
  >
    <slot />
  </label>
</span>
