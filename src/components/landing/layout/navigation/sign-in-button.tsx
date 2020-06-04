import React from 'react'
import { Button } from 'react-bootstrap'
import { ButtonProps } from 'react-bootstrap/Button'
import { Trans, useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { ApplicationState } from '../../../../redux'

type SignInButtonProps = {
  className?: string
} & Omit<ButtonProps, 'href'>

export const SignInButton: React.FC<SignInButtonProps> = ({ variant, ...props }) => {
  const { t } = useTranslation()
  const authProviders = useSelector((state: ApplicationState) => state.backendConfig.authProviders)
  return Object.values(authProviders).includes(true)
    ? (
      <LinkContainer to="/login" title={t('login.signIn')}>
        <Button
          variant={variant || 'success'}
          {...props}
        >
          <Trans i18nKey="login.signIn"/>
        </Button>
      </LinkContainer>
    )
    : null
}
