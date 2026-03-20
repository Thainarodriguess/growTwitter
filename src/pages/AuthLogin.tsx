import React, { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Link,
  Stack,
  Alert
} from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { isAxiosError } from 'axios'

import api from '../services/api'
import { useAppDispatch } from '../store/store.hooks'
import { login } from '../store/slices/auth.slice'

export function AuthLogin() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const response = await api.post('/auth/login', {
        username: formData.email, 
        password: formData.password
      })

      dispatch(login(response.data))
      navigate('/')

    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || 'Erro ao fazer login.')
      } else {
        setError('Ocorreu um erro inesperado.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <Paper elevation={0} sx={{ p: 4, width: '100%', borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
          
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
            <TwitterIcon color="primary" sx={{ fontSize: 40 }} />
          </Box>

          <Typography component="h1" variant="h5" fontWeight={800} sx={{ mb: 3 }}>
            Entrar
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={2}>

              <TextField
                required
                fullWidth
                label="Username"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <TextField
                required
                fullWidth
                label="Senha"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 2,
                  py: 1.5,
                  borderRadius: 99,
                  fontWeight: 700,
                  textTransform: 'none'
                }}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>

            </Stack>
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Não tem uma conta?{' '}
              <Link
                component={RouterLink}
                to="/register"
                fontWeight={700}
                sx={{ textDecoration: 'none' }}
              >
                Cadastre-se
              </Link>
            </Typography>
          </Box>

        </Paper>
      </Box>
    </Container>
  )
}