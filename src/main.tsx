import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux'
import { store } from './store/storage.ts'
import DataContextProvider from './context/DataContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <DataContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </DataContextProvider>
    </Router>
  </React.StrictMode>,
)
