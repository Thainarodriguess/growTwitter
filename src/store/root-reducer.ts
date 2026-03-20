import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './slices/auth.slice' 
import themeReducer from './slices/theme.slice'

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
})

export const persistedReducer = persistReducer(
  {
    key: 'growtwitter-app',
    storage,
    whitelist: ['auth', 'theme'],
  },
  rootReducer,
)