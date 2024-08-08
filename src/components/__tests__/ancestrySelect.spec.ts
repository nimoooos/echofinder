import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import ancestrySelect from '../CharacterCreator/ancestrySelect.vue';
import { ancestriesData } from '@/data/ancestriesData';

describe('AncestrySelect', () => {
  it('renders properly', () => {
    const wrapper = mount(ancestrySelect);
    ancestriesData.forEach((anc) => {
      expect(wrapper.text()).toContain(anc.name);
    });
  });
});
