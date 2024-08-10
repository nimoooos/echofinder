/**
 * This is for classes, but I'm calling it license
 * to avoid reserved keyword issues
 * License is the term they use in Lancer
 */

import type { iFeature } from './iFeature';
import type iJob from './iJobs';

export interface iLicense {
  name: string;
  jobs: iJob[]; //what jobs you unlock from the license
  unlocks: {
    1: iFeature[];
    2: iFeature[];
    3: iFeature[];
  };
}
