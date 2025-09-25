import axios from 'axios';
import { AiProvider } from '../AiProvider';

export class ClaudeProvider implements AiProvider {
  private apiKey = process.env.CLAUDE_API_KEY || '';
  private baseUrl = 'https://api.anthropic.com/v1/messages';

  async generateText(prompt: string): Promise<string> {
    const response = await axios.post(this.baseUrl, {
      model: 'claude-3-opus-20240229',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    }, { headers: { 'x-api-key': this.apiKey, 'anthropic-version': '2023-06-01' } });
    return response.data.content[0].text;
  }
}