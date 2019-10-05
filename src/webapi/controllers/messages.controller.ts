import { BaseHttpController, httpGet, controller } from 'inversify-express-utils';
import { inject } from 'inversify';
import { HypermediaResource } from '../hal/hal-resource';
import { MessagesProvider } from '../../services/messages-provider';

export const MessagesControllerRoute = '/messages/';

@controller(MessagesControllerRoute)
export class MessagesController extends BaseHttpController {

  @inject('API_ROOT')
  private apiRoot: string;

  @inject('MessagesProvider')
  private provider: MessagesProvider;

  @httpGet('', 'HalMiddleware')
  private async get(): Promise<HypermediaResource> {
    return {
      _embedded: {
        messages: await this.provider.getMessages()
      },
      _links: {
        self: {
          href: `${this.apiRoot}${MessagesControllerRoute}`
        }
      }
    };
  }
}
