import type iAncestry from './iAncestry';
import type iTraits from './iTraits';

interface iMoniker {
  name: string;
  title: string;
  pronouns: string;
}

interface iBasicInfo {
  level: number;
  ancestry: iAncestry;
  job: any; //TODO: should be custom interface
}

interface iChosenStats {
  bulk: number;
  agility: number;
  mind: number;
  magic: number;
  ancestryTrait: iTraits;
}

export interface iDerivedStats {
  bulk?: number;
  agility?: number;
  mind?: number;
  magic?: number;
  size?: number;
  grit?: number;
  scope?: number;
  memory?: number;
  saveTarget?: number;
  hp?: number;
  stress?: number;
  mp?: number;
  recoveries?: number;
  speed?: number;
  dodge?: number;
  adef?: number;
}

export default interface iCharacterData {
  moniker: iMoniker;
  basicInfo: iBasicInfo;
  chosenStats: iChosenStats;
  derivedStats: iDerivedStats;
  loadout: any;
}
