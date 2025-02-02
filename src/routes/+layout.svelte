<script lang="ts">
	import '../app.css';
  import Header from "$lib/components/Header.svelte";

	let { children } = $props();
</script>

<div class="flex flex-col w-screen h-screen">
  <Header />
  <div class="grow w-full overflow-y-scroll">
    {@render children()}
  </div>
</div>
