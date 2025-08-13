'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  // Debug: Log config to console
  console.log('Sanity config:', config)
  
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <NextStudio 
        config={config}
        unstable_noAuthBoundary={false}
      />
    </div>
  )
}
