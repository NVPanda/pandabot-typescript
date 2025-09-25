import { WASocket, proto, GroupMetadata } from '@whiskeysockets/baileys';
import { sendText } from '../../utils/messageUtils';

interface Command {
  execute(sock: WASocket, message: proto.IWebMessageInfo): Promise<void>;
}

export class BanCommand implements Command {
  async execute(sock: WASocket, message: proto.IWebMessageInfo): Promise<void> {
    const from = message.key.remoteJid!;
    if (!from.endsWith('@g.us')) {
      await sendText(sock, from, 'Só em grupos.', message);
      return;
    }

    const metadata: GroupMetadata = await sock.groupMetadata(from);
    const sender = message.key.participant || from;

    if (metadata.owner !== sender) {
      await sendText(sock, from, 'Só owner pode banir.', message);
      return;
    }

    let target = message.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!target && message.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
      target = message.message.extendedTextMessage.contextInfo.quotedMessage.conversation ? message.message.extendedTextMessage.contextInfo.participant : undefined;
    }

    if (!target) {
      await sendText(sock, from, 'Mencione ou reply para banir.', message);
      return;
    }

    const botJid = sock.user?.id || '';
    if (target === metadata.owner || target === botJid) {
      await sendText(sock, from, 'Não pode banir owner ou bot.', message);
      return;
    }

    try {
      await sock.groupParticipantsUpdate(from, [target], 'remove');
      await sendText(sock, from, `${target} banido.`, message);
    } catch {
      await sendText(sock, from, 'Erro no ban.', message);
    }
  }
}