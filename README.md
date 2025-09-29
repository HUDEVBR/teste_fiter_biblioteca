<h1>Teste Fiter Biblioteca</h1>

<p>Este é um projeto de teste para uma aplicação de gerenciamento de biblioteca de livros, desenvolvido para uma vaga de desenvolvedor. A aplicação permite visualizar, organizar e interagir com uma coleção de livros, integrando uma API backend para dados. O frontend é construído com Next.js (ou similar), com suporte a temas claro/escuro e recursos de carregamento dinâmico.</p>

<h2>Descrição</h2>

<p>O "Teste Fiter Biblioteca" é uma aplicação web que exibe uma coleção de livros em um layout responsivo. Os livros são organizados em grid, com opções de ordenação alfabética (A-Z), por data de adição (mais antigos ou mais recentes) e filtro por favoritos. Inclui uma página de detalhes por ID de livro, skeletons para loading, e uma página administrativa básica (ainda em desenvolvimento para funcionalidades CRUD completas).</p>

<p>O backend utiliza uma API externa (submódulo <b>books-api</b>) para gerenciar os dados dos livros, com deploy no Render.</p>

<h2>Features Implementadas</h2>

<ul>
  <li><b>Exibição de Livros em Grid:</b> Os livros são exibidos em um layout de grid responsivo para melhor visualização.</li>
  <li><b>Ordenação dos Livros:</b>
    <ul>
      <li>Alfabética (A-Z).</li>
      <li>Mais antigos adicionados.</li>
      <li>Mais recentes adicionados.</li>
    </ul>
  </li>
  <li><b>Favoritos:</b> Feature para favoritar livros individuais, com armazenamento local ou via API.</li>
  <li><b>Temas Claro e Escuro:</b> Suporte a toggle entre modos claro e escuro para melhor acessibilidade.</li>
  <li><b>Rota por ID de Livro:</b> Página dedicada para detalhes de cada livro, com botão para voltar à página inicial.</li>
  <li><b>Carregar Mais:</b> Botão para carregar mais livros, respeitando um limite de 5 itens por carga para otimização.</li>
  <li><b>Skeletons de Loading:</b> Elementos placeholders (skeletons) exibidos enquanto os livros são carregados.</li>
  <li><b>Filtro de Favoritos:</b> Opção na header para exibir apenas os livros favoritados.</li>
  <li><b>Página Admin Básica:</b> Rota <b>/admin</b> para gerenciamento de livros (adicionar, editar, excluir), com layout implementado, mas CRUD ainda pendente.</li>
</ul>

<h2>Features Pendentes</h2>

<ul>
  <li><b>Internacionalização (i18n):</b> Suporte a múltiplos idiomas (ex.: português e inglês).</li>
  <li><b>CRUD Completo na Página Admin:</b> Implementação das operações de criar, ler, atualizar e deletar livros na rota <b>/admin</b>.</li>
</ul>

<h2>Requisitos</h2>

