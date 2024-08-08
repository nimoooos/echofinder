<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { ref, watch } from 'vue';

import type iCharacterData from './interfaces/iCharacterData';
import { ancestry, ancestryTrait } from './data/ancestriesData';

const blankCharacterData: iCharacterData = {
  moniker: { name: '', title: '', pronouns: '' },
  basicInfo: { level: 1, ancestry: ancestry(''), job: null },
  chosenStats: { bulk: 0, agility: 0, mind: 0, magic: 0, ancestryTrait: { name: '', text: '' } },
  derivedStats: {
    bulk: 0,
    agility: 0,
    mind: 0,
    magic: 0,
    size: 0,
    grit: 0,
    scope: 0,
    memory: 0,
    saveTarget: 0,
    hp: 0,
    stress: 0,
    mp: 0,
    recoveries: 0,
    speed: 0,
    dodge: 0,
    adef: 0,
  },
  loadout: null,
};

const selectedCharacterData = ref<iCharacterData>({
  moniker: {
    name: 'Dhalia',
    title: 'the All-Knowing',
    pronouns: 'she/her',
  },
  basicInfo: {
    level: 1,
    ancestry: ancestry('Elf'),
    job: 'Equinox',
  },
  chosenStats: {
    bulk: 0,
    agility: 0,
    mind: 0,
    magic: 0,
    ancestryTrait: ancestryTrait(ancestry('Elf'), 'Elven Accuracy'),
  },
  derivedStats: {
    bulk: 0,
    agility: 0,
    mind: 0,
    magic: 0,
    size: 1,
    grit: 1,
    scope: 12,
    memory: 8,
    saveTarget: 12,
    hp: 7,
    stress: 6,
    mp: 5,
    recoveries: 3,
    speed: 4,
    dodge: 6,
    adef: 11,
  },
  loadout: {
    traits: [],
    weaponSlots: [],
    supportSlots: [],
    techniques: [],
    talents: [],
    actions: [],
  },
});

const toggleEdit = ref({
  moniker: false,
  basicinfo: false,
});

function recalculateStats() {
  console.log('calculating...');
  //initialize derived stats
  selectedCharacterData.value.derivedStats = blankCharacterData.derivedStats;

  //get size from ancestry

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

watch([selectedCharacterData.value], (newData, oldData) => {
  recalculateStats();
});
</script>

<template>
  <header>
    <div id="navbar">
      <h1>EchoFinder</h1>
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
      <h1>
        {{ selectedCharacterData.moniker.name }}, {{ selectedCharacterData.moniker.title }} ({{
          selectedCharacterData.moniker.pronouns
        }}) <button @click="toggleEdit.moniker = !toggleEdit.moniker">📝</button>
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
              <input v-model="selectedCharacterData.moniker.name" placeholder="name" />
            </td>
            <td>
              <input v-model="selectedCharacterData.moniker.title" placeholder="title" />
            </td>
            <td>
              <input v-model="selectedCharacterData.moniker.pronouns" placeholder="pronouns" />
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div id="charsheet-basicinfo">
      <h2>
        Level {{ selectedCharacterData.basicInfo.level }}
        {{ selectedCharacterData.basicInfo.ancestry.name }}
        {{ selectedCharacterData.basicInfo.job }}
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
              <input
                id="level-input"
                type="number"
                min="1"
                max="12"
                v-model="selectedCharacterData.basicInfo.level"
              />
            </td>
            <td>
              <input placeholder="ancestry" />
            </td>
            <td>
              <input placeholder="ancestryTrait" />
            </td>
            <td>
              <input v-model="selectedCharacterData.basicInfo.job" />
            </td>
          </tr>
        </table>
        <!-- TODO: change to dropdown -->
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
            <input
              id="input-bulk"
              type="number"
              min="1"
              max="6"
              v-model="selectedCharacterData.chosenStats.bulk"
            />
          </td>
          <td>
            <input
              id="input-agility"
              type="number"
              min="1"
              max="6"
              v-model="selectedCharacterData.chosenStats.agility"
            />
          </td>
          <td>
            <input
              id="input-mind"
              type="number"
              min="1"
              max="6"
              v-model="selectedCharacterData.chosenStats.mind"
            />
          </td>
          <td>
            <input
              id="input-magic"
              type="number"
              min="1"
              max="6"
              v-model="selectedCharacterData.chosenStats.magic"
            />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped>
th {
  border: 1px solid black;
  background-color: aliceblue;
  width: 200px;
}
td {
  border: 1px solid black;
}

input {
  width: 100%;
}

#navbar {
  width: 100%;
  background-color: skyblue;
  padding-left: 1rem;
  margin-bottom: 3em;
  border-bottom-right-radius: 3em;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
