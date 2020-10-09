import React, { Fragment, useCallback, useRef } from 'react'
import { Dropdown } from 'react-bootstrap'
import { Trans } from 'react-i18next'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import { ImportProps } from '../menus/import-menu'

export const ImportFile: React.FC<ImportProps> = ({ noteContent, updateNoteContent }) => {
  const fileInputReference = useRef<HTMLInputElement>(null)
  const doImport = useCallback(() => {
    const fileInput = fileInputReference.current
    if (!fileInput) {
      return
    }
    fileInput.addEventListener('change', () => {
      if (!fileInput.files || fileInput.files.length < 1) {
        return
      }
      const file = fileInput.files[0]
      const fileReader = new FileReader()
      fileReader.readAsText(file)
      fileReader.addEventListener('load', () => {
        const newContent = fileReader.result as string
        updateNoteContent(noteContent + '\n' + newContent)
      })
    })
    fileInput.click()
  }, [fileInputReference, noteContent, updateNoteContent])

  return (
    <Fragment>
      <input type='file' ref={fileInputReference} className='d-none' accept='.md, text/markdown, text/plain'/>
      <Dropdown.Item className='small' onClick={doImport}>
        <ForkAwesomeIcon icon='file-text-o' className={'mx-2'}/>
        <Trans i18nKey='editor.import.file'/>
      </Dropdown.Item>
    </Fragment>
  )
}
