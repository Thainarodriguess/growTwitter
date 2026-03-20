import React, { useEffect, useState, useCallback } from 'react'
import {
  Box,
  Typography,
  Avatar,
  CircularProgress,
  Pagination,
  Stack,
  useTheme,
  Chip,
  alpha,
} from '@mui/material'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

interface UserSummary {
  id: string
  name: string
  username: string
  imageUrl: string | null
  followersCount: number
  isFollowing: boolean
  latestTweet: {
    content: string
    createdAt: string
  } | null
}

export function DiscoverUsers() {
  const [profiles, setProfiles] = useState<UserSummary[]>([])
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItemsCount, setTotalItemsCount] = useState(0)

  const uiTheme = useTheme()
  const router = useNavigate()

  const loadProfiles = useCallback(async () => {
    setIsPageLoading(true)
    try {
      const response = await api.get(`/users?page=${currentPage}`)

      setProfiles(response.data.data)

      const { total, limit } = response.data.meta
      const pagesNeeded = Math.ceil(total / limit)
      setTotalItemsCount(pagesNeeded)
    } catch (err) {
      console.error('Error fetching discovery list:', err)
    } finally {
      setIsPageLoading(false)
    }
  }, [currentPage])

  useEffect(() => {
    loadProfiles()
  }, [loadProfiles])

  const visitProfile = (username: string) => {
    router(`/profile/${username}`)
  }

  const onPaginationChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Box sx={{ pb: 4, width: '100%', position: 'relative' }}>
      <Box
        sx={{
          p: 2,
          borderBottom: `1px solid ${uiTheme.palette.divider}`,
          position: 'sticky',
          top: 0,
          zIndex: 10,
          bgcolor:
            uiTheme.palette.mode === 'dark'
              ? 'rgba(0,0,0,0.7)'
              : 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Explore People
        </Typography>
      </Box>

      {isPageLoading ? (
        <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ p: 0 }}>
          {profiles.length === 0 ? (
            <Typography
              sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}
            >
              No users found.
            </Typography>
          ) : (
            <>
              {profiles.map((person) => (
                <Box
                  key={person.id}
                  onClick={() => visitProfile(person.username)}
                  sx={{
                    p: 2,
                    borderBottom: `1px solid ${uiTheme.palette.divider}`,
                    cursor: 'pointer',
                    transition: '0.2s',
                    display: 'flex',
                    gap: 2,
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <Avatar
                    src={person.imageUrl || undefined}
                    alt={person.name}
                    sx={{ width: 48, height: 48 }}
                  />

                  <Box sx={{ flexGrow: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 0.5,
                        flexWrap: 'wrap',
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        component="span"
                        sx={{
                          mr: 1,
                          '&:hover': { textDecoration: 'underline' },
                        }}
                      >
                        {person.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        component="span"
                      >
                        @{person.username}
                      </Typography>

                      {person.isFollowing && (
                        <Chip
                          label="Following"
                          size="small"
                          sx={{
                            ml: 1,
                            height: 20,
                            fontSize: '0.7rem',
                            fontWeight: 'bold',
                            bgcolor:
                              uiTheme.palette.mode === 'dark'
                                ? 'rgba(255,255,255,0.1)'
                                : '#eff3f4',
                            color: 'text.secondary',
                          }}
                        />
                      )}
                    </Box>

                    {person.latestTweet ? (
                      <Box
                        sx={{
                          mt: 1,
                          p: 1.5,
                          borderRadius: 3,
                          bgcolor:
                            uiTheme.palette.mode === 'dark'
                              ? alpha(uiTheme.palette.common.white, 0.05)
                              : alpha(uiTheme.palette.common.black, 0.03),
                        }}
                      >
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                          sx={{ mb: 0.5, fontWeight: 'bold' }}
                        >
                          Last Post:
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.primary"
                          sx={{
                            fontStyle: 'italic',
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                          }}
                        >
                          "{person.latestTweet.content}"
                        </Typography>
                      </Box>
                    ) : (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 1, display: 'block' }}
                      >
                        No recent posts.
                      </Typography>
                    )}

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mt: 1.5, display: 'block' }}
                    >
                      {person.followersCount} followers
                    </Typography>
                  </Box>
                </Box>
              ))}

              {totalItemsCount > 1 && (
                <Stack spacing={2} alignItems="center" sx={{ py: 3 }}>
                  <Pagination
                    count={totalItemsCount}
                    page={currentPage}
                    onChange={onPaginationChange}
                    color="primary"
                    shape="rounded"
                    sx={{
                      '& .MuiPaginationItem-root': {
                        color: 'text.primary',
                      },
                    }}
                  />
                </Stack>
              )}
            </>
          )}
        </Box>
      )}
    </Box>
  )
}