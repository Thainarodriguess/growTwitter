import { createTheme } from '@mui/material/styles'

export const dark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1d9bf0',
    },
    background: {
      default: '#000000',
      paper: '#000000',
    },
    text: {
      primary: '#e7e9ea',
      secondary: '#71767b',
    },
    divider: '#2f3336',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 99,
        },
      },
    },
  },
})