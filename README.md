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
