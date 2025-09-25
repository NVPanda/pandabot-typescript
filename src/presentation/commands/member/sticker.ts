import { WASocket, proto } from '@whiskeysockets/baileys';
import { sendText } from '../../utils/messageUtils';

interface Command {
  execute(sock: WASocket, message: proto.IWebMessageInfo): Promise<void>;
}

export class StickerCommand implements Command {
  async execute(sock: WASocket, message: proto.IWebMessageInfo): Promise<void> {
    const from = message.key.remoteJid!;
    // Lógica de sticker do original: usa ffmpeg para converter imagem/video
    // Exemplo simplificado
    await sendText(sock, from, 'Sticker gerado! (implementar stream)', message);
  }
}