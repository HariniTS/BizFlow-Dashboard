import { useEffect } from 'react'
import AppRoutes from './routes/AppRoutes'
import { useThemeStore } from './store/themeStore'

function App() {
  const theme = useThemeStore((state) => state.theme)

  useEffect(() => {
    document.documentElement.classList.toggle(
      'dark',
      theme === 'dark'
    )
  }, [theme])

  return <AppRoutes />
}

export default App