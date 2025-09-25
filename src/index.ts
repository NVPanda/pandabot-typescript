import 'reflect-metadata';
import { container } from 'inversify';
import { WhatsAppConnection } from './core/WhatsAppConnection';
import { Logger } from './core/Logger';
import { MessageService } from './application/MessageService';
import { TYPES } from './types'; // Defina symbols
import { UserRepository } from './infrastructure/repositories/UserRepository';
import { RentalService } from './application/RentalService';
import { AutoResponderRepository } from './infrastructure/repositories/AutoResponderRepository';
import nodeCron from 'node-cron';
import { Config } from './infrastructure/config/Config';

// DI setup
const container = new Container();
container.bind<MessageService>(TYPES.MessageService).to(MessageService);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<RentalService>(TYPES.RentalService).to(RentalService);
container.bind<AutoResponderRepository>(TYPES.AutoResponderRepository).to(AutoResponderRepository);
// Bind mais...

async function start() {
  await container.get(WhatsAppConnection).connect();
  // Cron para auto-update diário
  nodeCron.schedule('0 0 * * *', () => require('../scripts/update-baileys'));
  Logger.info('Pandabot iniciado!');
}

start().catch(Logger.error);