<template>
	<div class="page container">
		<fret-board />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FretBoard } from './modules/fret-board/main';
export default defineComponent({
	components: { FretBoard },
});
</script>

