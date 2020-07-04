import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { ExternalLink } from '../../../common/links/external-link'

const SocialLink: React.FC = () => {
  useTranslation()
  return (
    <p>
      <Trans i18nKey="landing.footer.followUs" components={[
        <ExternalLink id='github' href="https://github.com/codimd/server" icon='github' text="GitHub"/>,
        <ExternalLink id='discourse' href="https://community.codimd.org" icon='users' text="Discourse"/>,
        <ExternalLink id='matrix' href="https://riot.im/app/#/room/#codimd:matrix.org" icon="comment" text="Riot"/>,
        <ExternalLink id='mastodon' href="https://social.codimd.org/mastodon" icon='mastodon' text="Mastodon"/>,
        <ExternalLink id='poeditor' href="https://translate.codimd.org" icon="globe" text="POEditor"/>
      ]}/>
    </p>
  )
}

export { SocialLink }
