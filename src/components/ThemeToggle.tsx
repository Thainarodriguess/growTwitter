import React from 'react'
import { IconButton, useTheme, Tooltip } from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../store/slices/theme.slice'
import type { RootState } from '../store/index'

export const ThemeToggle: React.FC = () => {
  const activeTheme = useTheme()
  const runAction = useDispatch()

  const selectedMode = useSelector((state: RootState) => state.theme.mode)

  return (
    <Tooltip
      title={`Switch to ${selectedMode === 'light' ? 'Dark' : 'Light'} theme`}
    >
      <IconButton
        onClick={() => runAction(toggleTheme())}
        color="inherit"
        sx={{ ml: 1 }}
      >
        {activeTheme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  )
}