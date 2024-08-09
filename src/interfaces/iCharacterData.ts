import { ancestry } from '@/data/ancestriesData';
import type iAncestry from './iAncestry';
import type iTrait from './iTraits';

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
  ancestryTrait: iTrait;
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

export interface iCharacterData {
  moniker: iMoniker;
  basicInfo: iBasicInfo;
  chosenStats: iChosenStats;
  derivedStats: iDerivedStats;
  loadout: any;
}

export const blankCharData: iCharacterData = {
  moniker: { name: '', title: '', pronouns: '' },
  basicInfo: { level: 1, ancestry: ancestry(''), job: null },
  chosenStats: { bulk: 0, agility: 0, mind: 0, magic: 0, ancestryTrait: { name: '', text: '' } },
  derivedStats: {
    bulk: 0,
    agility: 0,
    mind: 0,
    magic: 0,
    size: 0,
    grit: 0,
    scope: 0,
    memory: 0,
    saveTarget: 0,
    hp: 0,
    stress: 0,
    mp: 0,
    recoveries: 0,
    speed: 0,
    dodge: 0,
    adef: 0,
  },
  loadout: null,
};
