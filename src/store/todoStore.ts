import { create } from 'zustand'

export type Todo = {
  id: string
  title: string
  description: string
  category: string   // category ID
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

  addTodo: (todo: Todo) => void
  updateTodo: (todo: Todo) => void
  removeTodo: (id: string) => void

  addCategory: (category: Category) => void
  updateCategory: (category: Category) => void
  removeCategory: (id: string) => void
}

export const useTodoStore = create<TodoStore>((set) => ({
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
}))


