import axios from 'axios';
import { AiProvider } from '../AiProvider';

export class FluxProvider implements AiProvider {
  private apiKey = process.env.FLUX_API_KEY || '';
  private baseUrl = 'https://api.together.xyz/v1/images/generations'; // Via Together

  async generateText(_prompt: string): Promise<string> {
    throw new Error('Use generateImage para Flux');
  }

  async generateImage(prompt: string): Promise<string> {
    const response = await axios.post(this.baseUrl, {
      model: 'black-forest-labs/FLUX.1-dev',
      prompt,
      width: 1024,
      height: 1024,
    }, { headers: { Authorization: `Bearer ${this.apiKey}` } });
    return response.data.data[0].url;
  }
}