Teste Fiter Biblioteca
Este é um projeto de teste para uma aplicação de gerenciamento de biblioteca de livros, desenvolvido para uma vaga de desenvolvedor. A aplicação permite visualizar, organizar e interagir com uma coleção de livros, integrando uma API backend para dados. O frontend é construído com Next.js (ou similar), com suporte a temas claro/escuro e recursos de carregamento dinâmico.
Descrição
O "Teste Fiter Biblioteca" é uma aplicação web que exibe uma coleção de livros em um layout responsivo. Os livros são organizados em grid, com opções de ordenação alfabética (A-Z), por data de adição (mais antigos ou mais recentes) e filtro por favoritos. Inclui uma página de detalhes por ID de livro, skeletons para loading, e uma página administrativa básica (ainda em desenvolvimento para funcionalidades CRUD completas).
O backend utiliza uma API externa (submódulo books-api) para gerenciar os dados dos livros, com deploy no Render.
Features Implementadas

Exibição de Livros em Grid: Os livros são exibidos em um layout de grid responsivo para melhor visualização.
Ordenação dos Livros:

Alfabética (A-Z).
Mais antigos adicionados.
Mais recentes adicionados.


Favoritos: Feature para favoritar livros individuais, com armazenamento local ou via API.
Temas Claro e Escuro: Suporte a toggle entre modos claro e escuro para melhor acessibilidade.
Rota por ID de Livro: Página dedicada para detalhes de cada livro, com botão para voltar à página inicial.
Carregar Mais: Botão para carregar mais livros, respeitando um limite de 5 itens por carga para otimização.
Skeletons de Loading: Elementos placeholders (skeletons) exibidos enquanto os livros são carregados.
Filtro de Favoritos: Opção na header para exibir apenas os livros favoritados.
Página Admin Básica: Rota /admin para gerenciamento de livros (adicionar, editar, excluir), com layout implementado, mas CRUD ainda pendente.

Features Pendentes

Internacionalização (i18n): Suporte a múltiplos idiomas (ex.: português e inglês).
CRUD Completo na Página Admin: Implementação das operações de criar, ler, atualizar e deletar livros na rota /admin.

Requisitos

Node.js (versão 18 ou superior).
npm ou yarn para gerenciamento de pacotes.
Conta no Render para deploy do backend (opcional para desenvolvimento local).
API backend (submódulo books-api clonado e configurado).
