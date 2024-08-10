<script setup lang="ts">
import { ancestriesData } from '@/data/ancestriesData';
import type iEvent from '@/interfaces/iEvent';

const emit = defineEmits<{
  (e: 'setAncestry', newAncestryName: string): string;
}>();

const options = ancestriesData.map((anc) => anc.name);

function onChange(event: iEvent) {
  console.log(event);
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
