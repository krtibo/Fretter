<template>
    <div class="random-triad-generator section">
        <div class="control">
            <button
                class="button is-active"
                @click="generateTriad">
                Generate random triad
            </button>
            <label class="ml-4 checkbox">
                <input type="checkbox" v-model="degreeCheckbox">
                Degree
            </label>
            <label class="ml-4 checkbox">
                <input type="checkbox" v-model="inversionCheckbox">
                Inversion
            </label>
        </div>
        <div class="generated mt-5" v-if="generatedValues[0] !== -1">
            <div class="scale">
                <div class="is-6">Scale</div> 
                <span class="title is-3"> {{ scales[generatedValues[0]] }} major</span>
            </div>
            <div class="degree" v-if="degreeCheckbox">
                <div class="is-6">Degree</div> 
                <span class="title is-3">{{ degrees[generatedValues[1]] }}</span>
            </div>
            <div class="inversion" v-if="inversionCheckbox">
                <div class="is-6">Inversion</div> 
                <span class="title is-3">{{ inversions[generatedValues[2]] }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {
        const scales = ref(['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F']);
        const degrees = ref(['I.', 'II.', 'III.', 'IV.', 'V.', 'VI.', 'VII.']);
        const inversions = ref(['Root position', '1st inversion', '2nd inversion']);
        const degreeCheckbox = ref(true);
        const inversionCheckbox = ref(true);
        const generatedValues = ref([-1, -1, -1]);
        
        const generateTriad = () => {
            generatedValues.value[0] = Math.floor(Math.random() * scales.value.length);
            generatedValues.value[1] = Math.floor(Math.random() * degrees.value.length);
            generatedValues.value[2] = Math.floor(Math.random() * inversions.value.length);
        };
        
        //generateTriad();
        return { degreeCheckbox, generateTriad, inversionCheckbox, generatedValues, scales, degrees, inversions }
	},
});
</script>
<style>
    .generated {
        display: flex;
        gap: 64px;
    };
    .control {
        align-items: center;
    }
</style>