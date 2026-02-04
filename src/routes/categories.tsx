import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/categories')({
  component: CategoriesPage,
})


function CategoriesPage() {
  return (
    <div className="p-8 text-2xl font-bold">
      Categories Page
    </div>
  )
}





