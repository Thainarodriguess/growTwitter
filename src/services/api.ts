import axios, { type InternalAxiosRequestConfig } from 'axios'
import type { Store } from 'redux'
import { logout } from '../store/slices/auth.slice'
import type { RootState } from '../store' 

const API_BASE_URL = 'https://api-growtwitter-illk.onrender.com'

const api = axios.create({
  baseURL: API_BASE_URL,
})

let storeRef: Store<RootState>

export const setupAxiosInterceptors = (store: Store<RootState>) => {
  storeRef = store
}

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const currentState = storeRef?.getState()
    const authToken = currentState?.auth?.token 

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {

      if (storeRef) {
        storeRef.dispatch(logout())
      }
    }

    return Promise.reject(error)
  },
)

export default api