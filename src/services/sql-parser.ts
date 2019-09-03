import { Parser } from 'node-sql-parser';
import { injectable } from 'inversify';

@injectable()
export class SqlParser {
  private readonly parser: Parser;

  constructor() {
    this.parser = new Parser();
  }

  astify(sql: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.parser.astify(sql));
      } catch (e) {
        reject(e);
      }
    });
  }
}
