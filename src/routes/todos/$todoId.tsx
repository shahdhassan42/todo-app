import { createFileRoute } from '@tanstack/react-router'
import { useTodoStore } from '../../store/todoStore'
import { useState } from 'react'

export const Route = createFileRoute('/todos/$todoId')({
  component: TodoDetailsPage,
})

function TodoDetailsPage() {
  const { todoId } = Route.useParams()
  const todos = useTodoStore((s) => s.todos)
  const deleteTodo = useTodoStore((s) => s.removeTodo)
  const updateTodo = useTodoStore((s) => s.updateTodo)

  const todo = todos.find((t) => t.id === todoId)
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(todo?.title || '')
  const [desc, setDesc] = useState(todo?.description || '')

  if (!todo) return <p className="p-6">Todo not found</p>

  const save = () => {
    updateTodo({ ...todo, title, description: desc })
    setEditing(false)
  }

  return (
    <div className="p-8 max-w-lg">
      {editing ? (
        <>
          <input className="border p-2 w-full mb-2" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea className="border p-2 w-full mb-2" value={desc} onChange={(e) => setDesc(e.target.value)} />
          <button onClick={save} className="bg-green-600 text-white px-4 rounded mr-2">
            Save
          </button>
          <button onClick={() => setEditing(false)} className="bg-gray-400 text-white px-4 rounded">
            Cancel
          </button>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-2">{todo.title}</h1>
          <p className="mb-2">{todo.description}</p>
          <p className="mb-2">Date: {new Date(todo.date).toLocaleString()}</p>
          <button onClick={() => setEditing(true)} className="bg-yellow-500 text-white px-4 rounded mr-2">
            Edit
          </button>
          <button
            onClick={() => {
              deleteTodo(todo.id)
              alert('Deleted!')
            }}
            className="bg-red-600 text-white px-4 rounded"
          >
            Delete
          </button>
        </>
      )}
    </div>
  )
}
