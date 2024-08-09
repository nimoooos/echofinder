<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { ref, watch } from 'vue';

import { type iCharacterData, blankCharData, defaultCharData } from './interfaces/iCharacterData';
import { ancestry, ancestryTrait } from './data/ancestriesData';
import { job } from './data/jobsData';
import AncestrySelect from './components/CharacterCreator/ancestrySelect.vue';
import AncestryTraitSelect from './components/CharacterCreator/ancestryTraitSelect.vue';
import JobSelect from './components/CharacterCreator/jobSelect.vue';

const chosenCharData = ref<iCharacterData>(defaultCharData);

const toggleEdit = ref({
  moniker: false,
  basicinfo: false,
});

function recalculateStats() {
  console.log('calculating...');
  //initialize derived stats
  chosenCharData.value.derivedStats = blankCharData.derivedStats;

  //get size from ancestry
  chosenCharData.value.derivedStats.size = chosenCharData.value.basicInfo.ancestry.size;

  //get baseline from jobs

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
}

function setAncestryTrait(newAncestryTraitName: string) {
  chosenCharData.value.chosenStats.ancestryTrait = ancestryTrait(chosenCharData.value.basicInfo.ancestry, newAncestryTraitName);
}

//recalculate stats whenever data changes
watch([chosenCharData.value], (newData, oldData) => {
  recalculateStats();
});
</script>

<template>
  <header>
    <div id="navbar">
      <h1 id="title">EchoFinder</h1>
      <ul>
        <li>About EchoFinder</li>
        <li>Beacon RPG</li>
        <li>@nimoooos</li>
      </ul>
    </div>
    <div class="wrapper">
      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->
    </div>
  </header>
  <div id="charsheet">
    <div id="charsheet-moniker">
      <h1 id="moniker-summary">
        {{ chosenCharData.moniker.name }}, {{ chosenCharData.moniker.title }} ({{ chosenCharData.moniker.pronouns }})
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
              <input v-model="chosenCharData.moniker.name" placeholder="name" />
            </td>
            <td>
              <input v-model="chosenCharData.moniker.title" placeholder="title" />
            </td>
            <td>
              <input v-model="chosenCharData.moniker.pronouns" placeholder="pronouns" />
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div id="charsheet-basicinfo">
      <h2 id="basicinfo-summary">
        Level {{ chosenCharData.basicInfo.level }} {{ chosenCharData.basicInfo.ancestry.name }} {{ chosenCharData.basicInfo.job.name }}
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
              <input id="level-input" type="number" min="1" max="12" v-model="chosenCharData.basicInfo.level" />
            </td>
            <td>
              <AncestrySelect
                @set-ancestry="
                  (anc) => {
                    chosenCharData.basicInfo.ancestry = ancestry(anc);
                  }
                "
              />
            </td>
            <td>
              <AncestryTraitSelect
                v-bind:traits="chosenCharData.basicInfo.ancestry.traits"
                :key="chosenCharData.basicInfo.ancestry.name"
                @set-trait="setAncestryTrait"
              />
            </td>
            <td>
              <!-- <input v-model="chosenCharData.basicInfo.job.name" /> -->
              <JobSelect
                @set-job="
                  (jobName) => {
                    chosenCharData.basicInfo.job = job(jobName);
                  }
                "
              />
              <!-- TODO: make a JobSelect -->
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
            <input id="input-bulk" type="number" min="0" max="6" v-model="chosenCharData.chosenStats.bulk" />
          </td>
          <td>
            <input id="input-agility" type="number" min="0" max="6" v-model="chosenCharData.chosenStats.agility" />
          </td>
          <td>
            <input id="input-mind" type="number" min="0" max="6" v-model="chosenCharData.chosenStats.mind" />
          </td>
          <td>
            <input id="input-magic" type="number" min="0" max="6" v-model="chosenCharData.chosenStats.magic" />
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

#navbar {
  width: 100%;
  background-color: var(--color-accent-bold);
  padding-left: 1rem;
  margin-bottom: 3em;
  border-bottom-right-radius: 3em;
  border: 9px double var(--color-background);
}

#navbar #title {
  color: var(--color-background-soft);
  font-weight: 600;
  display: inline-block;
}

#navbar ul {
  display: inline-block;
}

#navbar li {
  display: inline-block;
  padding: 1rem;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

button {
  border: transparent;
  background-color: transparent;
}
</style>
