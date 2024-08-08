interface iMoniker {
  name: string;
  title: string;
  pronouns: string;
}

interface iBasicInfo {
  level: number;
  ancestry: any; //TODO: should be custom interface
  job: any; //TODO: should be custom interface
}

interface iChosenStats {
  bulk: number;
  agility: number;
  mind: number;
  magic: number;
  ancestryTrait: any; //TODO: should be custom interface
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
