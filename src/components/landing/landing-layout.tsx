import React from 'react'
import { Container } from 'react-bootstrap'
import { DocumentTitle } from '../common/document-title/document-title'
import { Footer } from './layout/footer/footer'
import { InfoBanner } from './layout/info-banner'
import { HeaderBar } from './layout/navigation/header-bar/header-bar'

export const LandingLayout: React.FC = ({ children }) => {
  return (
    <Container className="text-white d-flex flex-column mvh-100">
      <DocumentTitle/>
      <InfoBanner/>
      <HeaderBar/>
      <div className={'d-flex flex-column justify-content-between flex-fill text-center'}>
        <div className={'flex-fill d-flex justify-content-center align-items-center flex-column'}>
          {children}
        </div>
        <Footer/>
      </div>
    </Container>
  )
}
