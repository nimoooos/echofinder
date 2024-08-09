import { ancestry, ancestryTrait } from '@/data/ancestriesData';
import type iAncestry from './iAncestry';
import type { iTrait } from './iFeature';
import { featureType } from './iFeature';
import type iJob from './iJobs';
import { job } from '@/data/jobsData';

interface iMoniker {
  name: string;
  title: string;
  pronouns: string;
}

interface iBasicInfo {
  level: number;
  ancestry: iAncestry;
  job: iJob;
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
  chosenStats: { bulk: 0, agility: 0, mind: 0, magic: 0, ancestryTrait: { name: '', type: featureType.trait, text: '' } },
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

export const defaultCharData: iCharacterData = {
  moniker: {
    name: 'Dhalia',
    title: 'the All-Knowing',
    pronouns: 'she/her',
  },
  basicInfo: {
    level: 1,
    ancestry: ancestry('Elf'),
    job: job('Equinox'),
  },
  chosenStats: {
    bulk: 0,
    agility: 0,
    mind: 0,
    magic: 0,
    ancestryTrait: ancestryTrait(ancestry('Elf'), 'Elven Accuracy'),
  },
  derivedStats: {
    bulk: 0,
    agility: 0,
    mind: 0,
    magic: 0,
    size: 1,
    grit: 1,
    scope: 12,
    memory: 8,
    saveTarget: 12,
    hp: 7,
    stress: 6,
    mp: 5,
    recoveries: 3,
    speed: 4,
    dodge: 6,
    adef: 11,
  },
  loadout: {
    traits: [],
    weaponSlots: [],
    supportSlots: [],
    techniques: [],
    talents: [],
    actions: [],
  },
};
