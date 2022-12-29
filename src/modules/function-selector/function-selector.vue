<template>
    <div class="buttons has-addons">
        <button 
        class="button"
        :class="{ 'is-selected is-info': !isGameMode }"
        @click="toggleLearnMode"
        v-shortkey="['l']" @shortkey="toggleLearnMode">
            🧠 Learn
        </button>

        <button 
        class="button"
        :class="{ 'is-selected is-info': isGameMode }"
        @click="toggleGameMode"
        v-shortkey="['p']" @shortkey="toggleGameMode">
            🕹️ Practice
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
	emits: ['selected'],
	setup(_, { emit }) {
        const isGameMode = ref(false);
        const toggleGameMode = () => {
            isGameMode.value = true;
            emit('selected', isGameMode.value);
        };
        const toggleLearnMode = () => {
            isGameMode.value = false;
            emit('selected', isGameMode.value);
        };
        return {
            isGameMode,
            toggleGameMode,
            toggleLearnMode,
        }
	},
});
</script>
<style>

</style>