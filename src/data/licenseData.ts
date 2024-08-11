import type { iLicense } from '@/interfaces/iLicense';
import { job } from './jobsData';
import { featureType, type iFeature } from '@/interfaces/iFeature';
import { itemSize, techniqueType, weaponType, type iSupport, type iTechnique, type iWeapon } from '@/interfaces/iItem';
import { rangeType } from '@/interfaces/iRange';
import { damageType } from '@/interfaces/iDamage';

export const licensesData: iLicense[] = [
  {
    name: 'Assassin',
    jobs: [job('Assassin')],
    unlocks: {
      1: [
        {
          name: 'Throatcutter',
          type: featureType.weapon,
          text: 'You can 5 Fight with this weapon during Phase 3 Skirmish.',
          weaponData: {
            attackProfiles: [
              { range: { rangeType: rangeType.reach, amount: 1 }, damage: { damageType: damageType.physical, amount: '1d3+1' } },
              { range: { rangeType: rangeType.thrown, amount: 5 }, damage: { damageType: damageType.physical, amount: '1d3+1' } },
            ],
            weaponSize: 'Light',
            weaponType: 'Blade',
            weaponRange: 'Melee',
          },
          tags: [{ name: 'Thrown', amount: 5 }],
        },
        {
          name: 'Master of Stealth',
          type: featureType.technique,
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
          type: featureType.supportItem,
          text: 'When you successfully Grapple a target, they are Silenced for the duration of the grapple. Additionally, they take 1 Piercing Physical for every space moved while Grappled in this way, to a maximum amount of damage each turn equal to your Speed.\n\tYou can only garrote one target at a time, and a character can only be garroted by one character at a time.',
          supportData: {
            supportSize: 'Light',
          },
        },
        {
          name: "Poisoner's Kit",
          type: featureType.supportItem,
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
          type: featureType.supportItem,
          text: '+1 Armor. Whenever you defeat an enemy, you become Invisible until the start of your next turn.',
          supportData: {
            supportSize: 'Light',
          },
          tags: [{ name: 'Armor' }],
        },
        {
          name: 'Death Strike',
          type: featureType.technique,
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
          type: featureType.technique,
          text: 'On Channel: Choose one of the following options:\n\t⬦ Fireball: On Release: Characters in a Blast 2 AOE within Range are auto-hit, taking 2d6+2 Astral.\n  \t⬦ Squall: On Release: Center a Burst 1 AOE around a character within Range. All characters within the AOE are auto-hit for 2d6+2 Lunar and Slowed until the end of their next turn.',
          tags: [{ name: 'Mana', amount: 2 }],
          techniqueData: {
            techniqueType: 'Spell',
            memoryCost: 2,
            attackProfiles: [
              { range: { rangeType: rangeType.range, amount: 'scope' } },
              { range: { rangeType: rangeType.blast, amount: 2 }, damage: { damageType: damageType.astral, amount: '2d6+2' } },
              { range: { rangeType: rangeType.burst, amount: 1 }, damage: { damageType: damageType.lunar, amount: '2d6+2' } },
            ],
          },
        },
        {
          name: 'Scar',
          type: featureType.technique,
          text: "Deal 1 Piercing Force to an enemy within Range, or 3 Piercing Force if they're Bloodied.",
          tags: [{ name: 'Mana', amount: 1 }],
          techniqueData: {
            techniqueType: 'Spell',
            memoryCost: 2,
            attackProfiles: [
              { range: { rangeType: rangeType.range, amount: 'scope' }, damage: { damageType: damageType.force, amount: '1' } },
              { range: { rangeType: rangeType.range, amount: 'scope' }, damage: { damageType: damageType.force, amount: '3' } },
            ],
          },
        },
      ],
      2: [],
      3: [],
    },
  },
];

export function feature(license: iLicense, featureName: string): iFeature | iWeapon | iSupport | iTechnique {
  let output = {
    name: '',
    type: featureType.trait,
    text: '',
  };

  const allUnlocks = [...license.unlocks[1], ...license.unlocks[2], ...license.unlocks[3]];
  console.log('Searching the following for the name:', featureName);
  console.log(allUnlocks);

  allUnlocks.map((unlk) => {
    if (unlk.name === featureName) {
      output = unlk;
    }
  });

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
