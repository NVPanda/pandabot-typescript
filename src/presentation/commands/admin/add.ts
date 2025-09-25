// Exemplo recriado do original admin
import { WASocket, proto } from '@whiskeysockets/baileys';
import { sendText } from '../../utils/messageUtils';

interface Command {
  execute(sock: WASocket, message: proto.IWebMessageInfo): Promise<void>;
}

export class AddCommand implements Command {
  async execute(sock: WASocket, message: proto.IWebMessageInfo): Promise<void> {
    // Adicionar membro ao grupo
    await sendText(sock, message.key.remoteJid!, 'Membro adicionado.', message);
  }
}