import { HypermediaLinks } from './hal-links';
import { HypermediaLink } from './hal-link';

export interface HypermediaResource {
  readonly [key: string]: any;
  readonly _links?: HypermediaLinks;
  readonly _embedded?: any;
}

export class HalHelper {
  static addLinks(hal: HypermediaResource, links: HypermediaLinks): HypermediaResource {
    return { ...hal, _links: { ...hal._links, ...links } };
  }

  private constructor() { }
}
