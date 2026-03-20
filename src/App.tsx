import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'

import { FeedPage } from './pages/FeedPage'
import { AuthLogin } from './pages/AuthLogin'
import { UserProfile } from './pages/UserProfile'
import { DiscoverUsers } from './pages/DiscoverUsers'
import { AuthRegister } from './pages/AuthRegister'
import { ProtectedLayout } from './components/ProtectedLayout'

import { useAppSelector } from './store/store.hooks'
import themes from './theme'

export function App() {
  const themeMode = useAppSelector((state) => state.theme.mode)

  return (
    <ThemeProvider theme={themes[themeMode]}>
      <CssBaseline />

      <Routes>
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/register" element={<AuthRegister />} />

        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<FeedPage />} />
          <Route path="/profile/:userId" element={<UserProfile />} />
          <Route path="/explore" element={<DiscoverUsers />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  )
}  
