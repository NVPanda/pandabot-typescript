🐼 Pandabot

Evolução open-source do Takeshi-Bot em TypeScript com foco em Clean Code, princípios SOLID e integração com sistemas de aluguel, loja e IA VIP.

Automatize grupos com comandos poderosos, IA integrada, e uma arquitetura pensada para escalabilidade e manutenção limpa.

⚙️ Setup

Instale as dependências:

npm install


Configure as variáveis de ambiente:

cp .env.example .env
# Edite o arquivo .env com suas chaves de API e tokens


Rode as migrações do banco de dados:

npm run db:migrate


Inicie o bot:

npm start

💬 Comandos Disponíveis
Comando	Permissão	Descrição
!ban @usuario	Owner	Bane um usuário do grupo.
!sticker	Membro	Converte a última imagem em sticker.
!ia grok "sua pergunta"	VIP	Envia sua pergunta para a IA personalizada.
✨ Funcionalidades

🔐 Sistema de níveis de permissão (owner, VIP, membro)

🧠 Integração com IA para membros VIP

🛒 Loja automatizada e aluguéis por tempo

📦 Arquitetura limpa com TypeScript, Clean Code e SOLID

🧪 Suporte a testes e extensibilidade modular

🤝 Contribua

PRs são bem-vindos!
Foque em uma única responsabilidade por PR, siga boas práticas de código limpo e mantenha consistência com o estilo do projeto.

Sugestões de contribuição:

Refatorações com base em princípios SOLID

Novos comandos úteis

Validações de segurança e anti-abuso

Testes unitários e de integração

Estética visual (stickers, logs, prints)

🛡️ Boas práticas e segurança

Evite bugs de "bad MAC" com verificação adequada de tokens e mensagens.

Utilize try/catch e guards para erros esperados.

Toda automação deve ser segura e responsiva, sem travamentos.

📜 Licença

Este projeto é open-source sob a licença MIT.
