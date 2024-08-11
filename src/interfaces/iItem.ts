/**
 * for weapon, support, or technique
 */

import type { actionType } from './iAction';
import type { iDamage } from './iDamage';
import type { featureType, iFeature } from './iFeature';
import type { iRange } from './iRange';

/**
 * For weapons and support items. Light=2, Main=3, Heavy=5. Multiply the primes for linked weapons
 */
export enum itemSize {
  light = 2,
  main = 3,
  lightlight = 4,
  heavy = 5,
  mainlight = 6,
}

interface iItem extends iFeature {
  type: featureType.weapon | featureType.supportItem | featureType.technique;
  actionType?: actionType;
}

export interface iTrait extends iFeature {
  type: featureType.trait;
}

export enum weaponType {
  artifact,
  blade,
  bow,
  club,
  longarm,
  magitech,
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

export enum techniqueType {
  spell,
  skill,
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
