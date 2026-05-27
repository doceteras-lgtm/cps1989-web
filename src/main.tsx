import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MarketingLanding } from './MarketingLanding'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MarketingLanding />
  </StrictMode>,
)
