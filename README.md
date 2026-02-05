# Getting Started

To run this application:

```bash
npm install
npm run dev
```


# Explanation of the app’s folder and routing structure
src/
│
├── routes/              → All application routes (file-based routing)
│   ├── __root.tsx       → Root layout (Header + Outlet)
│   ├── index.tsx        → Home page (Todo list)
│   ├── todos/
│   │   ├── new.tsx      → Create new Todo
│   │   └── $todoId.tsx  → Todo Details page
│   ├── categories.tsx   → Categories list page
│   ├── categories/
│   │   └── $categoryId.tsx → Todos filtered by category
│   ├── profile.tsx      → Profile tab
│   └── settings.tsx     → Settings tab (Theme toggle)
│
├── components/          → Reusable UI components
│   └── Header.tsx       → Side navigation menu
│
├── store/
│   └── todoStore.ts     → Zustand global state (todos, categories, theme)
│
├── main.tsx             → App entry point & RouterProvider
└── styles.css           → Global styles

## Assumptions made during development
-No backend is used; all data is stored in localStorage
-Each Todo belongs to one category
-Deleting a category automatically deletes all its todos (cascade delete)
-User profile data is hardcoded (as required)

## List and explanation of additional libraries used
-nanoid: Generate unique IDs for todos and categories
-lucide-react: Icons for navigation and action buttons


## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling.


```
## Routing
This project uses [TanStack Router](https://tanstack.com/router). The initial setup is a file based router. Which means that the routes are managed as files in `src/routes`.
