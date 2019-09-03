import { HypermediaLinks } from './hal-links';

export interface HypermediaResource {
  readonly _links?: HypermediaLinks;
  readonly _embedded?: any;
}
