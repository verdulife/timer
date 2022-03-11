<script lang="ts">
	import Topbar from '$lib/components/Topbar.svelte';
	import Timer from '$lib/components/Timer.svelte';
	import Add from '$lib/components/Add.svelte';
	import { timerStore } from '$lib/stores';

	let isDark: boolean;
</script>

<div class="scroll {isDark ? 'darkmode' : ''}">
	<div class="wrapper col xfill">
		<Topbar bind:isDark />

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
		transition: 500ms;

		@media (max-width: $mobile) {
			padding: 20px;
		}
	}

	.darkmode {
		filter: invert(1);
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
