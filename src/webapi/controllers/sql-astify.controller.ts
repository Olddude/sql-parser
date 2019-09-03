import { BaseHttpController, controller, httpPost } from 'inversify-express-utils';
import { inject } from 'inversify';
import { HypermediaResource } from '../hypermedia/hal-resource';
import { SqlParser } from '../../services/sql-parser';

export const SqlAstifyControllerRoute = '/astify/';

@controller(SqlAstifyControllerRoute)
export class SqlAstifyControllerController extends BaseHttpController {

  @inject('API_ROOT') private apiRoot: string;
  @inject('SqlParser') private sqlParser: SqlParser;

  @httpPost('')
  private post(): Promise<HypermediaResource> {

    const sql = this.httpContext.request.body.q;

    const self = { href: `${this.apiRoot}${SqlAstifyControllerRoute}`, method: 'POST' };

    return this.sqlParser.astify(sql)
      .then(_ => ({ result: _, _links: { self } }))
      .catch(_ => ({ errors: [_.toString()], _links: { self } }));
  }
}
