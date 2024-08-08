<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { ref, watch } from 'vue';

import type iCharacterData from './interfaces/iCharacterData';

const blankCharacterData: iCharacterData = {
  moniker: { name: '', title: '', pronouns: '' },
  basicInfo: { level: 1, ancestry: null, job: null },
  chosenStats: { bulk: 0, agility: 0, mind: 0, magic: 0, ancestryTrait: null },
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
    ancestry: 'Elf',
    job: 'Equinox',
  },
  chosenStats: {
    bulk: 0,
    agility: 0,
    mind: 0,
    magic: 0,
    ancestryTrait: 'Elven Accuracy',
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
        <input v-model="selectedCharacterData.moniker.name" placeholder="name" />
        <input v-model="selectedCharacterData.moniker.title" placeholder="title" />
        <input v-model="selectedCharacterData.moniker.pronouns" placeholder="pronouns" />
      </div>
    </div>
    <div id="charsheet-basicinfo">
      <h2>
        Level {{ selectedCharacterData.basicInfo.level }}
        {{ selectedCharacterData.basicInfo.ancestry }}
        {{ selectedCharacterData.basicInfo.job }}
        <button @click="toggleEdit.basicinfo = !toggleEdit.basicinfo">📝</button>
      </h2>
      <div id="charsheet-basicinfo-edit" v-if="toggleEdit.basicinfo">
        <input v-model="selectedCharacterData.basicInfo.level" placeholder="level" />
        <input v-model="selectedCharacterData.basicInfo.ancestry" />
        <input v-model="selectedCharacterData.basicInfo.job" />
      </div>
    </div>
    <div id="charsheet-bamm">
      <label for="input-bulk">Bulk</label>
      <input id="input-bulk" type="number" v-model="selectedCharacterData.chosenStats.bulk" />
      <label for="input-agility">Agility</label>
      <input id="input-agility" type="number" v-model="selectedCharacterData.chosenStats.agility" />
      <label for="input-mind">Mind</label>
      <input id="input-mind" type="number" v-model="selectedCharacterData.chosenStats.mind" />
      <label for="input-magic">Magic</label>
      <input id="input-magic" type="number" v-model="selectedCharacterData.chosenStats.magic" />
    </div>
  </div>
</template>

<style scoped>
label {
  padding-left: 5px;
  padding-right: 15px;
}

#navbar {
  width: 100%;
  background-color: aquamarine;
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
