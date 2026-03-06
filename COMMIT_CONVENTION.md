# Commit Convention

Este projeto segue o padrao de commits do IuriCode:

`:<emoji>: <tipo>: <descricao curta no imperativo>`

Exemplos:

- `:sparkles: feat: adiciona pagina de clientes`
- `:bug: fix: corrige validacao de cpf duplicado`
- `:recycle: refactor: separa hooks por responsabilidade`
- `:lipstick: style: ajusta paleta de cores do itau`
- `:wrench: chore: atualiza dependencias do projeto`
- `:white_check_mark: test: adiciona testes de servicos`
- `:memo: docs: documenta contratos da api`

## Tipos mais usados

- `feat`: nova funcionalidade
- `fix`: correcao de bug
- `refactor`: mudanca interna sem alterar comportamento esperado
- `style`: mudanca visual/formatacao
- `test`: criacao/ajuste de testes
- `docs`: documentacao
- `chore`: tarefas de manutencao (deps, config, scripts)
- `perf`: melhoria de performance
- `ci`: pipeline/automacao
- `build`: empacotamento/build/deploy

## Regras

- Use mensagem em portugues.
- Use descricao curta e direta.
- Evite commits muito grandes; prefira commits atomicos.
- Commit deve compilar e nao quebrar lint/testes aplicaveis.
