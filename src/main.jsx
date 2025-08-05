import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'
import { WorldProvider } from './context/WorldContext.jsx'
import { NotificationProvider } from './context/NotificationContext.jsx'
import { MarkersProvider } from './context/MarkersContext.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { UiProvider } from './context/UiContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
    <ThemeProvider>
      <UiProvider>
    <NotificationProvider>
      
        <MarkersProvider>
          <WorldProvider>
            <App />
          </WorldProvider>
        </MarkersProvider>
      
    </NotificationProvider>
    </UiProvider>
    </ThemeProvider>
    </UserProvider>

  </StrictMode>,
)
