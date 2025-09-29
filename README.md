<h1> Teste Fiter Biblioteca </h1>

Este é um projeto de teste para uma aplicação de gerenciamento de biblioteca de livros, desenvolvido para uma vaga de desenvolvedor. A aplicação permite visualizar, organizar e interagir com uma coleção de livros, integrando uma API backend para dados. O frontend é construído com Next.js (ou similar), com suporte a temas claro/escuro e recursos de carregamento dinâmico.
Descrição
O "Teste Fiter Biblioteca" é uma aplicação web que exibe uma coleção de livros em um layout responsivo. Os livros são organizados em grid, com opções de ordenação alfabética (A-Z), por data de adição (mais antigos ou mais recentes) e filtro por favoritos. Inclui uma página de detalhes por ID de livro, skeletons para loading, e uma página administrativa básica (ainda em desenvolvimento para funcionalidades CRUD completas).
O backend utiliza uma API externa (submódulo books-api) para gerenciar os dados dos livros, com deploy no Render.

<h3> Features Implementadas: </h3>

<b>Exibição de Livros em Grid</b>: Os livros são exibidos em um layout de grid responsivo para melhor visualização.

<b>Ordenação dos Livros</b>:
Alfabética (A-Z).
Mais antigos adicionados.
Mais recentes adicionados.

<b>Favoritos</b> : Feature para favoritar livros individuais, com armazenamento local ou via API.

<b>Temas Claro e Escuro</b> : Suporte a toggle entre modos claro e escuro para melhor acessibilidade e persistindo no local storage

<b>Rota por ID de Livro</b> : Página dedicada para detalhes de cada livro, com botão para voltar à página inicial.

<b>Carregar Mais</b> : Botão para carregar mais livros, respeitando um limite de 5 itens por carga para otimização.

<b>Skeletons de Loading</b> : Elementos placeholders (skeletons) exibidos enquanto os livros são carregados.

<b>Filtro de Favoritos</b> : Opção na header para exibir apenas os livros favoritados.

<b>Página Admin Básica</b> : Rota /admin para gerenciamento de livros (adicionar, editar, excluir), com layout implementado, mas CRUD ainda pendente.

<b>Contador de livros favoritos</b> : Adicionado uma badge de contagem de livros considerados favoritos pelo usuário, persistindo no local storage




<h3>Features Pendentes:</h3>

<b>Internacionalização (i18n)</b>: Suporte a múltiplos idiomas (ex.: português e inglês).

<b>CRUD Completo na Página Admin</b>: Implementação das operações de criar, ler, atualizar e deletar livros na rota /admin.
