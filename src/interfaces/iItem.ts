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

/**
 * for weapon, support, or technique
 */
interface iItem extends iFeature {
  type: featureType.weapon | featureType.supportItem | featureType.technique;
  tags?: any[]; //TODO: make iTags
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
  melee,
  ranged,
}

export interface iWeapon extends iItem {
  attackProfiles: iAttackProfile[];
  weaponSize: itemSize;
  weaponType: weaponType[];
}

export interface iSupport extends iItem {
  supportSize: itemSize;
}

export enum techniqueType {
  spell,
  skill,
}

export interface iTechnique extends iItem {
  techniqueType: techniqueType;
  memoryCost: number;
  attackProfiles?: iAttackProfile[];
}

export interface iAttackProfile {
  range?: iRange;
  damage?: iDamage;
}
