export interface AiProvider {
  generateText(prompt: string): Promise<string>;
  generateImage?(prompt: string): Promise<string>;
}