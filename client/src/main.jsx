import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux"
import { store, persistor } from './redux/store.js'
import App from './App.jsx'
import GlobalStyles from './component/GlobalStyles/index.js';
import { PersistGate } from 'redux-persist/integration/react';
import { registerSW } from 'virtual:pwa-register';
registerSW(); // Đăng ký Service Worker
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyles>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </GlobalStyles>
  </StrictMode>,
)
