/**
 * Este arquivo cases-estao-aqui.ts é equivalente ao antigo cases-estao-aqui.js.
 * Ele serve como guia e orientação para novos desenvolvedores que acessam o projeto.
 *
 * 🎯 OBJETIVO:
 * Explicar de forma clara onde estão os comandos, como editar o menu, alterar a imagem do bot e evitar erros comuns.
 *
 * Se você já usou um bot com 20 mil linhas em um único "index.js", você sabe a dor que é.
 * Agora imagine colar uma "case" errada e esquecer um parêntese, uma chave...
 * O bot quebra, aparecem mil erros, e você não sabe onde foi. Adivinha o que acontece?
 * Você volta tudo como estava antes. É isso que NÃO queremos aqui.
 *
 * Por isso, este projeto segue uma arquitetura limpa, organizada, e fácil de manter.
 * Criamos código para humanos, não para máquinas!
 *
 * A partir de agora, trocamos "case" por **comando**. Combinado? Vamos nessa!
 *
 * ---------------- 🤖 ONDE ESTÃO OS COMANDOS? 🤖 ----------------
 *
 * 📂 src/commands/
 *
 * Dentro dela, você verá:
 * - 📁 admin   → Comandos administrativos
 * - 📁 member  → Comandos disponíveis para membros
 * - 📁 owner   → Comandos exclusivos para o dono do bot
 *
 * ❗ IMPORTANTE:
 * Não é necessário usar ifs para verificar permissões.
 * Basta colocar o comando na pasta correta que o sistema cuida disso para você.
 *
 * 💡 Dica: Use o arquivo "🤖-como-criar-comandos.ts" como gabarito!
 *
 * ---------------- 🧾 ONDE MODIFICO O MENU? 🧾 ----------------
 *
 * 📄 src/menu.ts
 *
 * Edite o conteúdo usando crases (`), pois estamos usando template strings.
 * Exemplo:
 *
 * CORRETO: `Olá, tudo bem?` ✅
 * ERRADO:  Olá `tudo bem?`   ❌
 *
 * ---------------- 🖼️ COMO TROCO A FOTO DO BOT? 🖼️ ----------------
 *
 * 📂 assets/images/
 * Substitua o arquivo takeshi-bot.png pela imagem desejada.
 * Mantenha o nome do arquivo como "takeshi-bot.png".
 *
 * OU use o comando no chat:
 * <prefixo>set-menu-image (mencione a imagem desejada)
 *
 * ---------------- 🚀 IMPORTANTE 🚀 ----------------
 *
 * Leia o tutorial completo:
 * https://github.com/guiireal/takeshi-bot?tab=readme-ov-file#instala%C3%A7%C3%A3o-no-termux-
 *
 * Não pule etapas! Leia com atenção para entender como o bot funciona.
 *
 * By: Dev Gui
 *
 * ⚠️ Este arquivo é apenas informativo. Não há código executável aqui.
 */
