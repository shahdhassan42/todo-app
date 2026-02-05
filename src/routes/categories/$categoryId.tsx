import { createFileRoute } from '@tanstack/react-router'
import { useTodoStore } from '../../store/todoStore'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/categories/$categoryId')({
  component: CategoryTodosPage,
})

function CategoryTodosPage() {
  const { categoryId } = Route.useParams()

  // Find the category by ID
  const category = useTodoStore((s) =>
    s.categories.find((c) => c.id === categoryId)
  )

  // Get all todos belonging to this category
  const todos = useTodoStore((s) =>
    s.todos.filter((t) => t.category === categoryId)
  )

  // If the category doesn't exist, show an error message
  if (!category) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Category not found</h1>
        <p className="mb-4">The category with ID "{categoryId}" does not exist.</p>
        <Link 
          to="/categories" 
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          ← Back to Categories
        </Link>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Todos in "{category.name}"</h1>
        <div className="flex items-center gap-4">
          <Link 
            to="/categories" 
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            ← Back to Categories
          </Link>
          <span className="text-gray-500 dark:text-gray-400">
            {todos.length} {todos.length === 1 ? 'todo' : 'todos'}
          </span>
        </div>
      </div>

      {todos.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 mb-4">No todos in this category yet.</p>
          <Link 
            to="/todos/new" 
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Create your first todo →
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {todos.map((t) => (
            <li key={t.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow dark:border-gray-700 dark:bg-gray-800">
              <Link 
                to="/todos/$todoId" 
                params={{ todoId: t.id }}
                className="block"
              >
                <h3 className="text-lg font-semibold dark:text-white mb-2">{t.title}</h3>
                
                {t.description && (
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                    {t.description}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
