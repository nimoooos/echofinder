<script setup lang="ts">
//TODO: set up props to receive trait data
//TODO: put it into a format that's easily readable by the template
//TODO: dynamic style based on feature type
import type { iFeature } from '@/interfaces/iFeature';
import type { iSupport, iTechnique, iTrait, iWeapon } from '@/interfaces/iItem';

const props = defineProps<{
  feature: iFeature | iTrait | iWeapon | iSupport | iTechnique; //TODO: or iTalent
}>();

let tagsArray: string[] = [''];
props.feature.tags?.forEach((tag) => {
  if (tag.amount) {
    tagsArray.push(`${tag.name}${' ' + tag.amount}`);
  } else {
    tagsArray.push(`${tag.name}`);
  }
});
</script>

<template>
  <div class="wrapper">
    <table>
      <tr>
        <th>
          <p class="feature-name">{{ props.feature.name }}</p>
          <p class="tags">
            {{
              tagsArray.reduce((acc, val) => {
                return `${acc} ${val}`;
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
.wrapper {
  display: inline-block;
}

table {
  width: 370px;
  padding: 1px;
  margin: 10px;
}

th {
  background-color: var(--color-accent);
  border: 1px solid var(--color-border);
  border-top-right-radius: 15px;
  text-align: start;
  padding: 0.3rem 1rem;
}

td {
  border: 1px solid var(--color-border);
  border-bottom-right-radius: 15px;
  padding: 0.3rem 1rem;
}

.feature-name {
  font: 1.1em sans-serif;
}

.tags {
  font: 0.8em;
}

.rules-text {
  white-space: pre-line;
}
</style>
