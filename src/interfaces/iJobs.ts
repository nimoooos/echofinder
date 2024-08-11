import type { iJobStats } from './iCharacterData';
import type { iFeature } from './iFeature';
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
  sourceLicense: jobClass[];
  baseStats: iJobStats;
  jobTraits: iTrait[];
  weaponSlots: itemSize[];
  supportSlots: itemSize[];
  limitBreak: iFeature;
}
