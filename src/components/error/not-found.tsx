import React from 'react'
import { LandingLayout } from '../landing/landing-layout'

export const NotFound: React.FC = () => {
  return (
    <LandingLayout>
      <div className='text-white d-flex align-items-center justify-content-center'>
        <h1>404 Not Found <small>oops.</small></h1>
      </div>
    </LandingLayout>
  )
}
