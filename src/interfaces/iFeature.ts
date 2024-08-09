import type { iDerivedStats } from './iCharacterData';

/**
 * Used for feature type. Feature is called "Ability" in game.
 */
export enum featureType {
  trait,
  weapon,
  supportItem,
  technique,
  action,
}

export enum actionType {
  none = -1, // for features with no action associated
  stdMove = 0.1,
  minor = 0.2,
  free = 0.3,
  special = 0.4,
  reaction = 0.5,
  ready = 0.6,
  defend = 1.1,
  refresh = 1.2,
  channel = 2,
  mark = 3.1,
  search = 3.2,
  volley = 3.3,
  rush = 4.1,
  hide = 4.2,
  fight = 5.1,
  shove = 5.2,
  grapple = 5.3,
  release = 6,
  fullAttack = 7,
  delay = 8,
}

export enum phase {
  any = phaseNameToNumber('any'),
  bolster = phaseNameToNumber('bolster'),
  channel = phaseNameToNumber('channel'),
  skirmish = phaseNameToNumber('skirmish'),
  reposition = phaseNameToNumber('reposition'),
  brawl = phaseNameToNumber('brawl'),
  release = phaseNameToNumber('release'),
  fullAttack = phaseNameToNumber('fullAttack'),
  delay = phaseNameToNumber('delay'),
}

/**
 * convert phase number to phase name
 * @param phaseNumber order of phase (1, 2, 3...)
 * @returns name of phase (0 returns 'any')
 */
export function phaseNumberToName(phaseNumber: number) {
  const phaseIndex = ['any', 'bolster', 'channel', 'skirmish', 'reposition', 'brawl', 'release', 'fullAttack', 'delay'];
  return phaseIndex[phaseNumber];
}

/**
 * convert phase name to phase number
 * @param phaseName name of the phase (bolster, channel, skirmish...)
 * @returns phase number ('any' returns 0)
 */
export function phaseNameToNumber(phaseName: string) {
  const phaseIndex = ['any', 'bolster', 'channel', 'skirmish', 'reposition', 'brawl', 'release', 'fullAttack', 'delay'];
  return phaseIndex.indexOf(phaseName);
}

/**
 * convert action enum to phase number
 * @param action actionType enum
 * @returns phase number of the chosen action
 */
export function actionToPhaseNumber(action: actionType) {
  return Math.floor(action);
}

/**
 * basic feature with name, feature type, and rules text
 */
export interface iFeature {
  name: string;
  type: featureType;
  text: string;
  synergies?: any; //TODO: this is for things like "when you do X..."
  gainedAction?: any | iFeature[]; //new actions that get granted by this feature //TODO: only iFeature[]
  statBonus?: iDerivedStats; //how much stat you gain
}

export interface iTrait extends iFeature {
  type: featureType.trait;
}

export interface iAttackProfile {
  range: any; //TODO: create iRange. Should be reach, range, line, blast, close blast, burst, etc. and number or "scope".
  damage: string; //TODO: make iDamage for damage amount and type
}

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
  itemType: any; //TODO: make enum for weapon, support, technique
  tags?: any[]; //TODO: make iTags
  actionType?: actionType;
}

export interface iWeapon extends iItem {
  attackProfiles: iAttackProfile[];
  weaponSize: itemSize;
  weaponType: any[]; //TODO: iWeaponType for things like melee, ranged, bow, magitech, etc.
}

export interface iSupport extends iItem {
  supportSize: itemSize;
}

export interface iTechnique extends iItem {
  techniqueType: any; //spell or skill?
  memoryCost: number; //memory cost
  attackProfiles?: iAttackProfile[];
}
