import type { iLicense } from '@/interfaces/iLicense';
import { job } from './jobsData';
import { type iFeature } from '@/interfaces/iFeature';
import { type iSupport, type iTechnique, type iWeapon } from '@/interfaces/iItem';
import { ActionType, Phase } from '@/interfaces/iAction';

export const licensesData: iLicense[] = [
  {
    name: 'Assassin',
    jobs: [job('Assassin')],
    unlocks: {
      1: [
        {
          name: 'Throatcutter',
          type: 'Weapon',
          text: 'You can 5 Fight with this weapon during Phase 3 Skirmish.',
          actionData: {
            actionType: ActionType.fight,
            phase: [Phase.skirmish, Phase.brawl],
          },
          weaponData: {
            attackProfiles: [
              { range: { type: 'Reach', value: 1 }, damage: [{ type: 'Physical', value: '1d3+1' }] },
              { range: { type: 'Thrown', value: 5 }, damage: [{ type: 'Physical', value: '1d3+1' }] },
            ],
            weaponSize: 'Light',
            weaponType: 'Blade',
            weaponRange: 'Melee',
          },
          tags: [{ name: 'Thrown', amount: 5 }],
        },
        {
          name: 'Master of Stealth',
          type: 'Technique',
          text: 'To end your Hidden status at the end of their turn, enemies must be within 10 spaces of you. Additionally, enemies receive +1 to Search for you.',
          techniqueData: {
            techniqueType: 'Skill',
            memoryCost: 2,
          },
        },
      ],
      2: [
        {
          name: 'Garrote',
          type: 'Support Item',
          text: 'When you successfully Grapple a target, they are Silenced for the duration of the grapple. Additionally, they take 1 Piercing Physical for every space moved while Grappled in this way, to a maximum amount of damage each turn equal to your Speed.\nYou can only garrote one target at a time, and a character can only be garroted by one character at a time.',
          supportData: {
            supportSize: 'Light',
          },
        },
        {
          name: "Poisoner's Kit",
          type: 'Support Item',
          text: "You can expend a charge when you hit with a non-Aetheric weapon attack. The target takes 1 Discord. As long as they take any amount of Discord from his ability after resistances, immunity, and so on, they are then affected by one of the following poisons (your choice): \n\t⬦ Deathbite: Whenever the target fails the Magic check to clear their Discord, their Discord doubles before they take discord damage.\n\t⬦ Ghoulblood: The target is Weakened.\n\t⬦ Midnight Malice: The target is Blinded and can't reveal Hidden enemies. \nThis effect lasts until cleared.",
          supportData: {
            supportSize: 'Main',
          },
          tags: [{ name: 'Consumable', amount: 3 }],
        },
      ],
      3: [
        {
          name: "Reaper's Shroud",
          type: 'Support Item',
          text: '+1 Armor. Whenever you defeat an enemy, you become Invisible until the start of your next turn.',
          supportData: {
            supportSize: 'Light',
          },
          tags: [{ name: 'Armor' }],
        },
        {
          name: 'Death Strike',
          type: 'Technique',
          text: '1/round when you critically hit a Bloodied or Breaking enemy with a weapon or spell attack, there is a chance the target will take an instant Wound or Overstress: \n\t⬦ If the target is Bloodied and the attack deals damage, they must make a Bulk save. Failure: They take a Wound instead of taking the usual damage.\n\t⬦ If the target is Breaking and the attack deals Stress, they must make a Mind save. Failure: They take an Overstress instead of taking the usual damage.',
          techniqueData: {
            techniqueType: 'Skill',
            memoryCost: 4,
          },
        },
      ],
    },
  },
  {
    name: 'Equinox',
    jobs: [job('Equinox')],
    unlocks: {
      1: [
        {
          name: 'Exobomb',
          type: 'Technique',
          text: 'On Channel: Choose one of the following options:\n\t⬦ Fireball: On Release: Characters in a Blast 2 AOE within Range are auto-hit, taking 2d6+2 Astral.\n  \t⬦ Squall: On Release: Center a Burst 1 AOE around a character within Range. All characters within the AOE are auto-hit for 2d6+2 Lunar and Slowed until the end of their next turn.',
          tags: [{ name: 'Mana', amount: 2 }],
          actionData: {
            actionType: ActionType.channel,
            phase: Phase.channel,
          },
          techniqueData: {
            techniqueType: 'Spell',
            memoryCost: 2,
            attackProfiles: [
              { range: { type: 'Range', value: 'Scope' } },
              { range: { type: 'Blast', value: 2 }, damage: [{ type: 'Astral', value: '2d6+2' }] },
              { range: { type: 'Burst', value: 1 }, damage: [{ type: 'Lunar', value: '2d6+2' }] },
            ],
          },
        },
        {
          name: 'Scar',
          type: 'Technique',
          text: "Deal 1 Piercing Force to an enemy within Range, or 3 Piercing Force if they're Bloodied.",
          tags: [{ name: 'Mana', amount: 1 }],
          actionData: {
            actionType: ActionType.minor,
            phase: Phase.any,
          },
          techniqueData: {
            techniqueType: 'Spell',
            memoryCost: 2,
            attackProfiles: [
              { range: { type: 'Range', value: 'Scope' }, damage: [{ type: 'Force', value: '1' }] },
              { range: { type: 'Range', value: 'Scope' }, damage: [{ type: 'Force', value: '3' }] },
            ],
          },
        },
      ],
      2: [
        {
          name: 'Celestial Ray',
          type: 'Technique',
          text: 'You gain the Ray of Fire and Ray of Cold ranged spell attacks.',
          actionData: {
            actionType: ActionType.volley,
            phase: Phase.skirmish,
          },
          techniqueData: {
            techniqueType: 'Spell',
            spellRange: 'Ranged',
            memoryCost: 1,
          },
          gainedActions: [
            {
              name: 'Ray of Fire',
              type: 'Technique',
              text: 'On Hit: If the target was hit by Ray of Fire on your last turn, they also take 4 Discord.',
              actionData: {
                actionType: ActionType.volley,
                phase: Phase.skirmish,
              },
              techniqueData: {
                techniqueType: 'Spell',
                spellRange: 'Ranged',
                memoryCost: 0,
                attackProfiles: [
                  {
                    range: { type: 'Range', value: 'Scope' },
                    damage: [
                      { type: 'Astral', value: '1d6+1' },
                      { type: 'Discord', value: '4' },
                    ],
                  },
                ],
              },
            },
            {
              name: 'Ray of Cold',
              type: 'Technique',
              text: 'On Hit: If the target is Immobilized, Slowed, Stunned, Grappled, or Prone, this ability deals 2d6+1 Lunar instead of its usual damage.',
              actionData: {
                actionType: ActionType.volley,
                phase: Phase.skirmish,
              },
              techniqueData: {
                techniqueType: 'Spell',
                spellRange: 'Ranged',
                memoryCost: 0,
                attackProfiles: [
                  {
                    range: { type: 'Range', value: 'Scope' },
                    damage: [{ type: 'Lunar', value: '1d6+1' }],
                  },
                  {
                    range: { type: 'Range', value: 'Scope' },
                    damage: [{ type: 'Lunar', value: '2d6+1' }],
                  },
                ],
              },
            },
          ],
        },
        {
          name: 'Saturn Rod',
          type: 'Weapon',
          text: '',
          tags: [{ name: 'Homing' }, { name: 'Mana', amount: 1 }],
          actionData: {
            actionType: ActionType.volley,
            phase: Phase.skirmish,
          },
          weaponData: {
            weaponSize: 'Main',
            weaponRange: 'Ranged',
            weaponType: 'Artifact',
            attackProfiles: [{ range: { type: 'Range', value: 10 }, damage: [{ type: 'Force', value: '1d3+3' }] }],
          },
        },
      ],
      3: [
        {
          name: 'Dividing Line',
          type: 'Technique',
          text: 'On Release: Designate all adjacent spaces along one long side of the AOE as Astral and all adjacent spaces along the other as Lunar. The spaces at the tips of the line are unaffected.\nCharacters in or adjacent to the line, excluding yourself, must make an Agility save, taking damage of a type determined by their location.\n\t⬦Failure: They take 2d6+6 damage and are Sundered until the end of their next turn.\n\t⬦Success: They take 1d6+6 damage.\n\nCharacters on the astral side take Astral, characters on the Lunar side take Lunar, and characters in the center of the AOE take Force. Characters spanning more than one location choose which damage they take.',
          tags: [{ name: 'Mana', amount: 3 }],
          actionData: {
            actionType: ActionType.channel,
            phase: Phase.channel,
          },
          techniqueData: {
            techniqueType: 'Spell',
            memoryCost: 2,
            attackProfiles: [{ range: { type: 'Line', value: 15 } }],
          },
        },
        {
          name: 'Quickcast',
          type: 'Technique',
          text: 'The next time you 2 Channel an ability this round, you release it immediately.',
          tags: [{ name: 'Mana', amount: 2 }],
          actionData: {
            actionType: ActionType.minor,
            phase: Phase.any,
          },
          techniqueData: {
            memoryCost: 3,
            techniqueType: 'Skill',
          },
        },
      ],
    },
  },
];

export function feature(license: iLicense, featureName: string): iFeature | iWeapon | iSupport | iTechnique {
  let output: iFeature | iWeapon | iSupport | iTechnique = {
    name: '',
    type: 'Trait',
    text: '',
  };

  const allUnlocks: (iFeature | iWeapon | iSupport | iTechnique)[] = [...license.unlocks[1], ...license.unlocks[2], ...license.unlocks[3]];
  console.log('Searching the following for the name:', featureName, allUnlocks);

  allUnlocks.map((unlock) => {
    if (unlock.name === featureName) {
      output = unlock;
    }
  });
  console.log(output);
  return output;
}

export function license(licenseName: string): iLicense {
  let output: iLicense = {
    name: '',
    jobs: [],
    unlocks: {
      1: [],
      2: [],
      3: [],
    },
  };
  console.log('Searching licensesData for:', licenseName);
  licensesData.map((lic) => {
    if (lic.name === licenseName) {
      output = lic;
    }
  });
  return output;
}
