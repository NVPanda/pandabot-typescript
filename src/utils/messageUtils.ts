import { WASocket, AnyMessageContent } from '@whiskeysockets/baileys';

export async function sendText(sock: WASocket, jid: string, text: string, quoted?: any): Promise<void> {
  await sock.sendMessage(jid, { text }, { quoted });
}

// Mais: sendImage, sendSticker, etc.