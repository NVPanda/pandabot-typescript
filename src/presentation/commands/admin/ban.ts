import { WASocket, proto } from '@whiskeysockets/baileys';
import { sendText } from '../../utils/messageUtils';

export default async function banCommand(sock: WASocket, message: proto.IWebMessageInfo): Promise<void> {
  const from = message.key.remoteJid!;
  const mentioned = message.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];

  if (!mentioned) {
    await sendText(sock, from, 'Mencione o usuário para banir.', message);
    return;
  }

  // Valida se é admin (use metadata)
  // Lógica de ban: sock.groupParticipantsUpdate(from, [mentioned], 'remove')
  await sock.groupParticipantsUpdate(from, [mentioned], 'remove');
  await sendText(sock, from, `Usuário ${mentioned} banido.`, message);
}