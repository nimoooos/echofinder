import type { iJobStats } from './iCharacterData';
import type { iFeature } from './iFeature';
import type { SlotSize, iTrait } from './iItem';

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
  weaponSlots: SlotSize[];
  supportSlots: SlotSize[];
  limitBreak: iFeature;
}
