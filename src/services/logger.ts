import { injectable } from 'inversify';

type LogLevel = 'TRACE' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL';

@injectable()
export class Logger {

  log(level: LogLevel, ...msgs: any[]) {
    const isoDate = new Date().toISOString();
    console.log(`[${level}] [${isoDate}]: ${JSON.stringify(msgs)}`);
  }

  trace(...msgs: any[]) {
    this.log('TRACE', msgs);
  }

  debug(...msgs: any[]) {
    this.log('DEBUG', msgs);
  }

  info(...msgs: any[]) {
    this.log('INFO', msgs);
  }

  warn(...msgs: any[]) {
    this.log('WARN', msgs);
  }

  error(...msgs: any[]) {
    this.log('ERROR', msgs);
  }

  fatal(...msgs: any[]) {
    this.log('FATAL', msgs);
  }

}
