import { injectable } from 'inversify';
import { proto } from '@whiskeysockets/baileys';
import { WASocket } from '@whiskeysockets/baileys';
import { CommandFactoryImpl } from '../presentation/commands/FactoryCommand';
import { MenuService } from './MenuService';
import { Config } from '../infrastructure/config/Config';
import { AutoResponderRepository } from '../infrastructure/repositories/AutoResponderRepository';

@injectable()
export class MessageService {
  constructor(
    private autoRepo: AutoResponderRepository,
    private menuService: MenuService
  ) {}

  public async handle(message: proto.IWebMessageInfo, sock: WASocket): Promise<void> {
    const text = (message.message?.conversation || message.message?.extendedTextMessage?.text || '').toLowerCase();
    const prefix = Config.get('BOT_PREFIX') || '!';

    // Auto-responder (do original JSON)
    const rule = await this.autoRepo.findByTrigger(text);
    if (rule) {
      await sock.sendMessage(message.key.remoteJid!, { text: rule.response });
      return;
    }

    if (text.startsWith(prefix + 'menu')) {
      await this.menuService.showMenu(sock, message.key.remoteJid!, message);
      return;
    }

    if (text.startsWith(prefix)) {
      const factory = new CommandFactoryImpl();
      const commandName = text.slice(prefix.length).split(' ')[0];
      const command = factory.create(commandName);
      if (command) {
        await command.execute(sock, message);
      } else {
        await sock.sendMessage(message.key.remoteJid!, { text: 'Comando não encontrado. Use !menu.' });
      }
    }
  }
}