import axios from 'axios';
import { AiProvider } from '../AiProvider';

export class PixabayProvider implements AiProvider {
  private apiKey = process.env.PIXABAY_API_KEY || '';
  private baseUrl = 'https://pixabay.com/api/';

  async generateText(_prompt: string): Promise<string> {
    throw new Error('Use generateImage para Pixabay');
  }

  async generateImage(query: string): Promise<string> {
    const response = await axios.get(this.baseUrl, {
      params: { key: this.apiKey, q: query, image_type: 'photo' },
    });
    return response.data.hits[0]?.webformatURL || 'No image';
  }
}