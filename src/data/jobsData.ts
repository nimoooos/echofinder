import type iJobs from '@/interfaces/iJobs';
import { jobClass } from '@/interfaces/iJobs';

export const jobsData: iJobs[] = [
  {
    name: 'Assassin',
    class: [jobClass.Striker],
    baseStats: {
      scope: 8,
      saveTarget: 10,
      hp: 8,
      recoveries: 3,
      dodge: 11,
      speed: 6,
      stress: 5,
      memory: 6,
      adef: 7,
      mp: 2,
    },
    jobTraits: [
      {
        name: 'Assassinate',
        text: '1/round, you may deal +1d6 bonus damage on a hit with a melee attack if you are HIDDEN or if you are the only character adjacent to the target.',
      },
      {
        name: 'Preparation',
        text: 'At the end of each of your turns while HIDDEN, you gain 1 Prep, to a maximum of 6. After making an attack roll, you can decide to spend any amount of Prep, adding +1 to the attack roll per Prep. Prep lasts for the rest of the scene or until spent.',
      },
    ],
    weaponSlots: [null], //make iWeapon
    supportSlots: [null], //make iSupport
    limitBreak: null,
  },
  {
    name: 'Equinox',
    class: [jobClass.Artillery],
    baseStats: {
      scope: 12,
      saveTarget: 11,
      hp: 6,
      recoveries: 3,
      dodge: 6,
      speed: 4,
      stress: 5,
      memory: 7,
      adef: 10,
      mp: 5,
    },
    jobTraits: [
      {
        name: 'Day/Night Cycle',
        text: "You have two special resources - Sun and Moon - that each start at 0. You can only have one of these resources at a time, and they reset to 0 at the end of each combat scene. \n Sun and Moon have the following effects: \n\t* Sun: For each Sun you have, your AOE spells and artifact weapons gain +1 to their AOEs (Line AOEs have their width increased by +1, instead); however, you must spend +1 MP each time you use one of these spells or weapons. If you can't, you immediately lose all Sun. \n\t* Moon: For each Moon you have, your Scope and Range with artifact weapons and spells that have a Range increase by +4; however, you take 1 Stress each time you target something with a spell or artifact weapon attack beyond your normal Scope or the weapon's Range.",
        action: null, //TODO: add Day/Night Cycle Minor Action
      },
      {
        name: 'Mage Tower',
        text: "If you haven't moved since the start of your last turn, you gain both of the following benefits, which don't stack:\n\t* Surecast: Your ranged artifact weapon and spell attacks gain +1 ACC. \n\t* Sharpcast: Your Channel spells impose +1 DIF on any saves they trigger.",
      },
    ],
    weaponSlots: [],
    supportSlots: [],
    limitBreak: undefined,
  },
];
