import { HypermediaLink } from './hal-link';

export interface HypermediaLinks {
  readonly [key: string]: HypermediaLink | HypermediaLink[];
}
