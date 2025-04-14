import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'

import './theme.css'
import './font.css'
import './sizes.css'
import './index.css'
import './i18n.tsx'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <StrictMode>
            <App />
        </StrictMode>
    </BrowserRouter>,
)
