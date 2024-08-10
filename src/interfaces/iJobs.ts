import type { iAction } from './iAction';
import type { iDerivedStats } from './iCharacterData';
import type { itemSize, iTrait } from './iItem';

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
  weaponSlots: itemSize[];
  supportSlots: itemSize[];
  limitBreak: iAction;
}
