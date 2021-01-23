/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import { Alert } from 'react-bootstrap'
import { Trans } from 'react-i18next'
import { useSelector } from 'react-redux'
import links from '../../../links.json'
import { ApplicationState } from '../../../redux'
import { TranslatedExternalLink } from '../../common/links/translated-external-link'
import { ShowIf } from '../../common/show-if/show-if'

export const YamlArrayDeprecationAlert: React.FC = () => {
  const yamlDeprecatedTags = useSelector((state: ApplicationState) => state.documentContent.metadata.deprecatedTagsSyntax)

  return <ShowIf condition={yamlDeprecatedTags}>
    <Alert data-cy={'yamlArrayDeprecationAlert'} variant='warning' dir='auto'>
      <Trans i18nKey='editor.deprecatedTags'/>
      <br/>
      <TranslatedExternalLink i18nKey={'common.readForMoreInfo'} href={links.faq} className={'text-primary'}/>
    </Alert>
  </ShowIf>
}
