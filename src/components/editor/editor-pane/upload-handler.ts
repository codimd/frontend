/*
 * SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Editor } from 'codemirror'
import i18n from 'i18next'
import { uploadFile } from '../../../api/media'
import { store } from '../../../redux'

export const handleUpload = (file: File, editor: Editor): void => {
  if (!file) {
    return
  }
  const mimeType = file.type
  const cursor = editor.getCursor()
  const uploadPlaceholder = `![${i18n.t('editor.upload.uploadFile', { fileName: file.name })}]()`
  const noteId = store.getState().documentContent.noteId
  editor.replaceRange(uploadPlaceholder, cursor, cursor, '+input')
  uploadFile(noteId, mimeType, file)
    .then(({ link }) => {
      editor.replaceRange(getCorrectSyntaxForLink(mimeType, link), cursor, {
        line: cursor.line,
        ch: cursor.ch + uploadPlaceholder.length
      }, '+input')
    })
    .catch(() => {
      editor.replaceRange('', cursor, {
        line: cursor.line,
        ch: cursor.ch + uploadPlaceholder.length
      }, '+input')
    })
}

const getCorrectSyntaxForLink = (mimeType: string, link: string): string => {
  switch (mimeType) {
    case 'application/pdf':
      return `{%pdf ${link} %}`
    default:
      return `![](${link})`
  }
}