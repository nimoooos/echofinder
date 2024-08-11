/**
 * for weapon, support, or technique
 */

import type { ActionType } from './iAction';
import type { iDamage } from './iDamage';
import type { iFeature } from './iFeature';
import type { iRange } from './iRange';

/**
 * For weapons and support items. Light=2, Main=3, Heavy=5. Multiply the primes for linked weapons
 */
export enum SlotSize {
  light = 2,
  main = 3,
  lightlight = 4,
  heavy = 5,
  mainlight = 6,
}

interface iItem extends iFeature {
  type: 'Weapon' | 'Support Item' | 'Technique';
  actionType?: ActionType;
}

export interface iTrait extends iFeature {
  type: 'Trait';
}

export interface iWeapon extends iItem {
  weaponData: {
    attackProfiles: iAttackProfile[];
    weaponSize: 'Light' | 'Main' | 'Heavy';
    weaponRange: 'Ranged' | 'Melee' | 'Ranged/Melee';
    weaponType: 'Artifact' | 'Blade' | 'Bow' | 'Club' | 'Longarm' | 'Magitech';
  };
}

export interface iSupport extends iItem {
  supportData: {
    supportSize: 'Light' | 'Main' | 'Heavy';
  };
}

export interface iTechnique extends iItem {
  techniqueData: {
    techniqueType: 'Spell' | 'Skill';
    memoryCost: number;
    spellRange?: 'Melee' | 'Ranged';
    attackProfiles?: iAttackProfile[];
  };
}

export interface iAttackProfile {
  range?: iRange;
  damage?: iDamage[];
}
