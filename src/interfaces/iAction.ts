export enum ActionType {
  none = -1, // for features with no action associated
  stdMove = 0.1,
  minor = 0.2,
  free = 0.3,
  special = 0.4,
  reaction = 0.5,
  ready = 0.6,
  defend = 1.1,
  refresh = 1.2,
  channel = 2,
  mark = 3.1,
  search = 3.2,
  volley = 3.3,
  rush = 4.1,
  hide = 4.2,
  fight = 5.1,
  shove = 5.2,
  grapple = 5.3,
  release = 6,
  fullAttack = 7,
  delay = 8,
}

export enum Phase {
  any = phaseNameToNumber('any'),
  bolster = phaseNameToNumber('bolster'),
  channel = phaseNameToNumber('channel'),
  skirmish = phaseNameToNumber('skirmish'),
  reposition = phaseNameToNumber('reposition'),
  brawl = phaseNameToNumber('brawl'),
  release = phaseNameToNumber('release'),
  fullAttack = phaseNameToNumber('fullAttack'),
  delay = phaseNameToNumber('delay'),
}

/**
 * convert phase number to phase name
 * @param phaseNumber order of phase (1, 2, 3...)
 * @returns name of phase (0 returns 'any')
 */
export function phaseNumberToName(phaseNumber: number) {
  const phaseIndex = ['any', 'bolster', 'channel', 'skirmish', 'reposition', 'brawl', 'release', 'fullAttack', 'delay'];
  return phaseIndex[phaseNumber];
}

/**
 * convert phase name to phase number
 * @param phaseName name of the phase (bolster, channel, skirmish...)
 * @returns phase number ('any' returns 0)
 */
export function phaseNameToNumber(phaseName: string) {
  const phaseIndex = ['any', 'bolster', 'channel', 'skirmish', 'reposition', 'brawl', 'release', 'fullAttack', 'delay'];
  return phaseIndex.indexOf(phaseName);
}

/**
 * convert action enum to phase number
 * @param action ActionType enum
 * @returns phase number of the chosen action
 */
export function actionToPhaseNumber(action: ActionType) {
  return Math.floor(action);
}
