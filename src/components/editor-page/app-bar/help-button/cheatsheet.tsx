/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useMemo, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import './cheatsheet.scss'
import { CheatsheetLine } from './cheatsheet-line'

export const Cheatsheet: React.FC = () => {
  const { t } = useTranslation()
  const [checked, setChecked] = useState<boolean>(false)
  const codes = useMemo(
    () => [
      `**${t('editor.editorToolbar.bold')}**`,
      `*${t('editor.editorToolbar.italic')}*`,
      `++${t('editor.editorToolbar.underline')}++`,
      `~~${t('editor.editorToolbar.strikethrough')}~~`,
      'H~2~O',
      '19^th^',
      `==${t('editor.help.cheatsheet.highlightedText')}==`,
      `# ${t('editor.editorToolbar.header')}`,
      `\`${t('editor.editorToolbar.code')}\``,
      '```javascript=\nvar x = 5;\n```',
      `> ${t('editor.editorToolbar.blockquote')}`,
      `- ${t('editor.editorToolbar.unorderedList')}`,
      `1. ${t('editor.editorToolbar.orderedList')}`,
      `- [${checked ? 'x' : ' '}] ${t('editor.editorToolbar.checkList')}`,
      `[${t('editor.editorToolbar.link')}](https://example.com)`,
      `![${t('editor.editorToolbar.image')}](/icons/apple-touch-icon.png)`,
      ':smile:',
      `:::info\n${t('editor.help.cheatsheet.exampleAlert')}\n:::`
    ],
    [checked, t]
  )

  return (
    <Table className='table-condensed table-cheatsheet'>
      <thead>
        <tr>
          <th>
            <Trans i18nKey='editor.help.cheatsheet.example' />
          </th>
          <th>
            <Trans i18nKey='editor.help.cheatsheet.syntax' />
          </th>
        </tr>
      </thead>
      <tbody>
        {codes.map((code) => (
          <CheatsheetLine code={code} key={code} onTaskCheckedChange={setChecked} />
        ))}
      </tbody>
    </Table>
  )
}

export default Cheatsheet
