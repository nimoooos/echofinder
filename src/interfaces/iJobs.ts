import type { iJobStats } from './iCharacterData';
import type { iFeature } from './iFeature';
import type { iSlot, iTrait } from './iItem';

export enum JobClass {
  Artillery,
  Controller,
  Defender,
  Striker,
  Support,
}

export default interface iJob {
  name: string;
  sourceLicense: JobClass[];
  baseStats: iJobStats;
  jobTraits: iTrait[];
  weaponSlots: iSlot[];
  supportSlots: iSlot[];
  limitBreak: iFeature;
}
