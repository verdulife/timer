<script lang="ts">
	import { browser } from '$app/env';
	import { timerFormat } from '$lib/scripts/timer-format';
	import { timerStore } from '$lib/stores';

	export let state: { title: string; timer: number };
	export let index = 0;

	let { title, timer } = state;
	let isRunning: any;

	function updateStore() {
		$timerStore[index] = {
			title,
			timer
		};
	}

	function playPause() {
		if (isRunning) {
			clearInterval(isRunning);
			isRunning = false;
			updateStore();
		} else {
			isRunning = setInterval(() => {
				timer += 100;
			}, 100);
		}
	}

	function reset() {
		if (isRunning) {
			clearInterval(isRunning);
			isRunning = false;
		}

		timer = 0;
		updateStore();
	}

	function edit() {
		const newTitle = prompt('Enter new title', title);

		if (newTitle) {
			title = newTitle;
			updateStore();
		}
	}

	function remove() {
		const res = confirm('Are you sure you want to delete this timer?');

		if (res) {
			$timerStore.splice(index, 1);
			$timerStore = $timerStore;
		}
	}

	if (browser) {
		window.addEventListener('keydown', (e) => {
			if (e.altKey && e.key === (index + 1).toString()) {
				playPause();
			}

			if (e.ctrlKey && e.altKey && e.key === (index + 1).toString()) {
				reset();
			}
		});
	}
</script>

<section class="row acenter xfill">
	<div class="main col jcenter grow ">
		<h2 class="row acenter">
			<span class="row fcenter" on:click={edit}>EDIT</span>
			<span class="row fcenter" on:click={remove}>REMOVE</span>
			{title}
		</h2>

		<output class="row acenter fill" on:click={playPause}>
			{#each timerFormat(timer) as d}
				<span>{d}</span>
			{/each}
		</output>
	</div>

	<aside class="col">
		<button class="reset-btn" on:click={reset} title="CTRL + ALT + {index + 1}">
			<img src="/icons/reset.svg" alt="Reset" />
		</button>

		<button class="play-btn" on:click={playPause} title="ALT + {index + 1}">
			<img src={isRunning ? '/icons/pause.svg' : '/icons/play.svg'} alt="Play" />
		</button>
	</aside>
</section>

<style lang="scss">
	section {
		flex-wrap: nowrap;
		background: #fff;
		border: 1px solid $border;
		border-radius: 16px;
		overflow: hidden;
		margin-bottom: 10px;
	}

	.main {
		padding: 16px 24px;

		h2 {
			font-size: 16px;
			color: $grey;
			margin-bottom: 10px;

			@media (max-width: $mobile) {
				font-size: 12px;
			}

			span {
				cursor: pointer;
				height: 20px;
				background: $border;
				color: $grey;
				font-size: 12px;
				border-radius: 6px;
				padding: 0 6px;
				margin-right: 6px;

				@media (max-width: $mobile) {
					height: 18px;
					font-size: 10px;
					padding: 0 6px;
				}
			}
		}

		output {
			cursor: pointer;
			font-size: 80px;
			font-weight: bold;

			@media (max-width: $mobile) {
				text-align: center;
				font-size: 40px;
			}

			span {
				line-height: 1;
				width: 1ch;

				&:nth-last-of-type(-n + 6) {
					font-size: 40px;
					font-weight: normal;
					transform: translateY(-0.3ch);

					@media (max-width: $mobile) {
						font-size: 20px;
						transform: translateY(-0.5ch);
					}
				}

				&:nth-of-type(3n) {
					width: 0.6ch;
				}
			}
		}
	}

	aside {
		button {
			width: 100px;
			padding: 26px 16px;
			opacity: 0.7;

			@media (max-width: $mobile) {
				width: 60px;
				padding: 8px 4px;
			}

			img {
				height: 100%;
			}
		}

		.reset-btn {
			height: 80px;

			@media (max-width: $mobile) {
				height: 40px;
			}
		}

		.play-btn {
			height: 100px;

			@media (max-width: $mobile) {
				height: 40px;
			}
		}
	}
</style>
