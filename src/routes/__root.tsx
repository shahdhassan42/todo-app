import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import Header from '../components/Header'
import { useTodoStore } from '../store/todoStore'
import { useEffect } from 'react'


export const Route = createRootRoute({
  component: () => {

const theme = useTodoStore((s) => s.theme)

    useEffect(() => {
      document.body.classList.remove('dark', 'light')
      document.body.classList.add(theme)},[theme])
      
      

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