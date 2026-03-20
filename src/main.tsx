import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { App } from './App'
import { persistedStore, store } from './store'
import { setupAxiosInterceptors } from './services/api'

setupAxiosInterceptors(store)

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error("Failed to find the root element. Check your index.html")
}

createRoot(rootElement).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </ReduxProvider>
  </StrictMode>,
)