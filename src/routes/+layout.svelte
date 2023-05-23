<script lang="ts">
  import Menu from "$lib/components/Menu/Menu.svelte";
  import StateProvider from "$lib/providers/AppStateProvider.svelte";
  import "virtual:uno.css";
</script>

<div
  class="fixed block h-screen w-screen flex items-center justify-center overflow-hidden"
>
  <StateProvider />
  <section
    class="min-h-30% w-full gap-x-5"
    un-grid="~ cols-3 rows-1"
    un-text="gray10"
    un-font="bold inter"
    un-absolute
  >
    <main class="order-2 h-full w-full justify-self-start">
      <slot />
    </main>
    <aside class="order-1 justify-self-end">
      <Menu />
    </aside>
  </section>
</div>

<style uno:preflights uno:safelist global></style>
