# Itau Broker Frontend

Frontend para a API de Compra Programada de Acoes da Itau Corretora.

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- TanStack Router + React Query
- Radix UI

## Funcionalidades

- **Clientes**: Adesao, saida, alteracao de valor mensal, carteira e rentabilidade
- **Admin Cesta**: Cadastro da Top Five, consulta de cesta atual, historico e conta master
- **Motor de Compra**: Execucao manual de compra programada para testes

## Desenvolvimento

```bash
npm install
cp .env.example .env
npm run dev
```

## Variaveis de ambiente

- `VITE_API_BASE_URL`: URL base da API (ex: `http://localhost:8080/api`)

## Docker

1. Configure o `.env` com a API:

```bash
cp .env.example .env
```

2. Suba com Docker Compose:

```bash
docker compose up --build
```

A aplicacao ficara em `http://localhost:3000`.

## Commit Convention

This project follows IuriCode's commit pattern:

`:<emoji>: <type>: <short imperative description>`

Examples:

- `:sparkles: feat: add clients page`
- `:bug: fix: prevent duplicated cpf validation`
- `:recycle: refactor: split hooks by responsibility`
- `:lipstick: style: adjust itau color palette`
- `:wrench: chore: update project dependencies`
- `:white_check_mark: test: add service tests`
- `:memo: docs: document api contracts`

### Common types

- `feat`: new functionality
- `fix`: bug fix
- `refactor`: internal change without expected behavior changes
- `style`: visual/formatting change
- `test`: add/update tests
- `docs`: documentation
- `chore`: maintenance tasks (deps, config, scripts)
- `perf`: performance improvement
- `ci`: pipeline/automation
- `build`: packaging/build/deploy

### Rules

- Use commit messages in English.
- Keep the description short and direct.
- Avoid very large commits; prefer atomic commits.
- Commits must compile and not break applicable lint/tests.