<ul>
  <li><b>Node.js:</b> Versão 18 ou superior (baixe em [nodejs.org](https://nodejs.org/)).</li>
  <li><b>PostgreSQL:</b> Banco de dados necessário para o backend (baixe em [postgresql.org](https://www.postgresql.org/download/)).</li>
  <li><b>Git:</b> Para clonar o repositório (baixe em [git-scm.com](https://git-scm.com/) se ainda não tiver).</li>
  <li><b>Visual Studio Code (VSCode):</b> Editor recomendado (baixe em [code.visualstudio.com](https://code.visualstudio.com/)).</li>
</ul>

<h2>Instalação e Uso</h2>

<h3>Pré-requisitos</h3>

<p>Certifique-se de ter os softwares listados em "<b>Requisitos</b>" instalados antes de prosseguir.</p>

<h3>Passo a passo para Instalação</h3>

<ol>
  <li><b>Instale o PostgreSQL:</b>
    <ul>
      <li>Baixe e instale o PostgreSQL a partir do site oficial: [https://www.postgresql.org/download/](https://www.postgresql.org/download/).</li>
      <li>Durante a instalação, anote o nome do usuário e senha que você configurar (ex.: <b>hudevbr</b> como usuário e senha).</li>
      <li>Após a instalação, crie um banco de dados chamado <b>books</b>:
        <ul>
          <li>Abra o terminal do PostgreSQL (pgAdmin ou comando <b>psql</b>).</li>
          <li>Execute: <code>createdb -U &lt;seu_usuario&gt; books</code> (substitua <b>&lt;seu_usuario&gt;</b> pelo nome do usuário, ex.: <b>hudevbr</b>).</li>
        </ul>
      </li>
    </ul>
  </li>
  <li><b>Clone o Repositório:</b>
    <ul>
      <li>Abra o VSCode.</li>
      <li>No terminal integrado (Ctrl + `), clone o projeto:
        <code>git clone https://github.com/HUDEVBR/teste_fiter_biblioteca.git</code></li>
      <li>Navegue até o diretório clonado:
        <code>cd teste_fiter_biblioteca</code></li>
    </ul>
  </li>
  <li><b>Configure o Submódulo do Backend:</b>
    <ul>
      <li>Inicialize o submódulo do backend (que contém a API):
        <code>git submodule update --init --recursive</code></li>
    </ul>
  </li>
  <li><b>Abra Dois Terminais no VSCode:</b>
    <ul>
      <li>No VSCode, use o menu "Terminal" > "New Terminal" para abrir dois terminais lado a lado.</li>
      <li><b>Terminal 1 (Frontend):</b>
        <ul>
          <li>Navegue para o diretório do frontend:
            <code>cd app</code></li>
        </ul>
      </li>
      <li><b>Terminal 2 (Backend):</b>
        <ul>
          <li>Navegue para o diretório do backend:
            <code>cd api/books-api</code></li>
        </ul>
      </li>
    </ul>
  </li>
  <li><b>Instale as Dependências:</b>
    <ul>
      <li>No <b>Terminal 1 (Frontend):</b>
        <code>npm install</code></li>
      <li>No <b>Terminal 2 (Backend):</b>
        <code>npm install</code>
        <code>npm install dotenv</code></li>
    </ul>
  </li>
  <li><b>Configure as Variáveis de Ambiente:</b>
    <ul>
      <li>No diretório <b>api/books-api</b>, crie um arquivo chamado <b>.env</b> (sem extensão visível).</li>
      <li>Adicione o seguinte conteúdo, ajustando os valores conforme seu usuário PostgreSQL:
        <pre>
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_USER=hudevbr  # Substitua por seu usuário PostgreSQL
DB_PASS=hudevbr  # Substitua por sua senha PostgreSQL
DB_NAME=books
DATABASE_URL=postgresql://hudevbr:hudevbr@localhost:5432/books  # Ajuste usuário e senha
        </pre></li>
      <li>Certifique-se de que o arquivo <b>.env</b> não seja commitado (ele já deve estar no <b>.gitignore</b>).</li>
    </ul>
  </li>
  <li><b>Ajuste o Código do Backend:</b>
    <ul>
      <li>Abra o arquivo <b>index.js</b> no diretório <b>api/books-api</b>.</li>
      <li>Logo abaixo da linha <b>'use strict';</b>, adicione:
        <pre>
require('dotenv').config();
        </pre></li>
      <li>Verifique se a porta está configurada corretamente no <b>app.listen</b>, ex.:
        <pre>
const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => console.log(`Running on http://0.0.0.0:${PORT}`));
        </pre></li>
    </ul>
  </li>
</ol>

<h3>Como Usar</h3>

<ol>
  <li><b>Inicie o Backend:</b>
    <ul>
      <li>No <b>Terminal 2 (api/books-api):</b>
        <code>npm start</code></li>
      <li>Certifique-se de que o PostgreSQL está rodando localmente. Se não estiver, inicie o serviço PostgreSQL no sistema.</li>
    </ul>
  </li>
  <li><b>Inicie o Frontend:</b>
    <ul>
      <li>No <b>Terminal 1 (app):</b>
        <code>npm run dev</code></li>
      <li>Acesse o frontend em <b>http://localhost:3000</b> no navegador.</li>
    </ul>
  </li>
  <li><b>Teste a API:</b>
    <ul>
      <li>Abra uma nova aba no navegador ou use uma ferramenta como Postman.</li>
      <li>Acesse <b>http://localhost:4000/getAll</b> para listar os livros (ajuste conforme os endpoints da API).</li>
    </ul>
  </li>
</ol>

<h3>Notas Importantes</h3>

<ul>
  <li><b>Portas:</b> O backend roda na porta 4000, e o frontend na porta 3000. Certifique-se de que nenhuma outra aplicação usa essas portas.</li>
  <li><b>Banco de Dados:</b> Se a conexão com o PostgreSQL falhar, verifique se o serviço está ativo e as credenciais no <b>.env</b> estão corretas.</li>
  <li><b>Deploy:</b> Para deploy no Render, configure os serviços Web e PostgreSQL conforme as instruções no repositório ou no dashboard do Render.</li>
</ul>

<h3>Solução de Problemas</h3>

<ul>
  <li><b>Erro "Cannot find module":</b> Execute <code>npm install</code> no diretório afetado para instalar as dependências.</li>
  <li><b>Conexão com DB falha:</b> Confirme que o PostgreSQL está rodando e as variáveis de ambiente estão corretas.</li>
  <li><b>Porta em uso:</b> Use <code>netstat -aon | findstr :4000</code> (Windows) para verificar e liberar a porta, se necessário.</li>
</ul>

<h2>Contribuição</h2>

<p>Contribuições são bem-vindas! Para contribuir:</p>

<ol>
  <li>Fork o repositório.</li>
  <li>Crie uma branch: <code>git checkout -b feature/nova-feature</code>.</li>
  <li>Commit suas mudanças: <code>git commit -m 'Adiciona nova feature'</code>.</li>
  <li>Push para a branch: <code>git push origin feature/nova-feature</code>.</li>
  <li>Abra um Pull Request.</li>
</ol>

<h2>Licença</h2>

<p>Este projeto está licenciado sob a MIT License. Veja o arquivo <b>[LICENSE](LICENSE)</b> para mais detalhes.</p>
