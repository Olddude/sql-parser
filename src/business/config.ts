export interface Config {
  db: {
    server: string,
    database: string,
    user: string
  };
  api: {
    protocol: string,
    host: string,
    rootPath: string
  };
}
