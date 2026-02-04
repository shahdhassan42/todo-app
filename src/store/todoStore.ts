import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'

export type Todo = {
  id: string
  title: string
  description: string
  category: string
  date: string
  completed: boolean
}

export type Category = {
  id: string
  name: string
}

type TodoStore = {
  todos: Todo[]
  categories: Category[]
  theme: Theme
  addTodo: (todo: Todo) => void
  updateTodo: (todo: Todo) => void
  removeTodo: (id: string) => void
  addCategory: (category: Category) => void
  updateCategory: (category: Category) => void
  removeCategory: (id: string) => void
  toggleTheme: () => void
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      categories: [],

      addTodo: (todo) =>
        set((state) => ({ todos: [...state.todos, todo] })),

      updateTodo: (updatedTodo) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === updatedTodo.id ? updatedTodo : t
          ),
        })),

      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((t) => t.id !== id),
        })),

      addCategory: (category) =>
        set((state) => ({ categories: [...state.categories, category] })),

      updateCategory: (updatedCategory) =>
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === updatedCategory.id ? updatedCategory : c
          ),
        })),

      removeCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
          todos: state.todos.filter((t) => t.category !== id), // cascade delete
        })),

      theme: 'light',

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: 'todo-storage',
    }
  )
)
