import type { iDerivedStats } from './iCharacterData';

/**
 * used for feature type
 */
export enum featureType {
  trait,
  weapon,
  supportItem,
  action,
}

export interface iFeature {
  name: string;
  type: featureType;
  text: string;
}

export interface iTrait extends iFeature {
  action?: any; //TODO: iAction
  statBonus?: iDerivedStats;
}
