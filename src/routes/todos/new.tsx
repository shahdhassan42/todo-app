import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useTodoStore, type Category } from '../../store/todoStore'
import { nanoid } from 'nanoid'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/todos/new')({
  component: () => {
    const addTodo = useTodoStore((state: any) => state.addTodo)
    const categories = useTodoStore((state: any) => state.categories)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState(categories[0]?.id || '')
    {/*adding todo with validation on title and alert on success*/ }
    const handleSubmit = () => {
      if (!title) return alert('Title is required')

      addTodo({
        id: nanoid(),
        title,
        description,
        category,
        date: new Date().toISOString(),
      })
      alert('Todo added!')
    }

    return (
      <div className="min-h-screen flex justify-center">
        <div className="w-full max-w-xl p-8">
          <h1 className="text-2xl font-bold mb-4">Add Todo</h1>
          <Link
            to="/"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            ← Back to Home
          </Link>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
          <select value={category} onChange={e => setCategory(e.target.value)} className="border p-2 mb-2 w-full">
            {categories.map((c: Category) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </div>
    )
  },
})



