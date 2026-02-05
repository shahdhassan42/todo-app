import { createFileRoute, Link } from '@tanstack/react-router'
import { useTodoStore } from '../store/todoStore'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const todos = useTodoStore((s) => s.todos)
  const categories = useTodoStore((s) => s.categories)

  return (
   <div className="min-h-screen flex justify-center">
  <div className="w-full max-w-2xl p-8">

      <h1 className="text-3xl font-bold mb-4">Todos</h1>

      <Link
        to="/todos/new"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Add Todo
      </Link>

      <ul className="mt-6 space-y-3">
        {todos.map((todo) => {
          const category = categories.find((c) => c.id === todo.category)

          return (
            <li key={todo.id} className="border p-4 rounded hover:bg-gray-50">
              <Link to="/todos/$todoId" params={{ todoId: todo.id }}>
                <h2 className="font-semibold">{todo.title}</h2>
                <p className="text-sm text-gray-600">
                  Category: {category?.name || 'None'}
                </p>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
    </div>
  )
}


