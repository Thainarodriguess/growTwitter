import { useEffect, useState } from 'react'
import {
  Box,
  CircularProgress,
  Typography,
  Stack,
} from '@mui/material'
import api from '../services/api'
import { useAuth } from '../store/store.hooks'
import { FeedPost } from '../components/FeedPost'
import type { Tweet } from '../types'

export function FeedPage() {
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [loading, setLoading] = useState(true)
  const { token } = useAuth()

  const fetchTweets = async () => {
    try {
      setLoading(true)

      const response = await api.get('/feed') 
    
      setTweets(Array.isArray(response.data) ? response.data : [])
    } catch (error) {
      console.error('Erro ao buscar tweets do feed:', error)
      setTweets([]) 
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchTweets()
    }
  }, [token]) 

  return (
    <Box sx={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          bgcolor: 'background.paper',
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="h6" fontWeight={800}>
          Página Inicial
        </Typography>
      </Box>

      {loading ? (
        <Stack alignItems="center" sx={{ mt: 4 }}>
          <CircularProgress size={30} />
        </Stack>
      ) : (
        <Box>
          {tweets && tweets.length > 0 ? (
            tweets.map((tweet) => (
              <FeedPost 
                key={tweet.id} 
                data={tweet} 
              />
            ))
          ) : (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                Nenhum tweet encontrado no seu feed. 
                Siga alguns usuários para ver postagens aqui!
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}