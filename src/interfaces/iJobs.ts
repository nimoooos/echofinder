import type { iDerivedStats } from './iCharacterData';
import type { iTrait } from './iFeature';

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
  weaponSlots: any[]; //TODO: make iWeapon
  supportSlots: any[]; //TODO: make iSupport
  limitBreak: any; //TODO: make iAction
}
