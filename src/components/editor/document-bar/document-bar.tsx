import React from 'react'
import './document-bar.scss'
import { Trans, useTranslation } from 'react-i18next'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import { ConnectionIndicator } from './connection-indicator'
import { EditorImportExportMenu } from './editor-import-export-menu'
import { DocTimestamps } from './doc-timestamps'
import { EditorMenu } from './editor-menu'
import { PermissionSelector } from './permission-selector'
import { Button } from 'react-bootstrap'

export const DocumentBar: React.FC = () => {
  useTranslation()

  return (
    <div className={'document-bar bg-light px-3 py-2 d-flex flex-row align-items-center'}>
      <DocTimestamps/>
      <PermissionSelector/>
      <div className="text-secondary ml-auto d-flex flex-row">
        <Button variant={'light'} className={'mx-1 text-secondary'} size={'sm'}>
          <ForkAwesomeIcon icon={'history'} className={'mx-1'}/>
          <Trans i18nKey={'editor.menu.revision'}/>
        </Button>
        <EditorImportExportMenu/>
        <EditorMenu/>
        <ConnectionIndicator/>
      </div>
    </div>
  )
}
