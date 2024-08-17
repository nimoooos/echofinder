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
  Light = 2,
  Main = 3,
  LightLight = 4,
  Heavy = 5,
  MainLight = 6,
}

export interface iSlot {
  index: number;
  slotSize: SlotSize;
  special?: string; //innate, training, etc.
}

interface iItem extends iFeature {
  type: 'Weapon' | 'Support Item' | 'Technique';
  actionType?: ActionType;
}

export interface iTrait extends iFeature {
  type: 'Trait';
}

export interface iWeapon extends iItem {
  type: 'Weapon';
  weaponData: {
    attackProfiles: iAttackProfile[];
    weaponSize: 'Light' | 'Main' | 'Heavy';
    weaponRange: 'Ranged' | 'Melee' | 'Ranged/Melee';
    weaponType: 'Artifact' | 'Blade' | 'Bow' | 'Club' | 'Longarm' | 'Magitech';
  };
}

export interface iSupport extends iItem {
  type: 'Support Item';
  supportData: {
    supportSize: 'Light' | 'Main' | 'Heavy';
  };
}

export interface iTechnique extends iItem {
  type: 'Technique';
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
