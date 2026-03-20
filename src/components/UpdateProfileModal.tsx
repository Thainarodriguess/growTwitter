import { 
  Modal, 
  Box, 
  IconButton, 
  TextField, 
  Button, 
  Stack, 
  Avatar, 
  Typography,
  Tooltip
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import { useState, useEffect } from 'react'
import { useAuth, useAppDispatch } from '../store/store.hooks'
import { updateUserInfo } from '../store/slices/auth.slice'

interface UpdateProfileModalProps {
  open: boolean
  onClose: () => void
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '95%', sm: 550 },
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: 0, 
  outline: 'none',
  overflow: 'hidden'
}

export function UpdateProfileModal({ open, onClose }: UpdateProfileModalProps) {
  const dispatch = useAppDispatch()
  const { name, imageUrl } = useAuth()
  
  const [formData, setFormData] = useState({
    name: '',
    imageUrl: ''
  })

  useEffect(() => {
    if (open) {
      setFormData({
        name: name || '',
        imageUrl: imageUrl || ''
      })
    }
  }, [open, name, imageUrl])

  const handleSave = () => {

    dispatch(updateUserInfo({ 
      name: formData.name, 
      imageUrl: formData.imageUrl 
    }))
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>

        <Stack 
          direction="row" 
          alignItems="center" 
          justifyContent="space-between" 
          sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontSize: '1.25rem' }}>
              Editar perfil
            </Typography>
          </Stack>
          <Button 
            variant="contained" 
            onClick={handleSave}
            disabled={!formData.name.trim()}
            sx={{ 
              borderRadius: 99, 
              bgcolor: 'text.primary', 
              color: 'background.paper',
              '&:hover': { bgcolor: 'rgba(15, 20, 25, 0.9)' },
              boxShadow: 'none',
              textTransform: 'none',
              fontWeight: 700
            }}
          >
            Salvar
          </Button>
        </Stack>

        <Box sx={{ p: 3 }}>
  
          <Box sx={{ position: 'relative', width: 100, height: 100, mb: 4, mx: 'auto' }}>
            <Avatar 
              src={formData.imageUrl} 
              sx={{ 
                width: 100, 
                height: 100, 
                border: '4px solid', 
                borderColor: 'background.paper',
                filter: 'brightness(0.7)' 
              }} 
            />
            <Tooltip title="Alterar foto">
              <IconButton 
                component="label"
                sx={{ 
                  position: 'absolute', 
                  top: '50%', 
                  left: '50%', 
                  transform: 'translate(-50%, -50%)',
                  color: 'white'
                }}
              >
                <CameraAltIcon />
                <input hidden accept="image/*" type="file" />
              </IconButton>
            </Tooltip>
          </Box>

          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Nome"
              variant="outlined"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              fullWidth
              label="URL da Foto (opcional)"
              variant="outlined"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://exemplo.com/foto.jpg"
            />
          </Stack>
        </Box>
      </Box>
    </Modal>
  )
}