import { ancestry, ancestryTrait } from '@/data/ancestriesData';
import type iAncestry from './iAncestry';
import { featureType, type iFeature } from './iFeature';
import type iJob from './iJobs';
import { job } from '@/data/jobsData';
import type { iAction } from './iAction';
import type { iSupport, iTechnique, iTrait, iWeapon } from './iItem';

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

/**
 * All bamm and attributes, required
 */
export interface iDerivedStats extends iStats {
  bulk: number;
  agility: number;
  mind: number;
  magic: number;
  grit: number;
  size: number;
  scope: number;
  armor: number;
  memory: number;
  saveTarget: number;
  hp: number;
  stress: number;
  mp: number;
  recoveries: number;
  speed: number;
  dodge: number;
  adef: number;
}

/**
 * All bamm and attributes, optional fields. Useful for bonus stats
 */
export interface iStats {
  bulk?: number;
  agility?: number;
  mind?: number;
  magic?: number;
  grit?: number;
  size?: number;
  scope?: number;
  armor?: number;
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

/**
 * All attributes provided by the job
 */
export interface iJobStats extends iStats {
  scope: number;
  memory: number;
  saveTarget: number;
  hp: number;
  stress: number;
  mp: number;
  recoveries: number;
  speed: number;
  dodge: number;
  adef: number;
}

export interface iCharacterData {
  moniker: iMoniker;
  basicInfo: iBasicInfo;
  chosenStats: iChosenStats;
  derivedStats: iDerivedStats;
  loadout: {
    traits: iTrait[];
    weaponSlots: iWeapon[];
    supportSlots: iSupport[];
    techniques: iTechnique[];
    talents: any[]; //TODO: make iTalent
  };
  features: {
    passives: iFeature[];
    actives: iAction[];
  };
}

export const blankCharData: iCharacterData = {
  moniker: { name: '', title: '', pronouns: '' },
  basicInfo: { level: 1, ancestry: ancestry(''), job: job('') },
  chosenStats: { bulk: 0, agility: 0, mind: 0, magic: 0, ancestryTrait: { name: '', type: featureType.trait, text: '' } },
  derivedStats: {
    bulk: 0,
    agility: 0,
    mind: 0,
    magic: 0,
    grit: 0,
    size: 0,
    armor: 0,
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
  loadout: {
    traits: [],
    weaponSlots: [],
    supportSlots: [],
    techniques: [],
    talents: [],
  },
  features: {
    passives: [],
    actives: [],
  },
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
    mind: 1,
    magic: 1,
    ancestryTrait: ancestryTrait(ancestry('Elf'), 'Elven Accuracy'),
  },
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
    armor: 0,
  },
  loadout: {
    traits: [],
    weaponSlots: [],
    supportSlots: [],
    techniques: [], //TODO: exobomb, scar
    talents: [], //TODO: Archmage 1, Enchanter 1, Leyline Walker 1
  },
  features: {
    passives: [],
    actives: [],
  },
};
