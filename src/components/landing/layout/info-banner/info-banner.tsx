import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ApplicationState } from '../../../../redux'
import { Alert, Button } from 'react-bootstrap'
import { setBanner } from '../../../../redux/banner/methods'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import { ShowIf } from '../../../common/show-if/show-if'
import './info-banner.scss'

export const InfoBanner: React.FC = () => {
  const bannerState = useSelector((state: ApplicationState) => state.banner)

  const dismissBanner = () => {
    setBanner({ ...bannerState, show: false })
    window.localStorage.setItem('bannerTimeStamp', bannerState.timestamp)
  }

  return (
    <ShowIf condition={bannerState.show}>
      <Alert variant='primary' dir='auto' className='mb-0 text-center'>
        <Link to='/s/banner'>
          {bannerState.text}
        </Link>
        <Button
          variant='outline-primary'
          size='sm'
          className='mx-2'
          onClick={dismissBanner}>
          <ForkAwesomeIcon icon='times'/>
        </Button>
      </Alert>
    </ShowIf>
  )
}
