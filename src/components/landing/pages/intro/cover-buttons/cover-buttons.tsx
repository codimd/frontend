import React from 'react'
import { Button } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ApplicationState } from '../../../../../redux'
import './cover-buttons.scss'

export const CoverButtons: React.FC = () => {
  useTranslation()
  const user = useSelector((state: ApplicationState) => state.user)

  if (!user) {
    return null
  }

  return (
    <div className="mb-5">
      <Link to="/login">
        <Button
          className="cover-button"
          variant="success"
          size="lg"
        >
          <Trans i18nKey="login.signIn"/>
        </Button>
      </Link>

      <span className="m-2">
        <Trans i18nKey="common.or"/>
      </span>

      <Link to="/features">
        <Button
          className="cover-button"
          variant="primary"
          size="lg"
        >
          <Trans i18nKey="landing.intro.exploreFeatures"/>
        </Button>
      </Link>
    </div>
  )
}
