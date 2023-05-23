<script lang="ts">
  /**
   * TODO: Add support for keyboard navigation
   */

  import { page } from '$app/stores';
  import { derived, writable } from 'svelte/store';
  import type { ActionData, PageData } from './$types';
  import { enhance } from '$app/forms';
  import ButtonIcon from '$lib/components/ButtonIcon.svelte';
  import { currentUser } from '$lib/state/users';
  import type { Instance } from '$lib/types/mastodon';
  import { withHttps, withQuery } from 'ufo';
  import { goto } from '$app/navigation';
  import { MASTODON_REDIRECT, MASTODON_SCOPES } from '$lib/env/globals';

  export let data: PageData;
  export let form: ActionData;

  const searchTerm = writable('');

  const filteredInstances = derived(searchTerm, ($searchTerm) => {
    if (!data.instances) return [];
    if ($searchTerm === '') return data.instances;

    return data.instances.filter((instance) => instance.domain.toLowerCase().includes($searchTerm.toLowerCase()));
  });

  const client = derived(page, ({ url }) => {
    const id = url.searchParams.get('client_id');
    const secret = url.searchParams.get('client_secret');
    const instance = url.searchParams.get('client_instance');

    if (!id || !secret || !instance) return undefined;

    return {
      id: id,
      secret: secret,
      instance: JSON.parse(instance) as Instance,
    };
  });

  $: if ($client) {
    currentUser.update((user) => {
      user.mastodon['client'] = {
        id: $client?.id!,
        secret: $client?.secret!,
      };
      user.mastodon['instance'] = {
        info: $client?.instance.info,
        url: withHttps($client?.instance!.domain!),
        domain: $client?.instance!.domain!,
      };
      return user;
    });
    authorize(
      $currentUser.mastodon.instance?.url!,
      $currentUser.mastodon.client?.id!,
  	);
  }

  async function authorize(instanceUrl: string, clientId: string) {
    goto(
      withQuery(`${instanceUrl}/oauth/authorize`, {
        response_type: 'code',
        client_id: clientId,
        redirect_uri: MASTODON_REDIRECT,
        scope: MASTODON_SCOPES,
      }),
  	);
  }
</script>

<form method="post" un-relative use:enhance>
  {#if $client}
    <section
      un-flex
      un-justify-center
      un-items-center
      un-left="0"
      un-top="0"
      un-z="1"
    >
      <div un-bg="gray2" un-text="center" un-p="10" un-rounded="xl">
        <span
          un-block
          un-m="x-auto"
          un-text="7xl hue8"
          class="i-solar:check-circle-line-duotone"
        />
        <h1>Client created!</h1>
        <p un-text="sm gray8">Redirecting...</p>
      </div>
    </section>
  {:else}
    <label un-block un-m="b-2" for="instance-search">Instance domain:</label>
    <div un-flex un-items-center un-gap-3>
      <div un-w="full">
        <input
          un-w="full"
          un-p="3 l-3"
          un-block
          un-rounded="xl"
          un-outline="0"
          un-border="0"
          un-text="hue11 xl"
          un-bg="gray3"
          un-placeholder="gray6"
          type="search"
          autocomplete="off"
          name="Instance Search"
          id="instance-search"
          placeholder="mastodon.social"
          required="true"
          bind:value={$searchTerm}
        />
      </div>
      <div>
        <ButtonIcon icon="i-solar:square-top-down-bold-duotone" type="submit">
          Login
        </ButtonIcon>
      </div>
    </div>
    {#if form?.incorrect}
      <div
        un-bg="tomato1"
        un-p="2"
        un-rounded="xl"
        un-outline="tomato9 2 solid"
      >
        <p class="m-0 text-tomato9">Please enter a valid instance domain</p>
      </div>
    {/if}
    <select
      un-block
      un-w="full"
      un-p="2 b-0"
      un-b="0"
      un-appearance="none"
      un-outline="none"
      un-overflow="hidden"
      un-bg="transparent"
      un-text="xl gray9"
      size="7"
      name="Instance Selection"
      id="instance-selection"
    >
      {#if $filteredInstances.length > 0}
        {#each $filteredInstances as instance}
          <option
            un-p="y-1"
            un-bg="transparent"
            un-appearance="none"
            un-text="gray7 focus:(hue10) hover:(hue10)"
            value={instance}
            selected={$filteredInstances.indexOf(instance) === 0}
            on:click={() => ($searchTerm = instance.domain)}
          >
            { instance.domain }
          </option>
        {/each}
      {:else}
        <option
          un-p="y-1"
          un-appearance="none"
          un-bg="transparent"
          un-text="gray7 focus:(hue10) hover:(hue10)"
          selected="0"
          value={$searchTerm}
          on:click={() => ($searchTerm = $searchTerm)}
        >
          { $searchTerm }
        </option>
      {/if}
    </select>
  {/if}
</form>
