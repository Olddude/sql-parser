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

    this.httpContext.response.setHeader('Content-Type', 'application/hal+json');

    const self = { href: `${this.apiRoot}${SqlAstifyControllerRoute}`, method: 'POST' };

    if (this.httpContext.request.header('Content-Type') !== 'application/json') {
      return Promise.resolve({
        errors: ['request content type must be application/json'],
        _links: { self }
      });
    }

    if (!this.httpContext.request.body || !this.httpContext.request.body.sql) {
      return Promise.resolve({
        errors: ['sql is not defined in request body'],
        _links: { self }
      });
    }

    return this.sqlParser.astify(this.httpContext.request.body.sql)
      .then(_ => ({ result: _, _links: { self } }))
      .catch(_ => ({ errors: [_.toString()], _links: { self } }));
  }
}
