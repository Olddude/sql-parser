import { HypermediaLink } from './hal-link';

export interface HypermediaLinks {
  [key: string]: HypermediaLink;
  self: HypermediaLink;
}
