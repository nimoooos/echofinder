<script setup lang="ts">
import { jobsData } from '@/data/jobsData';
import type iEvent from '@/interfaces/iEvent';

const emit = defineEmits<{
  (e: 'setJob', newJobName: string): string;
}>();

const options = jobsData.map((anc) => anc.name);

function onChange(event: iEvent) {
  let input = event.target.value;
  emit('setJob', input);
}
</script>

<template>
  <select :onchange="onChange">
    <option selected disabled>Select Job</option>
    <option v-for="opt in options" :value="opt" :key="opt">
      {{ opt }}
    </option>
  </select>
</template>
