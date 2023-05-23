<script lang="ts">
  import { type UserProfile, deleteUser } from '$lib/state/users';

  export let user: UserProfile;

  let isConfirming = false;
</script>

{#if !isConfirming}
  <div>
    <button
      un-text="gray7 hover:(tomato9) 2xl"
      un-cursor="pointer"
      un-w="10"
      un-h="10"
      un-flex
      un-items-center
      un-bg="transparent"
      un-border="0"
      on:click={() => (isConfirming = true)}
    >
      <span
        class="i-solar:trash-bin-minimalistic-bold-duotone"
        un-inline-block
      />
    </button>
  </div>
{:else}
  <div
    un-bg="[#00000080]"
    un-outline="3 gray5 solid"
    un-absolute
    un-w="full"
    un-h="full"
    un-z="10"
    un-flex
    un-rounded="xl"
    un-items-center
    un-top="0"
    un-left="0"
    un-justify-between
    class="backdrop-blur-sm"
  >
    <p un-m="0 l-3">Delete profile?</p>
    <div un-flex un-items-center un-gap="1" un-m="r-3">
      <button
        un-text="gray9 hover:(tomato11) 2xl"
        un-cursor="pointer"
        un-p="0"
        un-flex
        un-bg="transparent"
        un-border="0"
        un-inline-block
        on:click={() => deleteUser(user.id)}
      >
        <span class="i-solar:check-circle-line-duotone" un-inline-block />
      </button>
      <button
        un-text="gray9 hover:(gray12) 2xl"
        un-cursor="pointer"
        un-p="0"
        un-flex
        un-bg="transparent"
        un-border="0"
        un-inline-block
        on:click={() => (isConfirming = false)}
      >
        <span class="i-solar:close-circle-line-duotone" un-inline-block />
      </button>
    </div>
  </div>
  <span un-w="10" un-h="10" />
{/if}
