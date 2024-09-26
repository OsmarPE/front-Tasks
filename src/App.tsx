import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Main from './components/main/Main';
import Layout from './components/layout/Layout';
import MainLanding from './components/landing/MainLanding';
import { ThemeProvider } from './components/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TasksMain from './pages/TasksPage';

function App() {

  const queryClient = new QueryClient()

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLanding />,
    },
    {
      path: "/main",
      element: <Layout />,
      children: [
        {
          element: <Navigate to="/main/projects" />,
          index: true,
        },
        {
          path:'projects',
          element: <Main />,
        },
        {
        
          path:'list',
          element: <TasksMain/>
        }
      ]
    },

  ]);


  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
