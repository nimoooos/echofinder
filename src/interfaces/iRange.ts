export interface iRange {
  rangeType: rangeType;
  amount: number | 'scope';
}

export enum rangeType {
  range,
  reach,
  blast,
  closeBlast,
  burst,
  line,
  thrown,
}
