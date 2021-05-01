/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { fetchFrontPageContent } from '../requests'
import { useFrontendBaseUrl } from '../../../hooks/common/use-frontend-base-url'

const MARKDOWN_WHILE_LOADING = ':zzz: {message}'
const MARKDOWN_IF_ERROR = ':::danger\n' +
  '{message}\n' +
  ':::'

export const useIntroPageContent = (): string => {
  const { t } = useTranslation()
  const [content, setContent] = useState<string>(() => MARKDOWN_WHILE_LOADING.replace('{message}', t('landing.intro.markdownWhileLoading')))
  const frontendBaseUrl = useFrontendBaseUrl()

  useEffect(() => {
    fetchFrontPageContent(frontendBaseUrl)
      .then((content) => setContent(content))
      .catch(() => setContent(MARKDOWN_IF_ERROR.replace('{message}', t('landing.intro.markdownLoadingError'))))
  }, [frontendBaseUrl, t])

  return content
}
