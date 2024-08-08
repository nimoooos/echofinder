<script setup lang="ts">
import type iTrait from '@/interfaces/iTraits';

const props = defineProps<{
  traits: iTrait[];
}>();

const emit = defineEmits<{
  (e: 'setAncestryTrait', newAncestryTraitName: string): string;
}>();

let options = props.traits.map((trt) => trt.name);

function onChange(event: any) {
  let input = event.target.value;
  console.log(props.traits);
  emit('setAncestryTrait', input);
}
</script>

<template>
  <select :onchange="onChange">
    <option selected disabled>Select Ancestry Trait</option>
    <option v-for="opt in options" :value="opt" :key="opt">
      {{ opt }}
    </option>
  </select>
</template>
