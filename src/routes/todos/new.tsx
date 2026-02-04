import { createFileRoute } from '@tanstack/react-router'
import { Route as RootRoute } from '../../routes/__root'
import { useState } from 'react'
import { useTodoStore, type Category } from '../../store/todoStore'
import { v4 as uuidv4 } from 'uuid'

export const Route = createFileRoute('/todos/new')({
  component: () => {
    const addTodo = useTodoStore((state: any) => state.addTodo)
    const categories = useTodoStore((state: any) => state.categories)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState(categories[0]?.id || '')

    const handleSubmit = () => {
      if (!title) return alert('Title is required')

      addTodo({
        id: uuidv4(),
        title,
        description,
        category,
        date: new Date().toISOString(),
      })
      alert('Todo added!')
    }

    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Add Todo</h1>
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
    )
  },
})



