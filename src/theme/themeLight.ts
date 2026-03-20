import { createTheme } from '@mui/material/styles'

export const light = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1d9bf0',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff', 
      paper: '#ffffff',   
    },
    text: {
      primary: '#0f1419',   
      secondary: '#536471', 
    },
    divider: '#eff3f4',
    action: {
      hover: 'rgba(15, 20, 25, 0.03)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 700,
    },
    button: {
      textTransform: 'none', 
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 99, 
          padding: '8px 16px',
        },
      },
    },
  },
})