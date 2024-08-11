import type iAncestry from '@/interfaces/iAncestry';
import { featureType } from '@/interfaces/iFeature';
import type { iTrait } from '@/interfaces/iItem';

export function ancestry(ancestryName: string): iAncestry {
  let output: iAncestry = {
    name: '',
    size: 0,
    traits: [],
  };

  ancestriesData.forEach((anc) => {
    if (anc.name === ancestryName) {
      output = anc;
    }
  });

  return output;
}

export function ancestryTrait(ancestry: iAncestry, traitname: string): iTrait {
  let output: iTrait = {
    name: '',
    type: featureType.trait,
    text: '',
  };

  ancestry.traits.forEach((trt) => {
    if (trt.name === traitname) {
      output = trt;
    }
  });

  return output;
}

export const ancestriesData: iAncestry[] = [
  {
    name: 'Avian',
    size: 1,
    traits: [
      {
        name: 'Flight',
        type: featureType.trait,
        text: 'You have flight.',
      },
      {
        name: 'Get the Flock Outta There',
        type: featureType.trait,
        text: 'You gain the "Get the Flock Outta There" reaction, which is equipped for free.',
        gainedActions: [], //TODO: GtFOT reaction
      },
      {
        name: 'Flock Tactics',
        type: featureType.trait,
        text: '1/round, you gain +1 ACC on a melee attack roll if one of your allies is adjacent to the target.',
      },
      {
        name: 'Gust',
        type: featureType.trait,
        text: 'You gain the Gust spell, which is equipped for free.',
        gainedActions: [], //TODO: Gust spell
      },
    ],
  },
  {
    name: 'Elf',
    size: 1,
    traits: [
      {
        name: 'Elven Accuracy',
        type: featureType.trait,
        text: '1/round when you use the Reroll Table for an attack roll, you can roll an additional d20 on the attack and use either result.',
      },
      {
        name: 'Nature Step',
        type: featureType.trait,
        text: 'You ignore movement penalties from difficult terrain, and gain +1 ACC on dangerous terrain checks.',
        gainedActions: [], //TODO: Nature Step minor action
      },
      {
        name: 'Fast Movement',
        type: featureType.trait,
        text: 'You gain +1 SPEED.',
        statBonus: {
          speed: 1,
        },
      },
      {
        name: 'Fey Step',
        type: featureType.trait,
        text: 'You gain the "Fey Step" free action, which is equipped for free.',
        gainedActions: [], //TODO: Fey Step free action
      },
    ],
  },
];

// export const ancestriesData = {
//   Cambion: {
//     name: 'Cambion',
//     size: 1,
//     traits: ['Bloodhunter', 'Infernal Resistance', 'Wrath', 'Fiendish Wings'],
//   },
//   Draken: {
//     name: 'Draken',
//     size: 2,
//     traits: ['Dragonfire', 'Dragon Scales', 'Inner Fire', 'Draconic Wings'],
//   },
//   Dwarf: {
//     name: 'Dwarf',
//     size: 1,
//     traits: ['Keep Moving Forward', 'Resilience', 'Unyielding', 'Sturdy'],
//   },
//   Elemental: {
//     name: 'Elemental',
//     size: 1,
//     traits: ['Energy Resistance', 'Energy Aura', 'Elemental Nova', 'Elemental Form'],
//   },
//   Gigan: {
//     name: 'Gigan',
//     size: 2,
//     traits: ['Big Equipment', 'Endure', 'Oversized Weapons', 'Giant Lineage'],
//   },
//   Gnome: {
//     name: 'Gnome',
//     size: 1 / 2,
//     traits: ['Instinctual Stealth', 'Fade Away', 'Tumble', 'Tinker Toy'],
//   },
//   Goblin: { name: 'Goblin', size: 1 / 2, traits: ['Scurry', 'Swarm', 'Nimble Escape', 'Bite'] },
//   Halfling: { name: 'Halfling', size: 1 / 2, traits: ['Lucky', 'Nimble', 'Brave', 'Tumble'] },
//   Human: {
//     name: 'Human',
//     size: 1,
//     traits: ['Strong Saves', 'Hang in There', 'Hearty', 'Adrenaline'],
//   },
//   Kobold: {
//     name: 'Kobold',
//     size: 1 / 2,
//     traits: ['Trap Array', 'Distract', 'Trapmaster', 'Evasive'],
//   },
//   Lycanthrope: {
//     name: 'Lycanthrope',
//     size: 1,
//     traits: ['Defender Strain', 'Pack Tactics', 'Sneaky Form', 'Travel Form'],
//   },
//   Machina: {
//     name: 'Machina',
//     size: 1,
//     traits: ['Mechanical Body', 'Armored', 'System Repair', 'Integrated Weapon'],
//   },
//   Orc: { name: 'Orc', size: 2, traits: ['Second Wind', 'Rushdown', 'Furious', 'Work Out Routine'] },
// };
