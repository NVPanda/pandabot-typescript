import axios from 'axios';
import { AiProvider } from '../AiProvider';

export class MetaProvider implements AiProvider {
  private apiKey = process.env.META_API_KEY || '';
  private baseUrl = 'https://graph.facebook.com/v18.0/me/messages'; // Exemplo via FB API para Llama

  async generateText(prompt: string): Promise<string> {
    const response = await axios.post(this.baseUrl, {
      model: 'llama-2-70b-chat',
      messages: [{ role: 'user', content: prompt }],
    }, { headers: { Authorization: `Bearer ${this.apiKey}` } });
    return response.data.choices[0].message.content;
  }
}