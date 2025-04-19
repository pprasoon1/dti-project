import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { ClerkProvider } from '@clerk/clerk-react'
// import ReactDOM from 'react-dom'
const PUBLISHABLE_KEY = "pk_test_YWNjZXB0ZWQtbWFybW9zZXQtMTcuY2xlcmsuYWNjb3VudHMuZGV2JA"

// if (!PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key")
// }

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <App />
      </ClerkProvider>
    </React.StrictMode>,
  )
