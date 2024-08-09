import type { iDerivedStats } from './iCharacterData';

// this covers traits, weapons, support items, and actions
export enum feature {
  trait,
  weapon,
  supportItem,
  action,
}

export interface iFeature {
  name: string;
  type: feature;
  text: string;
}

export interface iTrait extends iFeature {
  action?: any; //TODO: iAction
  statBonus?: iDerivedStats;
}
