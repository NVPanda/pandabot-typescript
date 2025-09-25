import makeWASocket, { DisconnectReason, useMultiFileAuthState, WASocket } from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import { Logger } from './Logger';
import { MessageService } from '../application/MessageService';

export class WhatsAppConnection {
  private static instance: WhatsAppConnection;
  private sock: WASocket | null = null;

  private constructor() {}

  public static getInstance(): WhatsAppConnection {
    if (!WhatsAppConnection.instance) {
      WhatsAppConnection.instance = new WhatsAppConnection();
    }
    return WhatsAppConnection.instance;
  }

  public async connect(): Promise<void> {
    const { state, saveCreds } = await useMultiFileAuthState('./database/auth_info_baileys');
    this.sock = makeWASocket({
      auth: state,
      printQRInTerminal: true,
      generateHighQualityLinkPreview: true,
    });

    this.sock.ev.on('creds.update', saveCreds);

    this.sock.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect } = update;
      if (connection === 'close') {
        const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
        Logger.error(`Conexão fechada devido a: ${lastDisconnect?.error?.toString()}`);
        if (shouldReconnect) {
          this.connect();
        }
      } else if (connection === 'open') {
        Logger.info('Pandabot conectado ao WhatsApp!');
      }
    });

    // Observer para mensagens (evoluído do original messages.js)
    this.sock.ev.on('messages.upsert', async ({ messages }) => {
      const message = messages[0];
      if (!message.key.fromMe && message.message) {
        await new MessageService().handle(message, this.sock);
      }
    });
  }

  public getSocket(): WASocket | null {
    return this.sock;
  }
}