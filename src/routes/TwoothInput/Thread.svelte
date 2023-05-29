<script lang="ts">
	import { posts, currentPostId } from "./data";

	export let id: number;
	export let post: { text: string; file?: string };

	function removeThread(id: number) {
		posts.update(($posts) => {
			$posts.splice(id, 1);
			return $posts;
		});
	}
</script>

<span un-flex un-justify="between">
	<button
		class="h-10 w-[90%] cursor-pointer appearance-none gap-2 b-0 rounded-xl font-bold"
		un-outline="hover:(hue8 2 solid)"
		un-p="x-3 y-2 hover:(x-3 y-2)"
		un-text="gray12 hover:(gray12)"
		un-flex="~ items-center"
		un-bg="gray2 hover:gray2"
		on:click={() => ($currentPostId = id)}
	>
		<span
			class={`my-auto text-xl inline-block i-solar:document-text-line-duotone`}
		/>
		<span class="my-auto text-truncate max-w-[80%]"
			>{post.text || "Thread"}</span
		>
	</button>
	<button
		class="h-10 cursor-pointer appearance-none gap-2 b-0 rounded-xl font-bold"
		un-outline="hover:(tomato8 2 solid)"
		un-p="x-3 y-2 hover:(x-3 y-2)"
		un-text="gray12 hover:(gray12)"
		un-flex="~ items-center"
		un-bg="gray2 hover:gray2"
		on:click={() => removeThread(id)}
	>
		<span
			class={`my-auto text-xl inline-block i-solar:trash-bin-trash-line-duotone`}
		/>
	</button>
</span>
