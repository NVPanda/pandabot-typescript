import axios from 'axios';
import { AiProvider } from '../AiProvider';

export class GrokProvider implements AiProvider {
  private apiKey = process.env.GROK_API_KEY || '';
  private baseUrl = 'https://api.x.ai/v1/chat/completions';

  async generateText(prompt: string): Promise<string> {
    const response = await axios.post(this.baseUrl, {
      model: 'grok-beta',
      messages: [{ role: 'user', content: prompt }],
    }, { headers: { Authorization: `Bearer ${this.apiKey}` } });
    return response.data.choices[0].message.content;
  }
}