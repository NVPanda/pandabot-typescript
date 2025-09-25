import { proto } from '@whiskeysockets/baileys';
import { CommandService } from '../../application/CommandService';

export class ProcessCommandUseCase {
  constructor(private commandService: CommandService) {}

  public async execute(message: proto.IWebMessageInfo): Promise<void> {
    await this.commandService.process(message);
  }
}