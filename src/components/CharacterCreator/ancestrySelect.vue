<script setup lang="ts">
import { ancestriesData } from '@/data/ancestriesData';

const emit = defineEmits<{
  (e: 'setAncestry', newAncestryName: string): string;
}>();

const options = ancestriesData.map((anc) => anc.name);

function onChange(event: any) {
  let input = event.target.value;
  emit('setAncestry', input);
}
</script>

<template>
  <select :onchange="onChange">
    <option selected disabled>Select Ancestry</option>
    <option v-for="opt in options" :value="opt" :key="opt">
      {{ opt }}
    </option>
  </select>
</template>
