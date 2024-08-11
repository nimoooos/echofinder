import { ActionType, Phase } from '@/interfaces/iAction';
import { SlotSize } from '@/interfaces/iItem';
import type iJob from '@/interfaces/iJobs';
import { JobClass } from '@/interfaces/iJobs';

export const jobsData: iJob[] = [
  {
    name: 'Assassin',
    sourceLicense: [JobClass.Striker],
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
        type: 'Trait',
        text: '1/round, you may deal +1d6 bonus damage on a hit with a melee attack if you are HIDDEN or if you are the only character adjacent to the target.',
      },
      {
        name: 'Preparation',
        type: 'Trait',
        text: 'At the end of each of your turns while HIDDEN, you gain 1 Prep, to a maximum of 6. After making an attack roll, you can decide to spend any amount of Prep, adding +1 to the attack roll per Prep. Prep lasts for the rest of the scene or until spent.',
      },
    ],
    weaponSlots: [SlotSize.Light, SlotSize.MainLight],
    supportSlots: [SlotSize.Light, SlotSize.Light, SlotSize.Main],
    limitBreak: {
      name: 'Exterminate',
      type: 'Limit Break',
      text: 'Until the end of the scene, your Preparation trait grants 1 Prep at the end of each of your turns, or 2 Prep if you are Hidden, instead of the Prep you would usually gain. Assassinate now deals 1d6+X bonus damage, where X is the amount of Prep spent on the attack',
      actionData: {
        actionType: ActionType.free,
        phase: Phase.any,
      },
    },
  },
  {
    name: 'Equinox',
    sourceLicense: [JobClass.Artillery],
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
        type: 'Trait',
        text: "You have two special resources - Sun and Moon - that each start at 0. You can only have one of these resources at a time, and they reset to 0 at the end of each combat scene. \n Sun and Moon have the following effects: \n\t⬦ Sun: For each Sun you have, your AOE spells and artifact weapons gain +1 to their AOEs (Line AOEs have their width increased by +1, instead); however, you must spend +1 MP each time you use one of these spells or weapons. If you can't, you immediately lose all Sun. \n\t⬦ Moon: For each Moon you have, your Scope and Range with artifact weapons and spells that have a Range increase by +4; however, you take 1 Stress each time you target something with a spell or artifact weapon attack beyond your normal Scope or the weapon's Range.",
        gainedActions: [],
        actionData: undefined,
      },
      {
        name: 'Mage Tower',
        type: 'Trait',
        text: "If you haven't moved since the start of your last turn, you gain both of the following benefits, which don't stack:\n\t⬦ Surecast: Your ranged artifact weapon and spell attacks gain +1 ACC. \n\t⬦ Sharpcast: Your Channel spells impose +1 DIF on any saves they trigger.",
        actionData: undefined,
      },
    ],
    weaponSlots: [SlotSize.Main],
    supportSlots: [SlotSize.Light, SlotSize.Light],
    limitBreak: {
      name: 'TetraFlare',
      type: 'Limit Break',
      text: 'If you stop channeling this ability before releasing for any reason, it does not expend your limit break.\nOn Release: One character in the center of the AOE is auto-hit by a spell attack for 2d6+2 Force . All other characters in the AOE are auto-hit for half of that damage.\nYou can spend up to +3 MP when you release this ability, increasing the damage by 1d6 Force for each additional MP spent. You may also apply the benefits of any amount of Sun and Moon to this ability (to a max of 2 each), which affect this ability as if it were a spell. This does not require you to have any Sun or Moon or spend any amount of either.',
      actionData: {
        actionType: ActionType.channel,
        phase: Phase.channel,
      },
    },
  },
];

export function job(jobName: string): iJob {
  let output: iJob = {
    name: '',
    sourceLicense: [],
    baseStats: {
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
    jobTraits: [],
    weaponSlots: [],
    supportSlots: [],
    limitBreak: {
      name: '',
      type: 'Trait',
      text: '',
      actionData: {
        actionType: ActionType.none,
        phase: Phase.any,
      },
    },
  };
  jobsData.map((jobData) => {
    if (jobData.name === jobName) {
      output = jobData;
    }
  });
  return output;
}
