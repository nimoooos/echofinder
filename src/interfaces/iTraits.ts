import { type iDerivedStats } from './iCharacterData';

export default interface iTrait {
  name: string;
  text: string;
  action?: any; //TODO: iAction
  statBonus?: iDerivedStats;
}
