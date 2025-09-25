import axios from 'axios';
import { AiProvider } from '../AiProvider';

export class GeminiProvider implements AiProvider {
  private apiKey = process.env.GEMINI_API_KEY || '';
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + this.apiKey;

  async generateText(prompt: string): Promise<string> {
    const response = await axios.post(this.baseUrl, {
      contents: [{ parts: [{ text: prompt }] }],
    });
    return response.data.candidates[0].content.parts[0].text;
  }
}