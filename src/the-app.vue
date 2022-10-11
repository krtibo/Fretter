<template>
	<div class="page container">
		<fretboard />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Fretboard } from './modules/fretboard/main';
export default defineComponent({
	components: { Fretboard },
});
</script>

