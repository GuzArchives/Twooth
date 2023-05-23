<script lang="ts">
  import {
    createNewUser,
    currentUserId,
    usersMap,
    currentUser,
  } from '$lib/state/users';
  import User from './User.svelte';
</script>

<fieldset un-relative un-p="0" un-border="none 0" un-w="full">
  <legend un-text="sm gray5" un-justify="end">
    Profiles
  </legend>
  <ul
    un-flex un-flex-col un-gap="2" un-w="full"
    un-left="0" un-p="0">
    {#key $currentUserId}
      <User user={$currentUser} />
    {/key}
    {#each Array.from($usersMap) as [userId, user]}
      {#if userId !== $currentUserId}
        {#key userId}
          <User {user} />
        {/key}
      {/if}
    {/each}
    {#if Array.from($usersMap).length < 4}
      <!-- content here -->
      <li
        un-block
        un-bg="transparent"
        un-border="2 dashed gray3"
        un-p="2"
        un-rounded="xl"
      >
        <label
          for="add-account"
          empty
          un-flex
          un-items-center
          un-cursor="pointer"
        >
          <button
            id="add-account"
            name="add-account"
            un-hidden
            on:click={() => createNewUser()}
          />
          <div
            un-block
            un-rounded="full"
            un-w="9"
            un-h="9"
            un-flex
            un-justify-center
            un-items-center
            un-bg="gray3"
          >
            <span un-text="xl" class="i-solar:user-plus-rounded-line-duotone" />
          </div>
          <div>
            <p un-m="0 l-3" un-truncate un-w="40">Add profile</p>
          </div>
        </label>
      </li>
    {/if}
  </ul>
</fieldset>
