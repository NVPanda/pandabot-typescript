export class Config {
  public static get(key: string): string {
    return process.env[key] || '';
  }
}