import { type iDerivedStats } from './iCharacterData';

export default interface iTraits {
  name: string;
  text: string;
  action?: any; //TODO: iAction
  statBonus?: iDerivedStats;
}
