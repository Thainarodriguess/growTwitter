import { Box, Typography, List, ListItem, ListItemText, ListItemButton, Paper } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useAppSelector } from '../store/store.hooks'

interface Trend {
  category: string
  title: string
  tweetsCount: string
}

const dummyTrends: Trend[] = [
  { category: 'Esportes · Em alta', title: 'Neymar', tweetsCount: '125 mil posts' },
  { category: 'Política · Assunto do Momento', title: 'Brasil', tweetsCount: '85,4 mil posts' },
  { category: 'Entretenimento · Em alta', title: 'React.js', tweetsCount: '12,1 mil posts' },
  { category: 'Tecnologia · Assunto do Momento', title: 'TypeScript', tweetsCount: '45 mil posts' },
]

export function TrendingSection() {

  const themeMode = useAppSelector((state) => state.theme.mode)

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        bgcolor: '#f7f9f9', 
        borderRadius: 4, 
        overflow: 'hidden',
        mb: 2 
      }}
    >
      <Typography variant="h6" sx={{ p: 2, fontWeight: 800, fontSize: '1.25rem' }}>
        O que está acontecendo
      </Typography>

      <List sx={{ p: 0 }}>
        {dummyTrends.map((trend, index) => (
          <ListItem 
            key={index} 
            disablePadding 
            secondaryAction={
              <MoreHorizIcon sx={{ color: 'text.secondary', fontSize: '1.2rem' }} />
            }
          >
            <ListItemButton sx={{ py: 1.5, px: 2, flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography variant="caption" color="text.secondary">
                {trend.category}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 700, my: 0.2 }}>
                {trend.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {trend.tweetsCount}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <ListItemButton sx={{ p: 2 }}>
        <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>
          Mostrar mais
        </Typography>
      </ListItemButton>
    </Paper>
  )
}