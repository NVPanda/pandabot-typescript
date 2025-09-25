import { WASocket, AnyMessageContent } from '@whiskeysockets/baileys';

export const messageUtils = {
  async sendText(sock: WASocket, jid: string, text: string, quoted?: any): Promise<void> {
    const content: AnyMessageContent = { text };
    if (quoted) content.quoted = quoted;
    await sock.sendMessage(jid, content);
  },

  // Mais: sendImage, sendSticker com FFmpeg stream para otimização
};