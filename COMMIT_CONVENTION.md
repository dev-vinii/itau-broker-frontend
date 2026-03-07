# Commit Convention

This project follows IuriCode's commit pattern:

`:<emoji>: <tipo>: <descricao curta no imperativo>`

Examples:

- `:sparkles: feat: add clients page`
- `:bug: fix: prevent duplicated cpf validation`
- `:recycle: refactor: split hooks by responsibility`
- `:lipstick: style: adjust itau color palette`
- `:wrench: chore: update project dependencies`
- `:white_check_mark: test: add service tests`
- `:memo: docs: document api contracts`

## Common types

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

## Rules

- Use commit messages in English.
- Keep the description short and direct.
- Avoid very large commits; prefer atomic commits.
- Commits must compile and not break applicable lint/tests.
