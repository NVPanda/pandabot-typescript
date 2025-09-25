import { injectable, inject } from 'inversify';
import { proto } from '@whiskeysockets/baileys';
import { ProcessCommandUseCase } from '../domain/usecases/ProcessCommandUseCase';
import TYPES from '../types'; // DI symbols

@injectable()
export class CommandService {
  constructor(
    @inject(TYPES.ProcessCommandUseCase) private processUseCase: ProcessCommandUseCase
  ) {}

  public async process(message: proto.IWebMessageInfo): Promise<void> {
    await this.processUseCase.execute(message);
  }
}