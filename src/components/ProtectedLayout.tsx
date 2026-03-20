import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import { useAppSelector, useAppDispatch } from '../store/store.hooks'
import { logout } from '../store/slices/auth.slice'
import { NavigationSideBar } from './NavigationSideBar'

export const ProtectedLayout: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { isLoggedIn, id } = useAppSelector((state) => state.auth)

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', gap: 2 }}>
        {!isMobile && (
          <Box sx={{ width: '25%' }}>
            <NavigationSideBar
              userHandle={id}
              onSignOut={handleLogout}
            />
          </Box>
        )}

        <Box sx={{ flex: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </Container>
  )
}