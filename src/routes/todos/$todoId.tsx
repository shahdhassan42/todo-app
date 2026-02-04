import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useTodoStore } from '../../store/todoStore'
import { useState } from 'react'

export const Route = createFileRoute('/todos/$todoId')({
  component: TodoDetailsPage,
})

function TodoDetailsPage() {
  const { todoId } = Route.useParams()
  const navigate = useNavigate()

  const todo = useTodoStore((s) =>
    s.todos.find((t) => t.id === todoId)
  )

  const updateTodo = useTodoStore((s) => s.updateTodo)
  const removeTodo = useTodoStore((s) => s.removeTodo)

  const [isEditing, setIsEditing] = useState(false)

  const [title, setTitle] = useState(todo?.title || '')
  const [description, setDescription] = useState(todo?.description || '')

  if (!todo) return <p className="p-6">Todo not found</p>

  return (
    <div className="p-8 max-w-xl">
      {!isEditing ? (
        <>
          <h1 className="text-2xl font-bold mb-2">{todo.title}</h1>
          <p className="mb-2 text-gray-600">{todo.description}</p>
          <p className="text-sm text-gray-500 mb-4">
            Created: {new Date(todo.date).toLocaleDateString()}
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>

            <button
              onClick={() => {
                removeTodo(todo.id)
                navigate({ to: '/' })
              }}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Edit Todo</h1>

          <input
            className="border p-2 w-full mb-3 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="border p-2 w-full mb-3 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex gap-3">
            <button
              onClick={() => {
                updateTodo({ ...todo, title, description })
                setIsEditing(false)
              }}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>

            <button
              onClick={() => {
                setTitle(todo.title)
                setDescription(todo.description)
                setIsEditing(false)
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  )
}



