import React from 'react'
import { useTranslation } from 'react-i18next'
import { ConnectionIndicator } from './connection-indicator/connection-indicator'
import { DocumentInfoButton } from './document-info/document-info-button'
import { EditorMenu } from './menus/editor-menu'
import { ExportMenu } from './menus/export-menu'
import { ImportMenu } from './menus/import-menu'
import { PermissionButton } from './buttons/permission-button'
import { PinToHistoryButton } from './buttons/pin-to-history-button'
import { ShareLinkButton } from './buttons/share-link-button'
import { RevisionButton } from './buttons/revision-button'
import { SyncScrollButton } from './buttons/sync-scroll-button'

export interface DocumentBarProps {
  title: string
}

export const DocumentBar: React.FC<DocumentBarProps> = ({ title }) => {
  useTranslation()

  return (
    <div className={'navbar navbar-expand navbar-light bg-light'}>
      <div className="navbar-nav">
        <ShareLinkButton/>
        <DocumentInfoButton/>
        <RevisionButton/>
        <PinToHistoryButton/>
        <PermissionButton/>
        <SyncScrollButton/>
      </div>
      <div className="ml-auto navbar-nav">
        <ImportMenu/>
        <ExportMenu/>
        <EditorMenu noteTitle={title}/>
        <ConnectionIndicator/>
      </div>
    </div>
  )
}
