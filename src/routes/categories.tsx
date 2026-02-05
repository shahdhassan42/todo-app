import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { useTodoStore } from '../store/todoStore'
import { useState } from 'react'
import { nanoid } from 'nanoid'

export const Route = createFileRoute('/categories')({
  component: CategoriesPage,
})

function CategoriesPage() {
  const categories = useTodoStore((s) => s.categories)
  const todos = useTodoStore((s) => s.todos)
  const addCategory = useTodoStore((s) => s.addCategory)
  const removeCategory = useTodoStore((s) => s.removeCategory)
  const updateCategory = useTodoStore((s) => s.updateCategory)

  const [name, setName] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')

  const getTodoCountForCategory = (categoryId: string) =>
    todos.filter((t) => t.category === categoryId).length

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Categories</h1>

      {/* Add new category */}
      <div className="flex gap-2 mb-8">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New category name..."
          className="border p-3 rounded-lg w-full"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && name.trim()) {
              addCategory({ id: nanoid(), name })
              setName('')
            }
          }}
        />
        <button
          onClick={() => {
            if (!name.trim()) return
            addCategory({ id: nanoid(), name })
            setName('')
          }}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* Category list */}
      <ul className="space-y-3">
        {categories.map((c) => (
          <li
            key={c.id}
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors flex justify-between items-center"
          >
            {editingId === c.id ? (
              /* Editing mode */
              <div className="flex flex-1 gap-2">
                <input
                  className="border p-2 rounded flex-1"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && editingName.trim()) {
                      updateCategory({ id: c.id, name: editingName })
                      setEditingId(null)
                      setEditingName('')
                    }
                  }}
                />
                <button
                  onClick={() => {
                    if (!editingName.trim()) return
                    updateCategory({ id: c.id, name: editingName })
                    setEditingId(null)
                    setEditingName('')
                  }}
                  className="bg-green-600 text-white px-3 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditingId(null)
                    setEditingName('')
                  }}
                  className="bg-gray-400 text-white px-3 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              /* Normal mode: category link + action buttons */
              <>
                <Link
                  to="/categories/$categoryId"
                  params={{ categoryId: c.id }}
                  className="flex-1 block"
                >
                  <h3 className="font-semibold text-lg">{c.name}</h3>
                  <p className="text-gray-600 text-sm">
                    {getTodoCountForCategory(c.id)}{' '}
                    {getTodoCountForCategory(c.id) === 1 ? 'todo' : 'todos'}
                  </p>
                </Link>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => {
                      setEditingId(c.id)
                      setEditingName(c.name)
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete "${c.name}"?`)) removeCategory(c.id)
                    }}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      <Outlet />
    </div>
  )
}
