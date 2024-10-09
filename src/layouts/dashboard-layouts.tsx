import * as React from 'react'
import { useAuth } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import Layout from '@/components/layout/Layout'

export default function DashboardLayout() {
  const { userId, isLoaded } = useAuth()
  const navigate = useNavigate()


  React.useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/')
    }
  }, [isLoaded])

  if (!isLoaded) return 'Loading...'

  return <Layout/>
}