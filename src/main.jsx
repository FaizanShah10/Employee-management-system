import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthContext from './Components/Context/AuthContext.jsx'
import TaskContext from './Components/Context/TaskContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContext>
      <TaskContext>
        <App />
      </TaskContext>
    </AuthContext>
  </StrictMode>,
)
