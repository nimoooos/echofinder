export interface iRange {
  rangeType: 'Range' | 'Reach' | 'Blast' | 'Close Blast' | 'Burst' | 'Line' | 'Thrown';
  value: number | 'Scope';
}
