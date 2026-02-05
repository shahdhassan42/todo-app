import { createFileRoute } from '@tanstack/react-router'
import { useTodoStore } from '../store/todoStore'

export const Route = createFileRoute('/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  const theme = useTodoStore((s) => s.theme)
  const toggleTheme = useTodoStore((s) => s.toggleTheme)
const darkMode = theme === 'dark'

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-xl p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Settings</h1>

        <div className="flex items-center justify-center gap-4">
          <span>Light</span>

          <div
           onClick={toggleTheme}
            className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors duration-300 ${
              darkMode ? 'bg-indigo-600' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-300 ${
                darkMode ? 'left-6' : 'left-0.5'
              }`}
            />
          </div>

          <span>Dark</span>
        </div>
      </div>
    </div>
  )
}
