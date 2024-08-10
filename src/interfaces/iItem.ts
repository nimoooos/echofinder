import type { actionType } from './iAction';
import type { featureType, iFeature } from './iFeature';

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

export interface iAttackProfile {
  range: any; //TODO: create iRange. Should be reach, range, line, blast, close blast, burst, etc. and number or "scope".
  damage: string; //TODO: make iDamage for damage amount and type
}

export interface iTrait extends iFeature {
  type: featureType.trait;
}

export interface iWeapon extends iItem {
  attackProfiles: iAttackProfile[];
  weaponSize: itemSize;
  weaponType: any[]; //TODO: iWeaponType for things like melee, ranged, bow, magitech, etc.
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
