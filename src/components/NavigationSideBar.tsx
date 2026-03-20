import React, { useState } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Stack,
} from '@mui/material'

import { Home, Tag, Person, Twitter, Logout } from '@mui/icons-material'

import { CreatePostModal } from './CreatePostModal'
import { useAppSelector } from '../store/store.hooks'
import { ThemeToggle } from './ThemeToggle'

interface NavigationSideBarProps {
  userHandle: string | null
  onSignOut: () => void
}

const baseRoutes = [
  { label: 'Home', icon: <Home sx={{ fontSize: 28 }} />, url: '/' },
  { label: 'Explore', icon: <Tag sx={{ fontSize: 28 }} />, url: '/explore' },
]

export const NavigationSideBar: React.FC<NavigationSideBarProps> = ({
  userHandle,
  onSignOut,
}) => {
  const currentPath = useLocation()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { name: accountName, imageUrl: accountImage } = useAppSelector(
    (state) => state.auth
  )

  const menuItems = [
    ...baseRoutes,
    {
      label: 'Profile',
      icon: <Person sx={{ fontSize: 28 }} />,
      url: `/profile/${userHandle}`,
    },
  ]

  return (
    <Box
      sx={{
        height: '100vh',
        position: 'sticky',
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        px: 2,
        py: 1,
      }}
    >
      <Box>
        <Box
          sx={{
            pl: 1.5,
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Twitter sx={{ fontSize: 35, color: 'primary.main' }} />
          <ThemeToggle />
        </Box>

        <List disablePadding>
          {menuItems.map((item) => {
            const isCurrent = currentPath.pathname === item.url

            return (
              <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  component={RouterLink}
                  to={item.url}
                  sx={{
                    borderRadius: 99,
                    py: 1.5,
                    px: 2.5,
                    transition: '0.2s',
                    bgcolor: isCurrent ? 'action.selected' : 'transparent',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 45, color: 'text.primary' }}>
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      variant: 'h6',
                      fontWeight: isCurrent ? 800 : 400,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>

        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={() => setIsModalOpen(true)}
          sx={{
            mt: 2,
            py: 1.5,
            borderRadius: 99,
            fontWeight: 'bold',
            fontSize: '1.1rem',
            textTransform: 'none',
            boxShadow: 'none',
          }}
        >
          Post
        </Button>
      </Box>

      <Stack spacing={2} sx={{ mb: 3 }}>
        <Box
          onClick={onSignOut}
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 1.5,
            borderRadius: 99,
            cursor: 'pointer',
            transition: '0.2s',
            '&:hover': { bgcolor: 'action.hover' },
          }}
        >
          <Avatar
            src={accountImage || undefined}
            alt={accountName || ''}
            sx={{ width: 40, height: 40, mr: 1.5 }}
          />

          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography variant="body2" fontWeight="bold" noWrap>
              {accountName || userHandle}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              @{userHandle}
            </Typography>
          </Box>

          <Logout color="action" />
        </Box>
      </Stack>

      <CreatePostModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Box>
  )
}