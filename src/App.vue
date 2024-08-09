<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { ref, watch } from 'vue';

import { type iCharacterData, blankCharData, defaultCharData } from './interfaces/iCharacterData';
import { ancestry, ancestryTrait } from './data/ancestriesData';
import { job } from './data/jobsData';
import AncestrySelect from './components/CharacterCreator/ancestrySelect.vue';
import AncestryTraitSelect from './components/CharacterCreator/ancestryTraitSelect.vue';
import JobSelect from './components/CharacterCreator/jobSelect.vue';
import NavBar from './components/NavBar/NavBar.vue';

const charData = ref<iCharacterData>(defaultCharData);

const toggleEdit = ref({
  moniker: false,
  basicinfo: false,
});

function recalculateStats() {
  console.log('calculating...');
  //initialize derived stats
  charData.value.derivedStats = blankCharData.derivedStats;

  //get size from ancestry
  charData.value.derivedStats.size = charData.value.basicInfo.ancestry.size;

  //get baseline from jobs
  charData.value.derivedStats.scope = charData.value.basicInfo.job.baseStats.scope;
  charData.value.derivedStats.saveTarget = charData.value.basicInfo.job.baseStats.saveTarget;
  charData.value.derivedStats.hp = charData.value.basicInfo.job.baseStats.hp;
  charData.value.derivedStats.recoveries = charData.value.basicInfo.job.baseStats.recoveries;
  charData.value.derivedStats.dodge = charData.value.basicInfo.job.baseStats.dodge;
  charData.value.derivedStats.speed = charData.value.basicInfo.job.baseStats.speed;
  charData.value.derivedStats.stress = charData.value.basicInfo.job.baseStats.stress;
  charData.value.derivedStats.memory = charData.value.basicInfo.job.baseStats.memory;
  charData.value.derivedStats.adef = charData.value.basicInfo.job.baseStats.adef;
  charData.value.derivedStats.mp = charData.value.basicInfo.job.baseStats.mp;

  //get extra stuff from jobs

  //get extra stuff from ancestry

  //calcaulate derived bamm (mostly reserves)
  //calculate bonuses from bamm

  //get stuff from weapons
  //get stuff from supports
  //get stuff from techniques
  //get stuff from talents

  //get traits
  //get weapons
  //get supports
  //get techniques

  //print new charData
  console.log(charData.value);
}

function setAncestryTrait(newAncestryTraitName: string) {
  charData.value.chosenStats.ancestryTrait = ancestryTrait(charData.value.basicInfo.ancestry, newAncestryTraitName);
}

//recalculate stats whenever data changes
watch([charData.value.basicInfo, charData.value.chosenStats], (newData, oldData) => {
  recalculateStats();
});
</script>

<template>
  <NavBar />
  <div id="charsheet">
    <div id="charsheet-moniker">
      <h1 id="moniker-summary">
        {{ charData.moniker.name }}, {{ charData.moniker.title }} ({{ charData.moniker.pronouns }})
        <button @click="toggleEdit.moniker = !toggleEdit.moniker">📝</button>
      </h1>
      <div id="charsheet-moniker-edit" v-if="toggleEdit.moniker">
        <table>
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Pronouns</th>
          </tr>
          <tr>
            <td>
              <input v-model="charData.moniker.name" placeholder="name" />
            </td>
            <td>
              <input v-model="charData.moniker.title" placeholder="title" />
            </td>
            <td>
              <input v-model="charData.moniker.pronouns" placeholder="pronouns" />
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div id="charsheet-basicinfo">
      <h2 id="basicinfo-summary">
        Level {{ charData.basicInfo.level }} {{ charData.basicInfo.ancestry.name }} {{ charData.basicInfo.job.name }}
        <button @click="toggleEdit.basicinfo = !toggleEdit.basicinfo">📝</button>
      </h2>
      <div id="charsheet-basicinfo-edit" v-if="toggleEdit.basicinfo">
        <table>
          <tr>
            <th>Level</th>
            <th>Ancestry</th>
            <th>Ancestry Trait</th>
            <th>Job</th>
          </tr>
          <tr>
            <td>
              <input id="level-input" type="number" min="1" max="12" v-model="charData.basicInfo.level" />
            </td>
            <td>
              <AncestrySelect
                @set-ancestry="
                  (anc) => {
                    charData.basicInfo.ancestry = ancestry(anc);
                  }
                "
              />
            </td>
            <td>
              <AncestryTraitSelect v-bind:traits="charData.basicInfo.ancestry.traits" :key="charData.basicInfo.ancestry.name" @set-trait="setAncestryTrait" />
            </td>
            <td>
              <JobSelect
                @set-job="
                  (jobName) => {
                    charData.basicInfo.job = job(jobName);
                  }
                "
              />
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div id="charsheet-bamm">
      <table>
        <tr>
          <th>Bulk</th>
          <th>Agility</th>
          <th>Mind</th>
          <th>Magic</th>
        </tr>
        <tr>
          <td>
            <input id="input-bulk" type="number" min="0" max="6" v-model="charData.chosenStats.bulk" />
          </td>
          <td>
            <input id="input-agility" type="number" min="0" max="6" v-model="charData.chosenStats.agility" />
          </td>
          <td>
            <input id="input-mind" type="number" min="0" max="6" v-model="charData.chosenStats.mind" />
          </td>
          <td>
            <input id="input-magic" type="number" min="0" max="6" v-model="charData.chosenStats.magic" />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped>
th {
  border: 1px solid var(--color-border);
  border-top-right-radius: 1rem;
  background-color: var(--color-accent);
  color: var(--color-text);
  width: 200px;
}
td {
  border: 1px solid var(--color-border);
  border-bottom-right-radius: 1rem;
  background-color: var(--color-background-soft);
  padding: 0 1rem;
}

input,
select {
  width: 100%;
  height: 100%;
  border: 0;
  background-color: var(--color-background-soft);
  color: var(--color-text);
}

button {
  border: transparent;
  background-color: transparent;
}
</style>
