import type { iAction } from './iAction';
import type { iDerivedStats } from './iCharacterData';
import type { iSupport, iTrait, iWeapon } from './iItem';

export enum jobClass {
  Artillery,
  Controller,
  Defender,
  Striker,
  Support,
}

export default interface iJob {
  name: string;
  class: jobClass[];
  baseStats: iDerivedStats;
  jobTraits: iTrait[];
  weaponSlots: iWeapon[];
  supportSlots: iSupport[];
  limitBreak: iAction;
}
