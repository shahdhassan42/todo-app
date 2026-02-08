import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useTodoStore } from '../../store/todoStore'
import { useState } from 'react'
import { Edit, Delete } from 'lucide-react'

export const Route = createFileRoute('/todos/$todoId')({
  component: TodoDetailsPage,
})

function TodoDetailsPage() {
  const navigate = useNavigate()
  const { todoId } = Route.useParams()
  const todos = useTodoStore((s) => s.todos)
  const deleteTodo = useTodoStore((s) => s.removeTodo)
  const updateTodo = useTodoStore((s) => s.updateTodo)

  const todo = todos.find((t) => t.id === todoId)
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(todo?.title || '')
  const [desc, setDesc] = useState(todo?.description || '')
  //Handle case when todo is not found
  if (!todo) return <p className="p-6">Todo not found</p>

  const save = () => {
    updateTodo({ ...todo, title, description: desc })
    setEditing(false)
  }

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-xl p-8">
        {/*Todo details with edit and delete functionality*/}
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
              <Edit size={16} className="inline-block mr-1" />
              Edit
            </button>
            <button
              onClick={() => {
                deleteTodo(todo.id)
                alert('Deleted!')
                navigate({ to: '/' })
              }}
              className="bg-red-600 text-white px-4 rounded"
            >
              <Delete size={16} className="inline-block mr-1" />
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  )
}
