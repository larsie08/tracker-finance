# Tracker Finance 🌐

**Tracker Finance** — это приложение для отслеживания финансовых операций, позволяющее пользователям вести учёт доходов и расходов, анализировать финансовые потоки и планировать бюджет.  
Приложение состоит из **frontend** на React и **backend** на NestJS.

## Функциональность

- Добавление / редактирование / удаление транзакций (доходы и расходы)
- Категории операций и фильтрация по ним
- Просмотр баланса и истории по датам
- Базовые аналитические дашборды (графики, диаграммы)
- Аутентификация пользователей (JWT)

---

## 🛠️ Стек технологий

- **Frontend**: React, TypeScript, Vite, React Router, Axios, Chart.js / Recharts
- **Backend**: NestJS, TypeORM, PostgreSQL, JWT, dotenv
- **База данных**: PostgreSQL (рекомендовано)
- **Стили**: Tailwind CSS (если используется во фронтенде)

---

## ⚙️ Установка и запуск

### 1. Клонировать репозиторий

```bash
git clone https://github.com/larsie08/tracker-finance.git
cd tracker-finance
```

### 2. Установить зависимости

```bash
# Сервер
cd server
npm install

# Клиент
cd ../client
npm install
```

### 3. Настроить переменные окружения

Создайте файл `.env` в `server/`:

```env
# server/.env
DATABASE_HOST
DATABASE_PORT
DATABASE_USER
DATABASE_PASSWORD
DATABASE_NAME
JWT_SECRET=your_secret_key
```

### 4. Запуск проекта

```bash
# Сервер (NestJS)
cd server
npm run start:dev

# Клиент (Vite)
cd ../client
npm run dev
```

- Клиент: `http://localhost:5173`
- Сервер: `http://localhost:4000`
