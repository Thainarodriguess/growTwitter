import React from 'react'
import { Paper, BottomNavigation, BottomNavigationAction, Avatar, Box } from '@mui/material'
import { Home, Tag, Person, HomeOutlined, TagOutlined, PersonOutlined } from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../store/store.hooks'

interface BottomNavBarProps {
  userHandle: string | null
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ userHandle }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { imageUrl: accountImage } = useAppSelector((state) => state.auth)

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue)
  }

  const getIcon = (path: string, type: 'home' | 'explore' | 'profile') => {
    const isActive = location.pathname === path
    
    switch (type) {
      case 'home':
        return isActive ? <Home sx={{ fontSize: 28 }} /> : <HomeOutlined sx={{ fontSize: 28 }} />
      case 'explore':
        return isActive ? <Tag sx={{ fontSize: 28 }} /> : <TagOutlined sx={{ fontSize: 28 }} />
      case 'profile':
        return (
          <Avatar 
            src={accountImage || undefined} 
            sx={{ 
              width: 28, 
              height: 28, 
              border: isActive ? '2px solid' : 'none',
              borderColor: 'text.primary'
            }} 
          />
        )
    }
  }

  return (
    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
      <Paper 
        sx={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          zIndex: 1000,
          borderTop: '1px solid',
          borderColor: 'divider',
          boxShadow: 'none'
        }} 
        elevation={0}
      >
        <BottomNavigation
          value={location.pathname}
          onChange={handleChange}
          showLabels={false}
          sx={{ height: 64, bgcolor: 'background.paper' }}
        >
          <BottomNavigationAction
            value="/"
            icon={getIcon('/', 'home')}
            sx={{ color: 'text.primary' }}
          />
          <BottomNavigationAction
            value="/explore"
            icon={getIcon('/explore', 'explore')}
            sx={{ color: 'text.primary' }}
          />
          <BottomNavigationAction
            value={`/profile/${userHandle}`}
            icon={getIcon(`/profile/${userHandle}`, 'profile')}
            sx={{ color: 'text.primary' }}
          />
        </BottomNavigation>
      </Paper>
    
      <Box sx={{ height: 64 }} />
    </Box>
  )
}