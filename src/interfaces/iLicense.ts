/**
 * This is for classes, but I'm calling it license
 * to avoid reserved keyword issues
 * License is the term they use in Lancer
 */

import type { iSupport, iTechnique, iWeapon } from './iItem';
import type iJob from './iJobs';

export interface iLicense {
  name: string;
  jobs: iJob[]; //what jobs you unlock from the license
  unlocks: {
    1: (iWeapon | iSupport | iTechnique)[];
    2: (iWeapon | iSupport | iTechnique)[];
    3: (iWeapon | iSupport | iTechnique)[];
  };
}
