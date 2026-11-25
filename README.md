# Bubble Bliss

O Bubble Bliss é uma aplicação web desenvolvida em Angular para gerenciar uma pequena loja de bubble tea. A proposta foi criar um sistema simples, organizado e agradável de usar, aplicando os conteúdos estudados em aula.

## Funcionalidades

O projeto contém dois CRUDs completos:

- Bebidas: cadastrar, visualizar, editar e excluir bubble teas.
- Ingredientes: cadastrar, visualizar, editar e excluir itens do estoque.

Também há três links principais com Router Outlet: Início, Bubble Teas e Ingredientes.

## Tecnologias

- Angular 19
- TypeScript
- Angular Material
- Angular Router
- Reactive Forms
- SCSS
- LocalStorage

## Como executar

É necessário possuir o Node.js em versão LTS e o Angular CLI.

1. Abra a pasta do projeto no terminal.
2. Execute `npm install`.
3. Execute `npm start` ou `ng serve`.
4. Acesse `http://localhost:4200`.

## Armazenamento

Os dados são salvos no LocalStorage do navegador. Isso permite demonstrar persistência e CRUD sem depender de um servidor externo. Como melhoria futura, o serviço pode ser substituído por uma integração com Firebase Firestore ou uma API própria.

## Identidade visual

A interface utiliza as cores `#7bdff2`, `#b2f7ef`, `#eff7f6`, `#f7d6e0`, `#f2b5d4` e `#493548`.

## Estrutura

- `models`: interfaces dos dados.
- `services`: regras de CRUD e LocalStorage.
- `pages`: páginas de início, bebidas e ingredientes.
- `shared`: cabeçalho e rodapé reutilizáveis.

## Autoria

Projeto acadêmico desenvolvido por Geovanna Pereira da Silva.
