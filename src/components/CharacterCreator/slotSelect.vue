/** * Use this for weapon and support item slot select */
<script setup lang="ts">
import type { iSlot, iSupport, iWeapon } from '@/interfaces/iItem';
import FeatureCard from '@/views/featureCard.vue';
import { feature } from '@/data/licenseData';
import { ref } from 'vue';

const props = defineProps<{
  selectorType: 'Weapon' | 'Support Item';
  slotData: iSlot;
  unlocks: iWeapon[] | iSupport[];
}>();
const convertedSlotSize: string = { 2: 'Light', 3: 'Main', 4: 'Light/Light', 5: 'Heavy', 6: 'Main/Light' }[props.slotData.slotSize];

const slot1Type: string = convertedSlotSize.split('/')[0];
const slot2Type: string = convertedSlotSize.split('/')[1];

const componentTitle = `${convertedSlotSize} ${props.selectorType}`;

const slot1Feature = ref<string>(slot1Type);
const slot2Feature = ref<string>(slot2Type);
</script>

<template>
  <div class="SlotSelectWrapper">
    <p>{{ componentTitle }}</p>
    <table id="slot-holder">
      <tr>
        <td>
          <select id="slot1" v-model="slot1Feature">
            <option disabled selected value="">{{ slot1Type }} {{ props.selectorType }}</option>
            <option v-for="unlock in props.unlocks" v-bind:key="unlock.name" :value="unlock.name">
              {{ unlock.name }}
            </option>
          </select>
          <FeatureCard v-if="slot1Feature" :feature="feature(slot1Feature)" />
        </td>
        <td>
          <select id="slot2" v-if="slot2Type != undefined">
            <option disabled selected value="">{{ slot2Type }} {{ props.selectorType }}</option>
            <option v-for="unlock in props.unlocks" v-bind:key="unlock.name" :value="unlock.name">
              {{ unlock.name }}
            </option>
          </select>
          <FeatureCard v-if="slot2Feature" :feature="feature(slot2Feature)" />
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.SlotSelectWrapper {
  border: 3px dotted var(--color-border);
  width: 380px;
  display: inline-block;
}

table#slot-holder {
  width: 100%;
}

select {
  width: 80%;
}
</style>
