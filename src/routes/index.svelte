<script lang="ts">
	import Timer from '$lib/components/Timer.svelte';
	import Add from '$lib/components/Add.svelte';
	import { timerStore } from '$lib/stores';
</script>

<svelte:head>
	<title>Timer ⌛</title>
</svelte:head>

<div class="scroll">
	<div class="wrapper col xfill">
		{#each $timerStore as state, index}
			<Timer {state} {index} />
		{/each}

		<div class="add-wrapper row jcenter xfill">
			<Add />
		</div>
	</div>
</div>

<style lang="scss">
	.scroll {
		background: $border;
		padding: 60px;

		@media (max-width: $mobile) {
			padding: 20px;
		}
	}

	.wrapper {
		max-width: 900px;
		margin: 0 auto;
	}

	.add-wrapper {
		padding: 60px;

		@media (max-width: $mobile) {
			padding: 20px;
		}
	}
</style>
