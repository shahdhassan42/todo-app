import { createFileRoute } from '@tanstack/react-router'
import { useTodoStore } from '../../store/todoStore'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/categories/$categoryId')({
  component: CategoryTodosPage,
})

function CategoryTodosPage() {
  const { categoryId } = Route.useParams()

  const category = useTodoStore((s) =>
    s.categories.find((c) => c.id === categoryId)
  )

  const todos = useTodoStore((s) =>
    s.todos.filter((t) => t.category === categoryId)
  )

  if (!category) return <p className="p-6">Category not found</p>

  return (
    <div className="p-8 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Todos in "{category.name}"</h1>

      {todos.length === 0 ? (
        <p>No todos in this category yet.</p>
      ) : (
        <ul className="space-y-2">
          {todos.map((t) => (
            <li key={t.id} className="border p-2 rounded flex justify-between items-center">
              <Link to="/todos/$todoId" params={{ todoId: t.id }} className="flex-1">{t.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
