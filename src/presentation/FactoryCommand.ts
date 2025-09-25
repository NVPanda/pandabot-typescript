import { WASocket, proto } from '@whiskeysockets/baileys';
import { Command } from '../../domain/entities/Command'; // Interface: { execute(sock: WASocket, message: proto.IWebMessageInfo): Promise<void>; }

export interface CommandFactory {
  create(name: string): Command | null;
}

export class CommandFactoryImpl implements CommandFactory {
  private commands = new Map<string, () => Command>();

  constructor() {
    // Lazy: register on demand, mas aqui exemplos
    this.commands.set('ban', () => new BanCommand());
    this.commands.set('sticker', () => new StickerCommand());
    // Adicione mais do original: add, promote, etc.
  }

  public create(name: string): Command | null {
    const creator = this.commands.get(name);
    return creator ? creator() : null;
  }
}

// Exemplo genérico para 24 em member/examples/
class ExampleCommand implements Command {
  async execute(sock: WASocket, message: proto.IWebMessageInfo): Promise<void> {
    // Lógica específica
  }
}