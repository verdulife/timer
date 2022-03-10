<script lang="ts">
	import { timerStore } from '$lib/stores';

	let defaultState = {
		timer: 0,
		title: `Timer ${$timerStore.length + 1}`
	};

	function addTimer() {
		const title = prompt('Enter a title for the timer');

		if (title) {
			defaultState.title = title;
			$timerStore = [...$timerStore, defaultState];
		}
	}
</script>

<button class="pri semi" on:click={addTimer}>ADD TIMER</button>

<style lang="scss">
	button {
		min-width: 250px;
		font-size: 16px;
		color: #fff;
		border-radius: 8px;
	}
</style>
