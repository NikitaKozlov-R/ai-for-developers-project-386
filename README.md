### Hexlet tests and linter status:

[![Actions Status](https://github.com/NikitaKozlov-R/ai-for-developers-project-386/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/NikitaKozlov-R/ai-for-developers-project-386/actions)

# Simple Cal.com

Упрощённый cal.com. Владелец календаря заводит типы событий и смотрит предстоящие
встречи, гость без регистрации выбирает тип события и бронирует свободный слот.

Источник правды для API — TypeSpec-спецификация в [specs/](specs), из неё генерируется
[openapi/openapi.yaml](openapi/openapi.yaml).

## Локальная разработка

Нужны два процесса в двух терминалах, порядок запуска любой.

### Бэкенд

```bash
cd backend
npm install
npm run dev    # API на :3000, перезапускается по правкам
```

HTTP-сервер на `node:http` без фреймворков. Node исполняет `.ts` напрямую, поэтому
сборки нет — нужен Node 22.18 или новее.

### Фронтенд

```bash
cd frontend
npm install
npm run dev    # интерфейс на :5173
```

Клиент ходит в относительный `/api`, Vite проксирует запросы на
`VITE_API_PROXY_TARGET` — по умолчанию на бэкенд `http://localhost:3000`.

## Состояние сбрасывается при перезапуске

Бэкенд хранит данные только в памяти процесса: ни базы, ни файлов. Любая остановка
сервера — включая автоперезапуск `npm run dev` после правки кода — возвращает стартовый
набор: профиль владельца и три типа событий. Созданные бронирования при этом теряются.

## Работа без бэкенда

Интерфейс можно поднять на моке по контракту:

```bash
cd frontend
npm run mock   # Prism на :4010
```

Затем укажите в `frontend/.env.local`:

```
VITE_API_PROXY_TARGET=http://localhost:4010
```

Подробности — в [frontend/README.md](frontend/README.md).

## Соглашение о коммитах

Все коммиты следуют [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). Формат проверяется автоматически при коммите через `commitlint` + `husky`.

```bash
npm install              # установка commitlint + husky в корне
npx husky install        # инициализация git hooks для проверки коммитов
```

**Типы коммитов**: `feat`, `fix`, `spec` (TypeSpec), `docs`, `test`, `refactor`, `perf`, `ci`, `build`, `chore`.

**Примеры**:

```bash
git commit -m "feat(backend): add booking conflict validation"
git commit -m "spec(models): add archived field to EventType"
git commit -m "fix(frontend): correct calendar grid overflow"
```

Полное руководство: [CONTRIBUTING.md](CONTRIBUTING.md).

## Интеграционные тесты

Playwright-тесты в [e2e/](e2e) проверяют frontend и backend вместе через реальный браузер:
пользовательские пути по бронированию, предстоящим встречам и типам событий (по 4 теста на
раздел). Backend не сбрасывается между тестами — каждый тест использует уникальные данные.

```bash
cd e2e
npm install
npx playwright install --with-deps chromium
npm test
```

Тесты сами поднимают backend и frontend (`webServer` в `playwright.config.ts`) и гоняются в
CI — см. [`.github/workflows/e2e.yml`](.github/workflows/e2e.yml). Подробности — в
[e2e/README.md](e2e/README.md).
