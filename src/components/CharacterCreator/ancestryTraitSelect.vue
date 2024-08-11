<script setup lang="ts">
import type iEvent from '@/interfaces/iEvent';
import type { iTrait } from '@/interfaces/iItem';

const props = defineProps<{
  traits: iTrait[];
  preselect: string;
}>();

const emit = defineEmits<{
  (e: 'setTrait', newAncestryTraitName: string): string;
}>();

let options = props.traits.map((trt) => trt.name);

function onChange(event: iEvent) {
  let input = event.target.value;
  emit('setTrait', input);
}
</script>

<template>
  <select :onchange="onChange">
    <option selected disabled>Select Ancestry Trait</option>
    <option v-for="opt in options" :selected="props.preselect === opt" :value="opt" :key="opt">
      {{ opt }}
    </option>
  </select>
</template>
