import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

// Import the layouts
import RootLayout from './layouts/root-layouts'
import DashboardLayout from './layouts/dashboard-layouts'
import Main from '@/components/main/Main'
// Import the components
import SignInPage from './routes/sign-in'
import SignUpPage from './routes/sign-up'
import { ThemeProvider } from './components/theme-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MainLanding from './components/landing/MainLanding'
import TasksMain from './pages/TasksPage';

const queryClient = new QueryClient()


const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <MainLanding /> },
      { path: '/sign-in/*', element: <SignInPage /> },
      { path: '/sign-up/*', element: <SignUpPage /> },
      {
        element: <DashboardLayout />,
        path: 'main',
        children: [
          {  index:true , element: <Navigate to={'projects'} replace /> },
          {  path:'projects' , element: <Main /> },
          { path:'list', element: <TasksMain  />}
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
)