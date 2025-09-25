import { WASocket } from '@whiskeysockets/baileys';
import { sendText } from '../presentation/utils/messageUtils';

export class MenuService {
  public async showMenu(sock: WASocket, from: string, message: any): Promise<void> {
    const menu = `
*Pandabot Menu*
• !ban @user (owner)
• !sticker (member)
• !alugar (rental)
• !loja (store)
• !ia <provider> "<query>" (VIP)
    `;
    await sendText(sock, from, menu, message);
  }
}