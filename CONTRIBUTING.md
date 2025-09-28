# 🛠️ Contribuindo com o Pandabot

Obrigado por considerar contribuir com o **Pandabot**! 🎉  
Nosso objetivo é construir um bot de alto nível, modular, seguro e fácil de manter. Abaixo estão as diretrizes para ajudar a mantermos o padrão de qualidade e organização do projeto.

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter:

- Node.js v18+ e npm instalados
- Familiaridade com TypeScript
- Conhecimento básico sobre princípios **SOLID** e **Clean Code**
- Clonado o repositório e rodado o setup:

```bash
npm install
cp .env.example .env
# Edite o .env conforme necessário
npm run db:migrate
npm start

🚀 Como contribuir
1. Fork o projeto

Clique em "Fork" no topo do repositório e clone o seu fork localmente:

git clone https://github.com/seu-usuario/pandabot.git
cd pandabot

2. Crie uma branch

Use uma nomenclatura clara e descritiva:

git checkout -b feat/comando-sticker


Prefixos sugeridos:

Prefixo	Uso
feat/	Nova funcionalidade
fix/	Correção de bug
chore/	Mudanças menores (docs, config)
refactor/	Refatoração sem mudança de função
test/	Adição ou ajuste de testes
3. Faça suas alterações

Mantenha uma única responsabilidade por PR

Siga os princípios SOLID

Aplique boas práticas de Clean Code

Teste localmente com npm start

Adicione testes se possível

4. Commit semântico

Utilize mensagens de commit no formato:

git commit -m "feat: adiciona comando !sticker para membros"

5. Envie seu PR

Abra um Pull Request no GitHub com uma descrição clara:

O que foi feito

Qual problema resolve ou qual recurso adiciona

Screenshots ou logs (se aplicável)

🧪 Testes

Sempre que possível, escreva testes para novas funcionalidades. Testes ajudam a manter a integridade do bot à medida que ele cresce.

Utilize frameworks como jest ou vitest

Teste comandos, funções auxiliares e validações de segurança

✅ Checklist de PR

Antes de abrir o PR, verifique:

 O código foi testado localmente

 O PR resolve apenas uma coisa (single responsibility)

 A estrutura do projeto foi respeitada

 Código legível e comentado quando necessário

 Sem warnings ou erros no terminal

 Não expõe tokens ou dados sensíveis

📄 Licença

Ao enviar contribuições, você concorda que seu código será licenciado sob a licença MIT deste projeto.

🙏 Obrigado!

Contribuições são fundamentais para manter o Pandabot evoluindo.
A comunidade agradece sua ajuda — seja com código, ideias, testes ou feedback.