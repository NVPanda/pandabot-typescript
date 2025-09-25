import { injectable } from 'inversify';
import { AiProvider } from './AiProvider';
import { GrokProvider } from './providers/GrokProvider';
import { ClaudeProvider } from './providers/ClaudeProvider';
import { GeminiProvider } from './providers/GeminiProvider';
import { DeepSeekProvider } from './providers/DeepSeekProvider';
import { MetaProvider } from './providers/MetaProvider';
import { PixabayProvider } from './providers/PixabayProvider';
import { FluxProvider } from './providers/FluxProvider';

@injectable()
export class AiProviderFactory {
  private providers: Map<string, () => AiProvider> = new Map();

  constructor() {
    this.providers.set('grok', () => new GrokProvider());
    this.providers.set('claude', () => new ClaudeProvider());
    this.providers.set('gemini', () => new GeminiProvider());
    this.providers.set('deepseek', () => new DeepSeekProvider());
    this.providers.set('meta', () => new MetaProvider());
    this.providers.set('pixabay', () => new PixabayProvider());
    this.providers.set('flux', () => new FluxProvider());
  }

  public create(name: string): AiProvider {
    const creator = this.providers.get(name.toLowerCase());
    if (!creator) throw new Error(`Provider ${name} não suportado`);
    return creator();
  }
}