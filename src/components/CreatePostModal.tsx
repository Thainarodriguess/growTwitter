import { 
  Modal, 
  Box, 
  IconButton, 
  TextField, 
  Button, 
  Stack, 
  Avatar, 
  Typography,
  CircularProgress
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import { useAuth } from '../store/store.hooks' 
import api from '../services/api'

interface CreatePostModalProps {
  open: boolean
  onClose: () => void
  onPostSuccess?: () => void
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '95%', sm: 600 },
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: 2,
  outline: 'none',
  minHeight: '200px'
}

export function CreatePostModal({ open, onClose, onPostSuccess }: CreatePostModalProps) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const { imageUrl } = useAuth()

  const handlePost = async () => {
    if (!content.trim() || content.length > 280) return

    setLoading(true)
    try {
      await api.post('/tweets', { 
        content: content.trim() 
      })

      setContent('')
      onClose()
      if (onPostSuccess) {
        onPostSuccess()
      } else {
        window.location.reload()
      }

    } catch (error) {
      console.error('Erro ao postar:', error)
      alert('Falha ao publicar o tweet. Verifique sua conexão ou login.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <IconButton onClick={onClose} size="small" disabled={loading}>
            <CloseIcon />
          </IconButton>
          <Button 
            variant="contained" 
            disabled={!content.trim() || content.length > 280 || loading} 
            onClick={handlePost}
            sx={{ 
              borderRadius: 99, 
              boxShadow: 'none',
              fontWeight: 700,
              textTransform: 'none',
              px: 3,
              '&.Mui-disabled': { bgcolor: 'primary.main', opacity: 0.5, color: 'white' }
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Postar'}
          </Button>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Avatar src={imageUrl || ''} sx={{ width: 48, height: 48 }} />
          <Box sx={{ width: '100%' }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="O que está acontecendo?"
              variant="standard"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              InputProps={{ disableUnderline: true }}
              disabled={loading}
              sx={{ 
                '& .MuiInputBase-root': { fontSize: '1.2rem' }
              }}
            />
          </Box>
        </Stack>
        <Typography 
          variant="caption" 
          sx={{ 
            display: 'block', 
            textAlign: 'right', 
            mt: 2, 
            fontWeight: 600,
            color: content.length > 280 ? 'error.main' : 'text.secondary' 
          }}
        >
          {content.length}/280
        </Typography>
      </Box>
    </Modal>
  )
}