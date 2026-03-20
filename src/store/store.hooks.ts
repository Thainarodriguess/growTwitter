import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './index'
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export const useAuth = () => {
  const auth = useAppSelector((state) => state.auth)

  return {
    isLoggedIn: auth.isLoggedIn,
    token: auth.token,
    userHandle: auth.username, 
    displayName: auth.name,
    avatarUrl: auth.imageUrl,
    userId: auth.id, 
  }
}