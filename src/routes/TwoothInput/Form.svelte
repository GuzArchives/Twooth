<script lang="ts">
	import PostArea from "./PostArea.svelte";
	import { posts, currentPostId } from "./data";
	import { currentUser } from "$lib/state/users";
	import { writable } from "svelte/store";
	import ButtonIcon from "$lib/components/ButtonIcon.svelte";
	import Thread from "./Thread.svelte";

	posts.subscribe((posts) => {
		currentUser.update((user) => {
			user.state.posts = posts;
			return user;
		});
	});

	function addThread() {
		posts.update(($posts) => {
			$posts.push({ text: "" });
			return $posts;
		});
	}
</script>

<span un-gap="1" un-flex="~ col">
	{#each $posts as post, id}
		{#if id < $currentPostId}
			<Thread {id} {post} />
		{:else if id === $currentPostId}
			<PostArea postId={$currentPostId} />
		{:else if id > $currentPostId}
			<Thread {id} {post} />
		{/if}
	{/each}

	<button
		class="h-10 w-full cursor-pointer appearance-none gap-2 b-0 rounded-xl font-bold"
		un-outline="hover:(hue8 2 solid)"
		un-p="x-3 y-2 hover:(x-3 y-2)"
		un-text="gray12 hover:(gray12)"
		un-flex="~ items-center"
		un-bg="gray2 hover:hue8"
		un-m="t-2"
		on:click={() => addThread()}
	>
		<span
			class={`my-auto text-xl inline-block i-solar:add-circle-line-duotone`}
		/>
		<span class="my-auto">Add thread</span>
	</button>
</span>
