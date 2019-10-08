import { BaseHttpController, httpGet, controller } from 'inversify-express-utils';
import { inject } from 'inversify';
import { HypermediaResource, HalHelper } from '../hal/hal-resource';
import { UserProvider } from '../../services/user-provider';
import { TokenControllerRoute } from './token.controller';

export const UserControllerRoute = '/users/';

@controller(UserControllerRoute)
export class UserController extends BaseHttpController {

  @inject('API_ROOT')
  private apiRoot: string;

  @inject('UserProvider')
  private provider: UserProvider;

  @httpGet('', 'HalMiddleware')
  async get(): Promise<HypermediaResource> {

    const results = await this.provider.data()
      .then(_ => _
        .map(user => user.toJSON() as any)
        .map(user => HalHelper.addLinks(user, {
          'self': {
            href: `${this.apiRoot}${UserControllerRoute}${user.id}`
          },
          'owned-tokens': {
            href: `${this.apiRoot}${UserControllerRoute}${user.id}${TokenControllerRoute}`
          }
        }))
      );

    return {
      results,
      _links: {
        self: {
          href: `${this.apiRoot}${UserControllerRoute}`
        }
      }
    };

  }
}
