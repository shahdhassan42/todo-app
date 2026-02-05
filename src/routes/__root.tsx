import { Outlet, createRootRoute, useRouter } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import Header from '../components/Header'
import { useTodoStore } from '../store/todoStore'
import { useEffect } from 'react'


export const Route = createRootRoute({
  component: () => {

const theme = useTodoStore((s) => s.theme)
    const router = useRouter() // Add this for debugging

    useEffect(() => {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      
      // Debug: Log route changes
      const unsubscribe = router.subscribe('onBeforeNavigate', (e) => {
        console.log('Navigation attempt:', e.toLocation.href)
      })
      
      return () => unsubscribe()
    }, [theme, router])

    return (
      <>
        <Header />
        <Outlet />
        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[{ name: 'Tanstack Router', render: <TanStackRouterDevtoolsPanel /> }]}
        />
      </>
    )
  },
})