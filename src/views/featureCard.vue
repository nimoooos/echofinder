<script setup lang="ts">
//TODO: set up props to receive trait data
//TODO: put it into a format that's easily readable by the template
//TODO: dynamic style based on feature type
import { type iFeature } from '@/interfaces/iFeature';
import { type iSupport, type iTechnique, type iTrait, type iWeapon } from '@/interfaces/iItem';

const props = defineProps<{
  feature: iFeature | iTrait | iWeapon | iSupport | iTechnique; //TODO: or iTalent
}>();

function setStyle() {
  let styleType: string = props.feature.type;
  let style: string = 'style-';
  if (styleType == 'Technique') {
    styleType = (props.feature as iTechnique).techniqueData.techniqueType;
    switch (styleType) {
      case 'Skill':
        style += 'skill';
        break;
      case 'Spell':
        style += 'spell';
        break;
    }
  } else {
    switch (styleType) {
      case 'Trait':
        style += 'trait';
        break;
      case 'Weapon':
        style += 'weapon';
        break;
      case 'Support Item':
        style += 'support';
        break;
    }
  }
  return style;
}

function setTags() {
  let tagsArray: string[] = [''];

  //Feature type
  switch (props.feature.type) {
    case 'Trait': {
      tagsArray.push('Trait');
      break;
    }
    case 'Weapon': {
      tagsArray.push(`${(props.feature as iWeapon).weaponData.weaponRange} Weapon`);
      tagsArray.push(`${props.feature.itemSize} ${(props.feature as iWeapon).weaponData.weaponType}`);
      break;
    }
    case 'Support Item': {
      tagsArray.push('Support Item');
      tagsArray.push(`${props.feature.itemSize}`);
      break;
    }
    case 'Technique': {
      switch ((props.feature as iTechnique).techniqueData.techniqueType) {
        case 'Skill': {
          tagsArray.push('Skill');
          break;
        }
        case 'Spell': {
          switch ((props.feature as iTechnique).techniqueData.spellRange) {
            case 'Melee': {
              tagsArray.push('Melee Spell Attack');
              break;
            }
            case 'Ranged': {
              tagsArray.push('Ranged Spell Attack');
              break;
            }
            case undefined: {
              tagsArray.push('Spell');
            }
          }
        }
      }
    }
    //TODO: case talent
  }

  //Memory Cost
  if (props.feature.type == 'Technique') {
    tagsArray.push(`${(props.feature as iTechnique).techniqueData.memoryCost} Memory`);
  }

  //Other tags
  props.feature.tags?.forEach((tag) => {
    if (tag.value) {
      tagsArray.push(`${tag.name}${' ' + tag.value}`);
    } else {
      tagsArray.push(`${tag.name}`);
    }
  });
  return tagsArray;
}

const isValidFeature: boolean = props.feature.name != '';
</script>

<template>
  <div class="featureCard">
    <table v-if="isValidFeature" :class="setStyle()">
      <tr>
        <th>
          <p class="feature-name">{{ props.feature.name }}</p>
          <p class="tags">
            {{
              setTags().reduce((acc, val) => {
                return `${acc} ${val} ⬩`;
              })
            }}
          </p>
        </th>
      </tr>
      <tr>
        <td>
          <p class="rules-text">{{ props.feature.text }}</p>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.featureCard {
  display: inline-block;
}

table {
  width: 370px;
  padding: 1px;
  margin-right: 10px;
}

th {
  background-color: var(--color-accent);
  border: 1px solid var(--color-border);
  border-top-right-radius: 15px;
  text-align: start;
  padding: 0.3rem 1rem;
}

th p.feature-name {
  font-family: sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  font-stretch: extra-condensed;
}

th p.tags {
  font-family: serif;
  font-weight: 400;
  font-size: 1.1rem;
  font-stretch: condensed;
  font-variant: small-caps;
}

td {
  border: 1px solid var(--color-border);
  border-bottom-right-radius: 15px;
  padding: 0.3rem 1rem;
}

td p.rules-text {
  font-family: sans-serif;
  line-height: 1.1rem;
}

table.style-trait th {
  background-color: var(--theme-trait-bold);
  color: var(--vt-c-white);
}

table.style-trait td {
  background-color: var(--theme-trait-light);
  color: rgb(0, 0, 0);
}

table.style-weapon th {
  background-color: var(--theme-weapon-bold);
  color: var(--vt-c-white);
}

table.style-weapon td {
  background-color: var(--theme-weapon-light);
  color: rgb(0, 0, 0);
}

table.style-support th {
  background-color: var(--theme-support-bold);
  color: var(--vt-c-white);
}

table.style-support td {
  background-color: var(--theme-support-light);
  color: rgb(0, 0, 0);
}

table.style-skill th {
  background-color: var(--theme-skill-bold);
  color: var(--vt-c-white);
}

table.style-skill td {
  background-color: var(--theme-skill-light);
  color: rgb(0, 0, 0);
}

table.style-spell th {
  background-color: var(--theme-spell-bold);
  color: var(--vt-c-white);
}

table.style-spell td {
  background-color: var(--theme-spell-light);
  color: rgb(0, 0, 0);
}

.feature-name {
  font: 1.1em sans-serif;
}

.tags {
  font: 0.8em;
}

.rules-text {
  white-space: break-spaces;
}
</style>
