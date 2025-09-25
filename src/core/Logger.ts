export class Logger {
  public static info(message: string): void {
    console.log(`[INFO] ${new Date().toISOString()}: ${message}`);
  }

  public static error(message: string): void {
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}`);
  }

  public static warn(message: string): void {
    console.warn(`[WARN] ${new Date().toISOString()}: ${message}`);
  }
}