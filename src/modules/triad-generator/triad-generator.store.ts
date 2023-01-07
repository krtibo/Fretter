import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTriadGeneratorStore = defineStore('triadGenerator', () => {
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

    return { degreeCheckbox, generateTriad, inversionCheckbox, generatedValues, scales, degrees, inversions }
})