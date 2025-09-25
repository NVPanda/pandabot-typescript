import axios from 'axios';
import { AiProvider } from '../AiProvider';

export class DeepSeekProvider implements AiProvider {
  private apiKey = process.env.DEEPSEEK_API_KEY || '';
  private baseUrl = 'https://api.deepseek.com/v1/chat/completions';

  async generateText(prompt: string): Promise<string> {
    const response = await axios.post(this.baseUrl, {
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
    }, { headers: { Authorization: `Bearer ${this.apiKey}` } });
    return response.data.choices[0].message.content;
  }
}