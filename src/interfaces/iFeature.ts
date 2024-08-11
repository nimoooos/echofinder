import type { actionType, phase } from './iAction';
import type { iStats } from './iCharacterData';
import type { iSupport, iTechnique, iTrait, iWeapon } from './iItem';

/**
 * Used for feature type. Feature is called "Ability" in game.
 */
export enum featureType {
  trait,
  weapon,
  supportItem,
  technique,
  limitBreak,
}

/**
 * basic feature with name, feature type, and rules text
 */
export interface iFeature {
  name: string;
  type: featureType | 'Trait' | 'Weapon' | 'Support Item' | 'Technique';
  text: string;
  tags?: {
    name: string;
    amount?: number;
  }[];
  actionData?: {
    actionType: actionType;
    phase: phase | phase[];
    reaction?: {
      trigger: string;
      effect: string;
    };
  };
  synergies?: any; //TODO: this is for things like "when you do X..."
  gainedActions?: (iFeature | iTrait | iWeapon | iSupport | iTechnique)[]; //new actions that get granted by this feature
  statBonus?: iStats; //how much bonus stats you gain
}
