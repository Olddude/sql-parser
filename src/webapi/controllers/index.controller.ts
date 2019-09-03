import { BaseHttpController, httpGet, controller } from 'inversify-express-utils';
import { inject } from 'inversify';
import { HypermediaResource } from '../hypermedia/hal-resource';
import { SqlAstifyControllerRoute } from './sql-astify.controller';

export const IndexControllerRoute = '/';

@controller(IndexControllerRoute)
export class IndexController extends BaseHttpController {

  @inject('API_ROOT') private apiRoot: string;

  @httpGet('')
  private async get(): Promise<HypermediaResource> {
    return {
      _links: {
        self: {
          href: `${this.apiRoot}${IndexControllerRoute}`
        },
        astify: {
          href: `${this.apiRoot}${SqlAstifyControllerRoute}`,
          method: 'POST'
        }
      }
    };
  }
}
