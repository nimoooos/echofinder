export enum damageType {
  physical,
  force,
  astral,
  lunar,
  discord,
}

export interface iDamage {
  damageType: damageType;
  amount: number;
}
