export interface iRange {
  type: 'Range' | 'Reach' | 'Blast' | 'Close Blast' | 'Burst' | 'Line' | 'Thrown';
  value: number | 'Scope';
}
