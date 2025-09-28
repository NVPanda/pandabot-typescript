# 🐼 Pandabot

> Evolução open-source do Takeshi-Bot, escrito em **TypeScript**, com **Clean Code**, princípios **SOLID** e uma arquitetura escalável para comandos, automações e VIP IAs.

---

## 🚀 Funcionalidades principais

- Comandos organizados por tipo: `admin`, `member`, `owner`
- Integração com IA (ex: `!ia grok`)
- Suporte a Stickers, Banimentos e VIPs
- Sistema de aluguel, loja e permissões
- Manutenção facilitada com código limpo e modular
- Atualização automática com backup e diff de arquivos

---

## 🧪 Tecnologias utilizadas

- **Node.js** + **TypeScript**
- **ESLint**, **Prettier**
- Arquitetura modular com princípios **SOLID**
- Scripts de automação: Bash & PowerShell
- Banco de dados relacional (ORM)

---

## ⚙️ Requisitos

- Node.js v18+
- npm ou yarn
- Git
- (Opcional) PM2 para rodar em produção

---

## 📦 Instalação

```bash
git clone https://github.com/seu-usuario/pandabot.git
cd pandabot

npm install
cp .env.example .env
# edite o .env com suas credenciais/API keys

npm run db:migrate
npm run build
npm start
