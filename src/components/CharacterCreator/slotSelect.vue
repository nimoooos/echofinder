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

let slot1Unlocks = ref<iWeapon[] | iSupport[]>(props.unlocks);
let slot2Unlocks = ref<iWeapon[] | iSupport[]>(props.unlocks);
if (props.selectorType === 'Weapon') {
  slot1Unlocks = ref<iWeapon[]>((props.unlocks as iWeapon[]).filter((unlk) => unlk.weaponData.weaponSize == slot1Type));
  slot2Unlocks = ref<iWeapon[]>((props.unlocks as iWeapon[]).filter((unlk) => unlk.weaponData.weaponSize == slot2Type));
} else if (props.selectorType === 'Support Item') {
  slot1Unlocks = ref<iSupport[]>((props.unlocks as iSupport[]).filter((unlk) => unlk.supportData.supportSize == slot1Type));
  slot2Unlocks = ref<iSupport[]>((props.unlocks as iSupport[]).filter((unlk) => unlk.supportData.supportSize == slot2Type));
} else {
  slot1Unlocks = ref<iWeapon[] | iSupport[]>(props.unlocks);
  slot2Unlocks = ref<iWeapon[] | iSupport[]>(props.unlocks);
}

const slot1Feature = ref<string>();
const slot2Feature = ref<string>();
</script>

<template>
  <div :class="{ SlotSelectWrapper: true, WideWrapper: slot2Type != undefined }">
    <p>{{ componentTitle }}</p>
    <table id="slot-holder" :key="props.unlocks.length + props.slotData.slotSize">
      <tr>
        <td>
          <select id="slot1" v-model="slot1Feature">
            <option disabled selected value="">{{ slot1Type }} {{ props.selectorType }}</option>
            <option v-for="unlock in slot1Unlocks" v-bind:key="unlock.name" :value="unlock.name">
              {{ unlock.name }}
            </option>
          </select>
        </td>
        <td v-if="slot2Type != undefined">
          <select id="slot2" v-model="slot2Feature">
            <option disabled selected value="">{{ slot2Type }} {{ props.selectorType }}</option>
            <option v-for="unlock in slot2Unlocks" v-bind:key="unlock.name" :value="unlock.name">
              {{ unlock.name }}
            </option>
          </select>
        </td>
      </tr>
      <tr>
        <td>
          <FeatureCard v-if="slot1Feature" :feature="feature(slot1Feature)" />
        </td>
        <td v-if="slot2Type != undefined">
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
  margin: 5px;
}

.SlotSelectWrapper.WideWrapper {
  width: 765px;
}

table#slot-holder {
  width: 100%;
  table-layout: fixed;
}

select {
  width: 80%;
}
</style>
