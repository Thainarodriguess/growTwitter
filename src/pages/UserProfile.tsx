import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Box, 
  Typography, 
  Avatar, 
  Button, 
  CircularProgress, 
  Stack, 
  Divider 
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { isAxiosError } from 'axios'

import api from '../services/api'
import { FeedPost } from '../components/FeedPost'
import { UpdateProfileModal } from '../components/UpdateProfileModal'
import { useAppSelector } from '../store/store.hooks'
import type { Tweet, User } from '../types'

export function UserProfile() {
  const { userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()
  
  const [user, setUser] = useState<User | null>(null)
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { id: loggedUserId } = useAppSelector((state) => state.auth)
  const isMyProfile = loggedUserId === userId

  const fetchProfileData = async () => {
    if (!userId) return
    
    try {
      setLoading(true)
      const [userRes, tweetsRes] = await Promise.all([
        api.get(`/users/${userId}`),
        api.get(`/users/${userId}/tweets`)
      ])
      
      setUser(userRes.data)
      setTweets(Array.isArray(tweetsRes.data) ? tweetsRes.data : [])
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 404) {
        console.error("Usuário não encontrado no banco")
      }
      console.error("Erro ao carregar perfil:", error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfileData()
  }, [userId])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
        <CircularProgress color="primary" />
      </Box>
    )
  }

  if (!user) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>Ops! Perfil não encontrado.</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          O usuário que você está procurando não existe ou o ID está incorreto.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')} sx={{ borderRadius: 99 }}>
          Voltar para a Home
        </Button>
      </Box>
    )
  }

  return (
    <Box>
      <Stack 
        direction="row" 
        alignItems="center" 
        spacing={3} 
        sx={{ 
          p: 1, 
          position: 'sticky', 
          top: 0, 
          bgcolor: 'rgba(255, 255, 255, 0.8)', 
          backdropFilter: 'blur(5px)',
          zIndex: 10 
        }}
      >
        <Button 
          onClick={() => navigate(-1)} 
          sx={{ minWidth: 40, borderRadius: '50%', height: 40, color: 'text.primary' }}
        >
          <ArrowBackIcon />
        </Button>
        <Box>
          <Typography variant="h6" fontWeight={800} sx={{ lineHeight: 1.2 }}>
            {user.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {tweets.length} Posts
          </Typography>
        </Box>
      </Stack>
      <Box sx={{ height: 180, bgcolor: 'grey.300' }} />
      <Box sx={{ px: 2, pb: 2, position: 'relative' }}>
        <Avatar 
          src={user.imageUrl || ''} 
          sx={{ 
            width: 130, 
            height: 130, 
            border: '4px solid', 
            borderColor: 'background.paper',
            mt: -8,
            mb: 1
          }} 
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: -6 }}>
          {isMyProfile ? (
            <Button 
              variant="outlined" 
              onClick={() => setIsEditModalOpen(true)}
              sx={{ borderRadius: 99, fontWeight: 700, textTransform: 'none', px: 3 }}
            >
              Editar perfil
            </Button>
          ) : (
            <Button 
              variant="contained" 
              color="primary"
              sx={{ borderRadius: 99, fontWeight: 700, textTransform: 'none', px: 3 }}
            >
              Seguir
            </Button>
          )}
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" fontWeight={800} sx={{ lineHeight: 1 }}>
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            @{user.username}
          </Typography>
        </Box>

        <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography variant="body2" fontWeight={700}>{user.followingCount || 0}</Typography>
            <Typography variant="body2" color="text.secondary">Seguindo</Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography variant="body2" fontWeight={700}>{user.followersCount || 0}</Typography>
            <Typography variant="body2" color="text.secondary">Seguidores</Typography>
          </Stack>
        </Stack>
      </Box>

      <Divider />

      <Box>
        {tweets.length > 0 ? (
          tweets.map((tweet) => (
            <FeedPost key={tweet.id} data={tweet} />
          ))
        ) : (
          <Box sx={{ p: 6, textAlign: 'center' }}>
            <Typography variant="h6" fontWeight={700}>
              @{user.username} ainda não postou nada
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Quando eles postarem, os tweets aparecerão aqui.
            </Typography>
          </Box>
        )}
      </Box>

      <UpdateProfileModal 
        open={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
      />
    </Box>
  )
}