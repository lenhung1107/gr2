import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux"
import store from './redux/store.js'
import App from './App.jsx'
import GlobalStyles from './component/GlobalStyles/index.js';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyles>
      <Provider store={store}>
        <App />
      </Provider>
    </GlobalStyles>
  </StrictMode>,
)
