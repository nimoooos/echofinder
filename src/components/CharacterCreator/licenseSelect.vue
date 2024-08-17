<script setup lang="ts">
import { license, licensesData } from '@/data/licenseData';
import type iEvent from '@/interfaces/iEvent';
import type { iLicense } from '@/interfaces/iLicense';

const props = defineProps<{
  currentLicenses: { license: iLicense; rank: 1 | 2 | 3 }[];
}>();

const emit = defineEmits<{
  (e: 'setLicenses', newLicenses: { license: iLicense; rank: 1 | 2 | 3 }[]): { license: iLicense; rank: 1 | 2 | 3 }[];
}>();

function addNewLicense(event: any) {
  const newLicenseName = event.target.value;
  //   console.log('Adding new license:', newLicenseName);

  let newLicenses = props.currentLicenses;
  const simpleLicenseList = newLicenses.map((x) => x.license.name);

  if (simpleLicenseList.includes(newLicenseName)) {
    console.log(newLicenseName, 'is already in', simpleLicenseList);
  } else {
    newLicenses.push({ license: license(event.target.value), rank: 1 });
    emit('setLicenses', newLicenses);
  }
}

function licenseRowChangeHandler(event: iEvent, licenseName: string) {
  const newRank = Number(event.target.value);
  if (newRank === 0) {
    removeLicense(licenseName);
  } else if (newRank == 1 || newRank == 2 || newRank == 3) {
    let newLicenses = props.currentLicenses;
    newLicenses.forEach((lcsRow) => {
      if (lcsRow.license.name === licenseName) {
        lcsRow.rank = newRank;
      }
    });
    emit('setLicenses', newLicenses);
  }
}

/**
 * Removes selected license from license array
 * @param licenseName name of license to remove
 */
function removeLicense(licenseName: string) {
  console.log('Removing', licenseName);
  const newLicenses = props.currentLicenses.filter((lcsRow) => lcsRow.license.name != licenseName);
  emit('setLicenses', newLicenses);
}
</script>

<template>
  <div>
    <table>
      <tr v-for="lcsRow in props.currentLicenses" :key="lcsRow.license.name">
        <th class="LicenseName">{{ lcsRow.license.name }}</th>
        <td>
          <input
            :id="lcsRow.license.name + '-RankInput'"
            type="number"
            min="0"
            max="3"
            v-model="lcsRow.rank"
            @change="(event) => licenseRowChangeHandler(event as unknown as iEvent, lcsRow.license.name)"
          />
        </td>
        <td><button :id="lcsRow.license.name + '-RemoveButton'" @click="(event) => removeLicense(lcsRow.license.name)">❌</button></td>
      </tr>
      <tr>
        <th colspan="3" id="addNewRow">
          <select :onchange="addNewLicense" :key="props.currentLicenses.length">
            <option disabled selected>new class</option>
            <option v-for="lcs in licensesData" :key="lcs.name" :value="lcs.name">
              {{ lcs.name }}
            </option>
          </select>
        </th>
      </tr>
    </table>
  </div>
</template>

<style scoped>
input,
button {
  width: 100%;
  height: 100%;
  border: 0;
  background-color: var(--color-background-soft);
  color: var(--color-text);
  text-align: center;
}

select,
option {
  border: 0;
  background-color: transparent;
  color: var(--color-text);
  width: 100%;
  height: 100%;
}

table {
  border: 3px dotted var(--color-border);
  table-layout: fixed;
}

table th {
  border: 1px solid var(--color-border);
  background-color: var(--color-accent);
  color: var(--color-text);
}

table th.LicenseName {
  width: 100px;
}

table td {
  border: 1px solid var(--color-border);
  background-color: var(--color-background-soft);
  color: var(--color-text);
  width: 50px;
}

#addNewRow {
  border-bottom-right-radius: 1rem;
}
</style>
