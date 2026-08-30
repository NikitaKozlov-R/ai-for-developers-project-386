### Hexlet tests and linter status:
[![Actions Status](https://github.com/NikitaKozlov-R/ai-for-developers-project-386/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/NikitaKozlov-R/ai-for-developers-project-386/actions)

## Запуск фронтенда

```bash
cd frontend
npm install
npm run mock   # Prism-мок по контракту на :4010
npm run dev    # интерфейс на :5173
```

Запросы идут в относительный `/api`, Vite проксирует их на `VITE_API_PROXY_TARGET`.
Чтобы работать с реальным бэкендом вместо мока, в `frontend/.env.local` укажите:

```
VITE_API_PROXY_TARGET=http://localhost:3000
```

Подробности — в [frontend/README.md](frontend/README.md).
