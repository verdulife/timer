<script lang="ts">
	export let isDark: boolean;

	const date = new Date();
	const today = new Intl.DateTimeFormat('es-ES', {
		weekday: 'long',
		month: 'long',
		day: 'numeric'
	}).format(date);

	function changeMode() {
		isDark = !isDark;
	}
</script>

<div class="wrapper row jbetween xfill">
	<h1>{today}</h1>
	<img src={isDark ? '/icons/sun.svg' : '/icons/moon.svg'} alt="Mode" on:click={changeMode} />
</div>

<style lang="scss">
	.wrapper {
		position: relative;
		margin-bottom: 20px;

		@media (max-width: $mobile) {
			margin-bottom: 10px;
		}
	}

	h1 {
		font-size: 26px;
		padding: 0 10px;

		&:first-letter {
			text-transform: uppercase;
		}
	}

	img {
		cursor: pointer;
		width: 40px;
		transform: rotate(-30deg);
		padding: 12px;
	}
</style>
