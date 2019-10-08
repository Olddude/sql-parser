import { BaseHttpController, httpGet, controller } from 'inversify-express-utils';
import { inject } from 'inversify';
import { HypermediaResource, HalHelper } from '../hal/hal-resource';
import { TokenProvider } from '../../services/token-provider';
import { UserControllerRoute } from './user.controller';

export const TokenControllerRoute = '/tokens/';

@controller(TokenControllerRoute)
export class TokenController extends BaseHttpController {

  @inject('API_ROOT')
  private apiRoot: string;

  @inject('TokenProvider')
  private provider: TokenProvider;

  @httpGet('', 'HalMiddleware')
  async get(): Promise<HypermediaResource> {

    const results = await this.provider.data()
      .then(_ => _
        .map(token => token.toJSON() as any)
        .map(token => {
          let hypermediaToken = HalHelper.addLinks(token, {
            self: {
              href: `${this.apiRoot}${TokenControllerRoute}${token.guid}`
            }
          });
          if (token.userId) {
            hypermediaToken = HalHelper.addLinks(hypermediaToken, {
              owner: {
                href: `${this.apiRoot}${UserControllerRoute}${token.userId}`
              }
            });
          }
          return hypermediaToken;
        }));

    return {
      results,
      _links: {
        self: {
          href: `${this.apiRoot}${TokenControllerRoute}`
        }
      }
    };
  }
}
