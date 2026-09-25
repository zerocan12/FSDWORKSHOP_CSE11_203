
import { useState } from 'react'
import ApiTester from './components/ApiTester.jsx'
import Signup from './components/Signup.jsx'

function App() {
  const [page, setPage] = useState('signup')

  if (page === 'api-tester') {
    return <ApiTester />
  }

  return (
    <Signup
      onSuccess={() => setPage('api-tester')}
      onOpenApiTester={() => setPage('api-tester')}
    />
  )
}

export default App