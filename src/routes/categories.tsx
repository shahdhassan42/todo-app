import { createFileRoute } from '@tanstack/react-router'
import { useTodoStore } from '../store/todoStore'
import { useState } from 'react'
import { nanoid } from 'nanoid'

export const Route = createFileRoute('/categories')({
  component: CategoriesPage,
})

function CategoriesPage() {
  const categories = useTodoStore((s) => s.categories)
  const addCategory = useTodoStore((s) => s.addCategory)
  const removeCategory = useTodoStore((s) => s.removeCategory)

  const [name, setName] = useState('')

  return (
    <div className="p-8 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      <div className="flex gap-2 mb-6">
        <input
          className="border p-2 rounded w-full"
          placeholder="New category..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={() => {
            if (!name.trim()) return
            addCategory({ id: nanoid(), name })
            setName('')
          }}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {categories.map((c) => (
          <li
            key={c.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            {c.name}
            <button
              onClick={() => removeCategory(c.id)}
              className="text-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}



