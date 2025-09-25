import { WASocket } from '@whiskeysockets/baileys';
import { messageUtils } from '../../presentation/utils/messageUtils'; // DIP

export class SendMessageUseCase {
  public async execute(sock: WASocket, jid: string, text: string, quoted?: any): Promise<void> {
    await messageUtils.sendText(sock, jid, text, quoted);
  }
}