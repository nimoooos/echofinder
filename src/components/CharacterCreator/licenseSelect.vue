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

function removeLicense(licenseName: string) {
  //get rid of the chosen license
}
</script>

<template>
  <div>
    <table>
      <tr v-for="lcsRow in props.currentLicenses" :key="lcsRow.license.name">
        <th>{{ lcsRow.license.name }}</th>
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
        <td><button>X</button></td>
      </tr>
      <tr>
        <th>
          <select :onchange="addNewLicense">
            <option disabled selected>new class</option>
            <option v-for="lcs in licensesData" :key="lcs.name" :value="lcs.name">
              {{ lcs.name }}
            </option>
          </select>
        </th>
        <td></td>
      </tr>
    </table>
  </div>
</template>
