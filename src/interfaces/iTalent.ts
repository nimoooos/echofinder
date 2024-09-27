export interface iTalentTree {
  name: string;
  points?: number; //how much points are invested
  talents: {
    1: iTalent;
    2: iTalent;
    3: iTalent;
  };
}

export interface iTalent {
  rank: number;
  name: string;
  text: string;
}
