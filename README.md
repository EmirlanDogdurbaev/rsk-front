# 🛡️ RSK Front — Admin Panel

**RSK Front** — это фронтенд-часть , построенный на чистом **React + Vite + TypeScript**, с использованием **Feature-Sliced Design (FSD)** архитектуры, UI-библиотеки `shadcn/ui` и стейт-менеджера `zustand`.

---

## 🚀 Стек технологий

- ⚛️ **React 18**
- ⚡️ **Vite**
- 🌀 **TypeScript**
- 💨 **Tailwind CSS**
- 🎨 **shadcn/ui** (Radix UI + Tailwind)
- 🧠 **Zustand** (state management)
- 🔗 **React Router**
- 📁 **FSD архитектура** (Feature-Sliced Design)

---

## 📁 Архитектура (Feature-Sliced Design)

```
src/
├── app/          # Инициализация приложения, роутер, провайдеры
├── pages/        # Страницы, привязанные к маршрутам
├── widgets/      # Крупные UI-блоки (Sidebar, Header и т.п.)
├── features/     # Бизнес-операции (CreatePledge, LoginForm и т.п.)
├── entities/     # Базовые сущности (Pledge, User)
├── shared/
│   ├── ui/       # Общие компоненты интерфейса (Input, Button и т.п.)
│   ├── lib/      # Утилиты (cn, formatDate и т.п.)
│   ├── hooks/    # Общие хуки
│   ├── config/   # Константы, конфигурации, axios instance
│   ├── types/    # Глобальные типы
│   └── assets/   # Шрифты, иконки, картинки
```

---

## 📦 Установка

```bash
git clone https://github.com/EmirlanDogdurbaev/rsk-front.git
cd rsk-front
npm install
```

---

## 🛠️ Скрипты

| Скрипт         | Назначение                   |
|----------------|------------------------------|
| `npm run dev`  | Запустить проект в dev-режиме |
| `npm run build`| Сборка проекта                |
| `npm run preview` | Просмотр собранного проекта |

---

## 🌐 Переменные окружения

Создай файл `.env` и добавь:

```
VITE_API_URL=http://localhost:3000/api
```

---

## 🧠 Автор

Разработано с ❤️ Эмирланом (@EmirlanDogdurbaev)  
Проект для внутренней админки платформы **RSK**

---

## 📌 TODO

- [ ] Интеграция с бекендом
- [ ] Аутентификация и авторизация
- [ ] Управление залогами (CRUD)
- [ ] Таблицы, модалки, фильтры

---

