---
name: commit-conventions
description: "Как правильно писать коммиты по Conventional Commits для simple-cal-com. Use when: делаешь коммит и нужно уточнить формат; не помнишь, какой тип выбрать (feat, fix, spec, docs, test и т.д.); нужны примеры для backend/frontend/specs/e2e; нужно описать breaking change."
---

# Соглашение о коммитах (Conventional Commits)

Все коммиты в проекте должны следовать [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
Формат проверяется автоматически при каждом коммите через `commitlint` + `husky`.

## Когда применять

**Всегда** — при любом коммите в проект.

- Правка code: feat, fix, refactor, perf
- Изменение контракта API (TypeSpec): spec
- Документация: docs
- Тесты: test
- CI/CD, workflows: ci
- Зависимости, tooling: chore, build
- Проверка формата: commitlint отклонит невалидный коммит

## Структура

```
type(scope): subject
<blank line>
[optional body]
<blank line>
[optional footer(s)]
```

### Заголовок

- **type**: feat, fix, spec, docs, test, refactor, perf, ci, build, chore
- **scope** (опциональный): backend, frontend, specs, e2e или по смыслу (store, api, ui)
- **subject**: повелительное наклонение, строчное, без точки, ≤ 50 символов

Примеры:
- ✅ `feat(backend): add slot reservation logic`
- ✅ `fix(frontend): resolve calendar grid overflow on mobile`
- ✅ `spec: add EventType.archived field`
- ❌ `Feature: added booking validation` (заглавное, неверный формат)
- ❌ `fix(backend): resolve the slot reservation issue.` (точка, >50 символов)

### Body (опциональное)

Объясняет **почему**, а не что.

```
feat(backend): add exponential backoff for database retries

Database was experiencing connection spikes when our service retried
immediately after timeout. Adding exponential backoff spreads requests
and reduces cascading failures.
```

Каждая строка ≤ 72 символа, отделено от заголовка пустой строкой.

### Footer (опциональное)

Для ссылок на задачи и breaking changes:

```
Closes #123
BREAKING CHANGE: removed deprecated eventTypeId parameter
```

## Таблица типов

| Тип | Применять | Примеры |
|-----|-----------|---------|
| **feat** | Новая функция | Новый эндпоинт, компонент, поле, операция |
| **fix** | Исправление bug'а | Логическая ошибка, некорректное поведение |
| **spec** | TypeSpec/OpenAPI | Изменение `specs/*.tsp`, перегенерация `openapi/openapi.yaml` |
| **docs** | Документация | README, комментарии, гайды |
| **test** | Тесты | e2e, unit, интеграционные |
| **refactor** | Структурирование | Переименование, новая архитектура (функционал не меняется) |
| **perf** | Производительность | Оптимизация, кэширование |
| **ci** | Workflows | `.github/workflows`, commitlint, husky конфиги |
| **build** | Сборка | TypeScript конфиг, bundler, webpack |
| **chore** | Обслуживание | npm update, чистка, не связанное с продуктом |

## Примеры по секциям

### Backend (бизнес-логика, API-обработчики)

```bash
git commit -m "feat(backend): add conflict detection for overlapping bookings"

git commit -m "fix(backend): handle timezone correctly when checking working hours

Previously used local time instead of UTC, causing misalignment with
stored slot data."

git commit -m "refactor(backend): extract slot availability logic into domain/

Move booking.ts logic to separate slots.ts for better separation."

git commit -m "perf(backend): cache working hours configuration"
```

### Frontend (компоненты, UI)

```bash
git commit -m "feat(frontend): add real-time slot availability indicator"

git commit -m "fix(frontend): correct calendar month navigation on mobile"

git commit -m "refactor(frontend): simplify EventTypeForm component structure"

git commit -m "docs(frontend): add JSDoc comments to useApi hook"
```

### API Spec (TypeSpec, OpenAPI)

⚠️ **Важно**: коммит spec всегда должен включать пересобранный `openapi/openapi.yaml`!

```bash
# Добавить операцию
git commit -m "spec(routes): add GET /admin/bookings endpoint"

# Изменить модель
git commit -m "spec(models): add archived flag to EventType"

# Breaking change в контракте
git commit -m "spec: restructure error responses

BREAKING CHANGE: errors now always contain code and message fields.
Previously some endpoints returned simple text."
```

### E2E Тесты (Playwright)

```bash
git commit -m "test(e2e): add scenario for guest booking flow"

git commit -m "test(e2e): fix flaky slot selector timing issue"

git commit -m "test(e2e): ensure concurrent bookings don't double-reserve"
```

### Dependencies, CI, Tooling

```bash
git commit -m "chore: update typescript from 5.2 to 5.3"

git commit -m "ci: add commitlint validation to pre-commit hook"

git commit -m "build: enable TypeScript strict mode"

git commit -m "chore: remove unused dependencies from backend/package.json"
```

## Breaking Changes

Если изменение **несовместимо** с предыдущей версией, используй `BREAKING CHANGE:`:

```bash
git commit -m "spec: rename booking field from guestEmail to email

BREAKING CHANGE: booking.guestEmail now called booking.email.
Clients must update request/response parsing."
```

Такой коммит часто означает **major версию** при semver.

## Полезные команды

```bash
# Просмотр последних коммитов (проверка формата)
git log --oneline -10

# Просмотр с деталями
git log --pretty=fuller -5

# Изменение последнего коммита (если ошибка)
git commit --amend -m "feat: corrected message"

# Пропуск проверки (ТОЛЬКО В ЭКСТРЕННЫХ СЛУЧАЯХ)
git commit --no-verify -m "..."
```

## FAQ

**Q: Что если я забыл добавить scope?**  
A: Это нормально. Scope опциональный. `feat: add booking validation` валиден.

**Q: Какой тип для обновления dependenc'ий?**  
A: Обычно `chore`, если это не влияет на API или функционал. Если обновление critical fix — используй `fix`.

**Q: Что означает "повелительное наклонение"?**  
A: Пиши так, будто даёшь команду: "add feature", "fix bug", "refactor code".  
Не пиши: "added feature", "fixes bug", "refactored code".

**Q: Где это про commitlint? Что будет, если нарушу?**  
A: Коммит будет отклонён сообщением об ошибке. Исправь сообщение и попробуй снова.

**Q: Как я пишу сообщение, если оно очень длинное?**  
A: Используй редактор вместо флага `-m`:  
```bash
git commit  # откроет редактор (vim, nano, VS Code)
```

**Q: BREAKING CHANGE: пишется где?**  
A: В конце footer'а (после body). Перед ним должна быть пустая строка.

---

Полная инструкция: [CONTRIBUTING.md](../../../../CONTRIBUTING.md)
