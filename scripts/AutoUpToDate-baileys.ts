import axios from 'axios';
import { execSync } from 'child_process';
import { Logger } from '../src/core/Logger';

async function updateBaileys(): Promise<void> {
  try {
    const { data } = await axios.get('https://api.github.com/repos/adiwajshing/Baileys/releases/latest');
    const latestVersion = data.tag_name;
    Logger.info(`Versão latest Baileys: ${latestVersion}`);
    execSync('npm update @whiskeysockets/baileys', { stdio: 'inherit' });
    Logger.info('Baileys atualizado com sucesso!');
  } catch (error) {
    Logger.error(`Erro no update: ${error}`);
  }
}

if (require.main === module) {
  updateBaileys();
}