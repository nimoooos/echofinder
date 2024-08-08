import type iTraits from './iTraits';

export default interface iAncestry {
  name: string;
  size: 0.5 | 1 | 2 | 3 | 4 | 5;
  traits: iTraits[];
}
