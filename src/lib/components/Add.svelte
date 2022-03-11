<script lang="ts">
	import { timerStore } from '$lib/stores';

	function addTimer() {
		const title = prompt('Enter a title for the timer');

		if (title) {
			const defaultState = {
				started: new Date(),
				title,
				timer: 0
			};

			$timerStore = [...$timerStore, defaultState];
		}
	}
</script>

<button class="black semi" on:click={addTimer}>ADD TIMER</button>

<style lang="scss">
	button {
		min-width: 250px;
		font-size: 12px;
		font-weight: bold;
		border-radius: 16px;
		padding: 16px 32px;
	}
</style>
