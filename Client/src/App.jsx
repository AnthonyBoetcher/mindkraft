import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('Loading...')

  const apiUrl = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    fetch(`${apiUrl}/api/hello`) // Update this if your backend route is different
      .then(res => res.json())
      .then(data => setMessage(data.message || JSON.stringify(data)))
      .catch(err => {
        console.error('Failed to fetch from backend:', err)
        setMessage('Error fetching from backend')
      })
  }, [])

  return (
    <div>
      <h1>Frontend Connected</h1>
      <p>Backend says: {message}</p>
    </div>
  )
}

export default App
