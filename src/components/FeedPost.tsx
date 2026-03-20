import React from 'react'
import { Box, Stack, Avatar, Typography } from '@mui/material'
import type { Tweet } from '../types'

interface FeedPostProps {
  data: Tweet
}

export const FeedPost: React.FC<FeedPostProps> = ({ data }) => {
  
  return (
    <Box sx={{ p: 2, borderBottom: '1px solid divider' }}>
      <Stack direction="row" spacing={2}>
        <Avatar src={data.user.imageUrl || undefined} />
        <Box>
          <Typography fontWeight={700}>{data.user.name}</Typography>
          <Typography color="text.secondary">@{data.user.username}</Typography>
          <Typography sx={{ mt: 1 }}>{data.content}</Typography>
        </Box>
      </Stack>
    </Box>
  )
}