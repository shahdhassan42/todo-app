import { createFileRoute } from '@tanstack/react-router'
import { useTodoStore } from '../store/todoStore'
import { useState } from 'react'
import { nanoid } from 'nanoid'
import { Link } from '@tanstack/react-router'
import { Route as CategoryRoute } from './categories/$categoryId'

export const Route = createFileRoute('/categories')({
  component: CategoriesPage,
})

function CategoriesPage() {
  const categories = useTodoStore((s) => s.categories)
  const addCategory = useTodoStore((s) => s.addCategory)
  const removeCategory = useTodoStore((s) => s.removeCategory)
  const updateCategory = useTodoStore((s) => s.updateCategory)

  const [name, setName] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')

  return (
    <div className="p-8 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      <div className="flex gap-2 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New category..."
          className="border p-2 rounded w-full"
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
          <li key={c.id} className="flex justify-between items-center border p-2 rounded">
            {editingId === c.id ? (
              <>
                <input
                  className="border p-1 rounded mr-2 flex-1"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                />
                <button
                  onClick={() => {
                    if (!editingName.trim()) return
                    updateCategory({ id: c.id, name: editingName })
                    setEditingId(null)
                    setEditingName('')
                  }}
                  className="bg-green-600 text-white px-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-400 text-white px-2 rounded ml-1"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
          <Link
  to={`/categories/${c.id}` as any}
  className="flex-1 text-blue-600 hover:underline"
>
  {c.name}
</Link>


                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingId(c.id)
                      setEditingName(c.name)
                    }}
                    className="bg-yellow-500 text-white px-2 rounded"
                  >
                    Edit
                  </button>
                  <button onClick={() => removeCategory(c.id)} className="text-red-600">
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
