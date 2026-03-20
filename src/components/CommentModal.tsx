import React, { useState } from 'react'
import { Modal, Box, IconButton, TextField, Button, Stack, Avatar, Typography, Divider } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import api from '../services/api'
import { useAuth } from '../store/store.hooks'
import type { Tweet } from '../types' 

interface CommentModalProps {
  open: boolean
  onClose: () => void
  tweet: Tweet | null
  onCommentCreated?: () => void
}

export function CommentModal({ open, onClose, tweet, onCommentCreated }: CommentModalProps) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const { avatarUrl } = useAuth() 

  if (!tweet) return null

  const handleReply = async () => {
    if (!content.trim()) return
    setLoading(true)
    try {
      await api.post(`/tweets/${tweet.id}/comments`, { content })
      setContent('')
      onClose()
      if (onCommentCreated) onCommentCreated()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: { xs: '95%', sm: 600 }, bgcolor: 'background.paper', borderRadius: 4, p: 3, outline: 'none' }}>
        <IconButton onClick={onClose} sx={{ mb: 2 }}><CloseIcon /></IconButton>
        <Stack direction="row" spacing={2}>
          <Avatar src={tweet.user.imageUrl || undefined} />
          <Box>
            <Typography fontWeight={700}>{tweet.user.name} <span style={{ fontWeight: 400, color: 'gray' }}>@{tweet.user.username}</span></Typography>
            <Typography>{tweet.content}</Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Avatar src={avatarUrl || undefined} />
          <Box sx={{ flexGrow: 1 }}>
            <TextField fullWidth multiline rows={3} placeholder="Postar sua resposta" variant="standard" value={content} onChange={(e) => setContent(e.target.value)} InputProps={{ disableUnderline: true }} />
            <Divider sx={{ my: 1 }} />
            <Button variant="contained" disabled={!content.trim() || loading} onClick={handleReply} sx={{ float: 'right', borderRadius: 99 }}>Responder</Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  )
}