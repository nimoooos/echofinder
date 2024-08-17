<script setup lang="ts">
import type iEvent from '@/interfaces/iEvent';
import type iJob from '@/interfaces/iJobs';

const props = defineProps<{
  preselect: string;
  jobOptions: iJob[];
}>();

const emit = defineEmits<{
  (e: 'setJob', newJobName: string): string;
}>();

function onChange(event: iEvent) {
  let input = event.target.value;
  emit('setJob', input);
}
</script>

<template>
  <select :onchange="onChange">
    <option selected disabled>Select Job</option>
    <option v-for="opt in jobOptions" :selected="props.preselect === opt.name" :value="opt.name" :key="opt.name">
      {{ opt.name }}
    </option>
  </select>
</template>
