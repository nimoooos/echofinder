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
  moniker: true,
  basicinfo: true,
  bamm: true,
});

/**
 * calculates stats again each time there's a change
 */
function recalculateStats(): void {
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

  //calcaulate derived bamm (mostly reserves)
  charData.value.derivedStats.bulk = charData.value.chosenStats.bulk;
  charData.value.derivedStats.agility = charData.value.chosenStats.agility;
  charData.value.derivedStats.mind = charData.value.chosenStats.mind;
  charData.value.derivedStats.magic = charData.value.chosenStats.magic;

  //grit
  charData.value.derivedStats.grit = Math.floor(charData.value.basicInfo.level / 2);

  //calculate bonuses from bamm
  charData.value.derivedStats.hp += 2 * charData.value.derivedStats.bulk;
  charData.value.derivedStats.recoveries += Math.floor(charData.value.derivedStats.bulk / 2);
  charData.value.derivedStats.dodge += charData.value.derivedStats.agility;
  charData.value.derivedStats.speed += Math.floor(charData.value.derivedStats.agility / 2);
  charData.value.derivedStats.stress += charData.value.derivedStats.mind;
  charData.value.derivedStats.memory += Math.floor(charData.value.derivedStats.mind / 2);
  charData.value.derivedStats.adef += charData.value.derivedStats.magic;
  charData.value.derivedStats.mp += Math.floor(charData.value.derivedStats.magic / 2);

  //get traits
  //get weapons
  //get supports
  //get techniques

  //get stat bonus from traits
  //get stat bonus from weapons
  //get stat bonus from supports
  //get stat bonus from techniques
  //get stat bonus from talents

  //print new charData
  console.log(charData.value);
}

/**
 * sets ancestry trait, called by ancestry trait menu
 */
function setAncestryTrait(newAncestryTraitName: string): void {
  charData.value.chosenStats.ancestryTrait = ancestryTrait(charData.value.basicInfo.ancestry, newAncestryTraitName);
}

function checkBamm(): { caution: boolean; message: string } {
  let output = { caution: false, message: '' };
  const bammSum = charData.value.chosenStats.bulk + charData.value.chosenStats.agility + charData.value.chosenStats.mind + charData.value.chosenStats.magic;
  const bammMax = charData.value.basicInfo.level + 1;
  output.caution = bammSum != bammMax;
  output.message = `${bammSum}/${bammMax} pts`;

  return output;
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
        <table id="charsheet-moniker-table">
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
        <table id="charsheet-basicinfo-table">
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
      <h3 class="table-heading">Ability Scores</h3>
      <p class="caution" id="bamm-caution" :v-if="checkBamm().caution">
        {{ checkBamm().message }}
      </p>
      <button @click="toggleEdit.bamm = !toggleEdit.bamm">📝</button>

      <table id="charsheet-bamm-table">
        <tr>
          <th>Bulk</th>
          <th>Agility</th>
          <th>Mind</th>
          <th>Magic</th>
        </tr>
        <tr class="middle-row" v-if="toggleEdit.bamm">
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
        <tr>
          <td><input type="number" disabled v-model="charData.derivedStats.bulk" /></td>
          <td><input type="number" disabled v-model="charData.derivedStats.agility" /></td>
          <td><input type="number" disabled v-model="charData.derivedStats.mind" /></td>
          <td><input type="number" disabled v-model="charData.derivedStats.magic" /></td>
        </tr>
      </table>
    </div>
    <div id="charsheet-derivedstats">
      <h3 class="table-heading">Attributes</h3>
      <table id="charsheet-derivedstats-table">
        <tr>
          <th>Size</th>
          <th>Grit</th>
          <th>Recoveries</th>
        </tr>
        <tr>
          <td><input type="number" disabled v-model="charData.derivedStats.size" /></td>
          <td><input type="number" disabled v-model="charData.derivedStats.grit" /></td>
          <td><input type="number" disabled v-model="charData.derivedStats.recoveries" /></td>
        </tr>
        <tr>
          <th>HP</th>
          <th>Armor</th>
          <th>Stress Cap</th>
          <th>MP</th>
        </tr>
        <tr>
          <td><input type="number" disabled v-model="charData.derivedStats.hp" /></td>
          <td><input type="number" disabled v-model="charData.derivedStats.armor" /></td>
          <td><input type="number" disabled v-model="charData.derivedStats.stress" /></td>
          <td><input type="number" disabled v-model="charData.derivedStats.mp" /></td>
        </tr>
        <tr>
          <th>Scope</th>
          <th>Memory</th>
          <th>Save Target</th>
        </tr>
        <tr>
          <td><input type="number" disabled v-model="charData.derivedStats.scope" /></td>
          <td><input type="number" disabled v-model="charData.derivedStats.memory" /></td>
          <td><input type="number" disabled v-model="charData.derivedStats.saveTarget" /></td>
        </tr>
        <tr>
          <th>Speed</th>
          <th>Dodge</th>
          <th>A-Defense</th>
        </tr>
        <tr>
          <td><input type="number" disabled v-model="charData.derivedStats.speed" /></td>
          <td><input type="number" disabled v-model="charData.derivedStats.dodge" /></td>
          <td><input type="number" disabled v-model="charData.derivedStats.adef" /></td>
        </tr>
      </table>
    </div>
    <div id="charsheet-weapons">
      <h3>Weapons</h3>
    </div>
    <div id="charsheet-supportItems">
      <h3>Support Items</h3>
    </div>
    <div id="charsheet-techniques">
      <h3>Techniques</h3>
    </div>
    <div id="charsheet-talents">
      <h3>Talents</h3>
    </div>
  </div>
</template>

<style scoped>
h3.table-heading {
  display: inline-block;
}
p.caution {
  color: var(--color-accent-bold);
  display: inline-block;
  margin-left: 1rem;
}
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
tr.middle-row td {
  border-bottom-right-radius: 0rem;
}

input,
select {
  width: 100%;
  height: 100%;
  border: 0;
  background-color: var(--color-background-soft);
  color: var(--color-text);
  text-align: center;
}

input:disabled {
  -webkit-appearance: none;
  -moz-appearance: textfield;
}

button {
  border: transparent;
  background-color: transparent;
}
</style>
