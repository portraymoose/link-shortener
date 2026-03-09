# URL Shortener

Сервис для сокращения ссылок с возможностью отслеживания статистики переходов. Проект состоит из двух частей: бэкенд на Node.js/Express и фронтенд на React + TypeScript.

## Функциональные возможности

- **Сокращение ссылок** – введите длинный URL, получите короткую ссылку для перехода и отдельную ссылку для просмотра статистики.
- **Статистика переходов** – для каждой сокращённой ссылки доступна страница со статистикой:
  - Дата и время перехода
  - IP-адрес
  - Регион (определяется по IP через внешнее API)
  - Браузер и его версия
  - Операционная система
  - Визуализация данных в виде графиков (распределение по браузерам, ОС, регионам)
- **Автоматический редирект** – при переходе по короткой ссылке пользователь перенаправляется на исходный URL, а данные о клике сохраняются в базу.

## Технологический стек

### Бэкенд

- Node.js + Express
- TypeScript
- Supabase (PostgreSQL)
- Axios (для запросов к внешнему API геолокации)
- Утилиты: `ua-parser-js`, `ip`

### Фронтенд

- React 18
- TypeScript
- Redux Toolkit (управление состоянием)
- React Router v6 (навигация)
- Axios (запросы к API)
- Recharts (визуализация статистики)
- Vite (сборка)

## Структура проекта

Проект организован как монорепозиторий:

```/
├── backend/ # Бэкенд-часть
│ ├── src/
│ │ ├── controllers/ # Обработчики запросов
│ │ ├── repositories/ # Работа с базой данных
│ │ ├── services/ # Бизнес-логика
│ │ ├── utils/ # Вспомогательные функции
│ │ ├── types/ # TypeScript типы
│ │ └── supabase/ # Клиент для Supabase
│ ├── .env.example # Пример переменных окружения
│ └── package.json
│
├── frontend/ # Фронтенд-часть
│ ├── src/
│ │ ├── components/ # UI-компоненты
│ │ ├── pages/ # Страницы
│ │ ├── store/ # Redux store, слайсы
│ │ ├── api/ # Настройка axios
│ │ ├── utils/ # Вспомогательные функции
│ │ └── types/ # TypeScript типы
│ ├── .env.example # Пример переменных окружения
│ └── package.json
│
├── .gitignore # Общий .gitignore для всего проекта
└── README.md # Этот файл
```

## Установка и запуск

### 1. Клонируйте репозиторий

```bash
git clone https://github.com/portraymoose/link-shortener
cd link-shortener
```

### 2. Настройте базу данных

- Создайте проект в Supabase.
- Выполните SQL-скрипты для создания таблиц links и clicks.

```sql
create table links (
  id uuid primary key default gen_random_uuid(),
  original_url text not null,
  short_code text not null unique,
  created_at timestamp with time zone default now()
);
```

```sql
create table clicks (
  id uuid primary key default gen_random_uuid(),
  link_id uuid references links(id) on delete cascade,
  ip text not null,
  region text,
  os text,
  browser text,
  browser_version text,
  created_at timestamp with time zone default now()
);
```

### 3. Запустите бэкенд

```bash
cd backend
cp .env.example .env   # отредактируйте .env, указав свои SUPABASE_URL, SUPABASE_KEY, PORT, BASE_URL
npm install
npm run dev
```

### 4. Запустите фронтенд

```bash
cd ../frontend
cp .env.example .env   # при необходимости измените VITE_API_URL (по умолчанию http://localhost:5000)
npm install
npm run dev
```

### 5. Проверьте работу

Перейдите в браузере на http://localhost:5173, введите любой URL и нажмите «Shorten». Должны появиться короткая ссылка и ссылка на статистику.
