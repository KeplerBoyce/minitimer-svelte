<script lang="ts">
	import '../app.css';
  import Header from "$lib/components/Header.svelte";

	let { children } = $props();
</script>

<div class="flex flex-col w-screen h-screen">
  <Header />
  <div class="grow w-full overflow-y-scroll p-4">
    {@render children()}
  </div>
</div>
