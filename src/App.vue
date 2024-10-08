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
import FeatureCard from './views/featureCard.vue';
import { feature } from './data/licenseData';
import SlotSelect from './components/CharacterCreator/slotSelect.vue';
import type { iSupport, iWeapon } from './interfaces/iItem';
import LicenseSelect from './components/CharacterCreator/licenseSelect.vue';
import type { iLicense } from './interfaces/iLicense';

const charData = ref<iCharacterData>(defaultCharData);

const toggleEdit = ref({
  moniker: false,
  basicinfo: false,
  bamm: false,
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
  charData.value.derivedStats.hp += charData.value.derivedStats.grit;
  charData.value.derivedStats.saveTarget += charData.value.derivedStats.grit;
  charData.value.derivedStats.memory += charData.value.derivedStats.grit;

  //calculate bonuses from bamm
  charData.value.derivedStats.hp += 2 * charData.value.derivedStats.bulk;
  charData.value.derivedStats.recoveries += Math.floor(charData.value.derivedStats.bulk / 2);
  charData.value.derivedStats.dodge += charData.value.derivedStats.agility;
  charData.value.derivedStats.speed += Math.floor(charData.value.derivedStats.agility / 2);
  charData.value.derivedStats.stress += charData.value.derivedStats.mind;
  charData.value.derivedStats.memory += Math.floor(charData.value.derivedStats.mind / 2);
  charData.value.derivedStats.adef += charData.value.derivedStats.magic;
  charData.value.derivedStats.mp += Math.floor(charData.value.derivedStats.magic / 2);

  //get unlocks
  getUnlockedWeapons();
  getUnlockedSupportItems();

  //get traits
  charData.value.loadout.traits = [...charData.value.basicInfo.job.jobTraits, charData.value.chosenStats.ancestryTrait];
  //get weapons
  //get supports
  //get techniques

  //get stat bonus from traits
  //get stat bonus from weapons
  //get stat bonus from supports
  //get stat bonus from techniques
  //get stat bonus from talents

  //print new charData
  console.log('New charData:', charData.value);
}

/**
 * sets ancestry trait, called by ancestry trait menu
 */
function setAncestryTrait(newAncestryTraitName: string): void {
  charData.value.chosenStats.ancestryTrait = ancestryTrait(charData.value.basicInfo.ancestry, newAncestryTraitName);
}

function setLicenses(newLicenses: { license: iLicense; rank: 1 | 2 | 3 }[]): void {
  charData.value.licenses = newLicenses;
  console.log('licenses set:', charData.value.licenses);
}

function checkBamm(): { caution: boolean; message: string } {
  let output = { caution: false, message: '' };
  const bammSum = charData.value.chosenStats.bulk + charData.value.chosenStats.agility + charData.value.chosenStats.mind + charData.value.chosenStats.magic;
  const bammMax = charData.value.basicInfo.level + 1;
  output.caution = bammSum != bammMax;
  output.message = `${bammSum}/${bammMax} pts`;

  return output;
}

function checkLicenses(): { caution: boolean; message: string } {
  let output = { caution: false, message: '' };
  const licensesSum = charData.value.licenses.reduce((acc, currentLicense) => acc + currentLicense.rank, 0);
  output.message = `${licensesSum}/${charData.value.basicInfo.level} chosen`;
  output.caution = licensesSum != charData.value.basicInfo.level;

  return output;
}

function getUnlockedWeapons(): iWeapon[] {
  let unlockedWeapons: iWeapon[] = [];
  charData.value.licenses.forEach((lcs) => {
    if (lcs.rank >= 1) {
      lcs.license.unlocks[1].forEach((ulk) => {
        if (ulk.type === 'Weapon') {
          unlockedWeapons.push(ulk as iWeapon);
        }
      });
    }
    if (lcs.rank >= 2) {
      lcs.license.unlocks[2].forEach((ulk) => {
        if (ulk.type === 'Weapon') {
          unlockedWeapons.push(ulk as iWeapon);
        }
      });
    }
    if (lcs.rank == 3) {
      lcs.license.unlocks[3].forEach((ulk) => {
        if (ulk.type === 'Weapon') {
          unlockedWeapons.push(ulk as iWeapon);
        }
      });
    }
  });

  return unlockedWeapons;
}

function getUnlockedSupportItems(): iSupport[] {
  let unlockedSupportItems: iSupport[] = [];
  charData.value.licenses.forEach((lcs) => {
    if (lcs.rank >= 1) {
      lcs.license.unlocks[1].forEach((ulk) => {
        if (ulk.type === 'Support Item') {
          unlockedSupportItems.push(ulk as iSupport);
        }
      });
    }
    if (lcs.rank >= 2) {
      lcs.license.unlocks[2].forEach((ulk) => {
        if (ulk.type === 'Support Item') {
          unlockedSupportItems.push(ulk as iSupport);
        }
      });
    }
    if (lcs.rank == 3) {
      lcs.license.unlocks[3].forEach((ulk) => {
        if (ulk.type === 'Support Item') {
          unlockedSupportItems.push(ulk as iSupport);
        }
      });
    }
  });
  console.log('Unlocked Support Items:', unlockedSupportItems.length);
  return unlockedSupportItems;
}

//recalculate stats whenever data changes
watch([charData.value.basicInfo, charData.value.chosenStats], (newData, oldData) => {
  recalculateStats();
});
recalculateStats(); //run it once when things load
</script>

<template>
  <NavBar />
  <div id="charsheet">
    <div id="charsheet-moniker">
      <h1 id="moniker-summary">
        {{ charData.moniker.name }}, {{ charData.moniker.title }} ({{ charData.moniker.pronouns }})<button @click="toggleEdit.moniker = !toggleEdit.moniker">
          📝
        </button>
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
      <h1 id="basicinfo-summary">
        Level {{ charData.basicInfo.level }} {{ charData.basicInfo.ancestry.name }} {{ charData.basicInfo.job.name
        }}<button @click="toggleEdit.basicinfo = !toggleEdit.basicinfo">📝</button>
      </h1>
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
                :preselect="charData.basicInfo.ancestry.name"
              />
            </td>
            <td>
              <AncestryTraitSelect
                v-bind:traits="charData.basicInfo.ancestry.traits"
                :key="charData.basicInfo.ancestry.name"
                @set-trait="setAncestryTrait"
                :preselect="charData.chosenStats.ancestryTrait.name"
              />
            </td>
            <td>
              <JobSelect
                @set-job="
                  (jobName) => {
                    charData.basicInfo.job = job(jobName);
                  }
                "
                :preselect="charData.basicInfo.job.name"
                :job-options="charData.licenses.flatMap((lcs) => lcs.license.jobs)"
              />
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div id="charsheet-bamm">
      <h3 class="table-heading">Ability Scores</h3>
      <p class="caution" id="bamm-caution" :class="{ cautionActive: checkBamm().caution }">
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
        <tr v-if="!toggleEdit.bamm">
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

    <div id="charsheet-licenses">
      <h3 class="loadout-heading">
        Class Ranks
        <p class="caution" :class="{ cautionActive: checkLicenses().caution }">
          {{ checkLicenses().message }}
        </p>
      </h3>
      <LicenseSelect :currentLicenses="charData.licenses" @set-licenses="setLicenses" />
    </div>
    <div id="charsheet-traits">
      <h3 class="loadout-heading">Traits</h3>
      <FeatureCard v-for="trait in charData.loadout.traits" v-bind:key="trait.name" :feature="trait" />
    </div>
    <div id="charsheet-weapons">
      <h3 class="loadout-heading">Weapons</h3>
      <SlotSelect
        selector-type="Weapon"
        v-for="weaponSlot in charData.basicInfo.job.weaponSlots"
        :unlocks="getUnlockedWeapons()"
        :slotData="weaponSlot"
        v-bind:key="weaponSlot.index + weaponSlot.slotSize + getUnlockedWeapons().length"
      />
    </div>
    <div id="charsheet-supportItems">
      <h3 class="loadout-heading">Support Items</h3>
      <SlotSelect
        selector-type="Support Item"
        v-for="supportSlot in charData.basicInfo.job.supportSlots"
        :unlocks="getUnlockedSupportItems()"
        :slotData="supportSlot"
        v-bind:key="supportSlot.index + supportSlot.slotSize + getUnlockedSupportItems().length"
      />
    </div>
    <div id="charsheet-techniques">
      <h3 class="loadout-heading">Techniques</h3>
      <FeatureCard :feature="feature('Exobomb')" />
      <FeatureCard :feature="feature('Scar')" />
      <FeatureCard :feature="feature('Quickcast')" />
      <FeatureCard :feature="feature('Dividing Line')" />
    </div>
    <div id="charsheet-talents">
      <h3 class="loadout-heading">Talents</h3>
    </div>
  </div>
</template>

<style scoped>
#charsheet-moniker,
#charsheet-basicinfo {
  display: inline-block;
  margin-right: 40px;
}

h3.table-heading {
  display: inline-block;
  font-weight: 700;
}

h3.loadout-heading {
  font-weight: 700;
}

p.caution {
  color: var(--color-accent-bold);
  display: inline-block;
  margin-left: 1rem;
  font-size: small;
}
p.caution.cautionActive {
  color: darkred;
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
