import { WASocket } from '@whiskeysockets/baileys';
import { WhatsAppConnection } from '../../core/WhatsAppConnection';

export class BaileysAdapter {
  public getSocket(): WASocket | null {
    return WhatsAppConnection.getInstance().getSocket();
  }
}