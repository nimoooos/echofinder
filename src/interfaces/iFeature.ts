import type { iStats } from './iCharacterData';

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

/**
 * basic feature with name, feature type, and rules text
 */
export interface iFeature {
  name: string;
  type: featureType;
  text: string;
  tags?: [
    {
      name: string;
      amount?: number;
    },
  ];
  synergies?: any; //TODO: this is for things like "when you do X..."
  gainedAction?: iFeature[]; //new actions that get granted by this feature
  statBonus?: iStats; //how much bonus stats you gain
}
