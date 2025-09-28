/**
 * Este arquivo index.ts substitui o antigo index.js da raiz do projeto.
 * Ele existe por compatibilidade com algumas hosts que esperam um arquivo principal chamado "index".
 *
 * 🎯 PROPÓSITO:
 * Fornecer um ponto de entrada limpo e estruturado para o Pandabot.
 *
 * 🧠 DICA PARA NOVATOS:
 * Se você já usou bots com milhares de linhas num único arquivo, sabe a dor que é encontrar um erro.
 * Aqui nós separamos o código em arquivos claros e organizados para facilitar a manutenção.
 *
 * ✅ COMANDOS ESTÃO EM: src/commands/
 * - admin/  → comandos administrativos
 * - member/ → comandos para membros comuns
 * - owner/  → comandos exclusivos para o dono
 *
 * ✅ MENU EM: src/menu.ts
 * ✅ IMAGEM DO BOT EM: assets/images/takeshi-bot.png
 *
 * Leia o guia completo em: https://github.com/guiireal/takeshi-bot?tab=readme-ov-file#instala%C3%A7%C3%A3o-no-termux-
 *
 * By: NVPanda
 *
 * ⚠️ Não edite nada abaixo sem saber o que está fazendo!
 */

import { connect } from './src/connection';
import { load } from './src/loader';
import { badMacHandler } from './src/utils/badMacHandler';
import {
  successLog,
  errorLog,
  warningLog,
  bannerLog,
  infoLog
} from './src/utils/logger';

// Tipagem de erros
type ErrorLike = Error & { message: string; stack?: string };

// Captura de exceções não tratadas
process.on('uncaughtException', (error: ErrorLike) => {
  if (badMacHandler.handleError(error, 'uncaughtException')) return;

  errorLog(`Erro crítico não capturado: ${error.message}`);
  errorLog(error.stack ?? '');

  if (
    !error.message.includes('ENOTFOUND') &&
    !error.message.includes('timeout')
  ) {
    process.exit(1);
  }
});

// Captura de promessas rejeitadas sem tratamento
process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
  if (badMacHandler.handleError(reason, 'unhandledRejection')) return;

  errorLog(`Promessa rejeitada não tratada:`, reason);
});

// Função principal do bot
async function startBot(): Promise<void> {
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    process.setMaxListeners(1500);

    bannerLog();
    infoLog('Iniciando meus componentes internos...');

    const stats = badMacHandler.getStats();
    if (stats.errorCount > 0) {
      warningLog(`BadMacHandler stats: ${stats.errorCount}/${stats.maxRetries} erros`);
    }

    const socket = await connect();

    load(socket);

    successLog('✅ Bot iniciado com sucesso!');

    // Verifica erros acumulados a cada 5 minutos
    setInterval(() => {
      const currentStats = badMacHandler.getStats();
      if (currentStats.errorCount > 0) {
        warningLog(`BadMacHandler stats: ${currentStats.errorCount}/${currentStats.maxRetries} erros`);
      }
    }, 300_000);
  } catch (error: any) {
    if (badMacHandler.handleError(error, 'bot-startup')) {
      warningLog('Erro Bad MAC durante inicialização, tentando novamente...');
      setTimeout(() => startBot(), 5000);
      return;
    }

    errorLog(`Erro ao iniciar o bot: ${error.message}`);
    errorLog(error.stack ?? '');
    process.exit(1);
  }
}

startBot();