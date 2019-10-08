import { BaseHttpController, httpGet, controller } from 'inversify-express-utils';
import { inject } from 'inversify';
import { HypermediaResource } from '../hal/hal-resource';
import { SqlAstifyControllerRoute } from './sql-astify.controller';
import { TokenControllerRoute } from './token.controller';
import { UserControllerRoute } from './user.controller';

export const IndexControllerRoute = '/';

@controller(IndexControllerRoute)
export class IndexController extends BaseHttpController {

  @inject('API_ROOT') private apiRoot: string;

  @httpGet('', 'HalMiddleware')
  private async get(): Promise<HypermediaResource> {
    return {
      _links: {
        self: {
          href: `${this.apiRoot}${IndexControllerRoute}`
        },
        astify: {
          href: `${this.apiRoot}${SqlAstifyControllerRoute}`,
          method: 'POST',
          description: 'send a sql inside body like { "sql": "SELECT * FROM SOMEWHERE" }'
        },
        tokens: {
          href: `${this.apiRoot}${TokenControllerRoute}`
        },
        users: {
          href: `${this.apiRoot}${UserControllerRoute}`
        }
      }
    };
  }
}
