<script lang="ts">
	import 'verdu/fonts/circular.css';
	import 'verdu/fonts/operator.css';
</script>

<svelte:head>
	<title>Counter Timer | Work chronometer</title>
</svelte:head>

<main>
	<slot />
</main>

<style lang="scss">
	:global {
		@import 'verdu/_reset.scss';
		@import 'verdu/verdu.scss';
	}
</style>
