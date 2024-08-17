/**
 * Used for feature type. Feature is called "Ability" in game.
 */
import type { ActionType, Phase } from './iAction';
import type { iStats } from './iCharacterData';
import type { iSupport, iTechnique, iTrait, iWeapon } from './iItem';

/**
 * basic feature with name, feature type, and rules text
 */
export interface iFeature {
  name: string;
  type: 'Trait' | 'Weapon' | 'Support Item' | 'Technique' | 'Limit Break';
  text: string;
  itemSize?: 'Light' | 'Main' | 'Heavy';
  tags?: {
    name: string;
    amount?: number;
  }[];
  actionData?: {
    actionType: ActionType;
    phase: Phase | Phase[];
    reaction?: {
      trigger: string;
      effect: string;
    };
  };
  synergies?: any; //TODO: this is for things like "when you do X..."
  gainedActions?: (iFeature | iTrait | iWeapon | iSupport | iTechnique)[]; //new actions that get granted by this feature
  statBonus?: iStats; //how much bonus stats you gain
}
