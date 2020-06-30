import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { ForkAwesomeIcon } from '../../../../../common/fork-awesome/fork-awesome-icon'
import { ShowIf } from '../../../../../common/show-if/show-if'
import { HistoryEntryOrigin } from '../../history'
import './entry-menu.scss'
import { DeleteRemoveNoteItem } from './delete-remove-note-item'

export interface EntryMenuProps {
  id: string;
  title: string
  location: HistoryEntryOrigin
  isDark: boolean;
  onRemove: () => void
  onDelete: () => void
  className?: string
}

const EntryMenu: React.FC<EntryMenuProps> = ({ id, title, location, isDark, onRemove, onDelete, className }) => {
  useTranslation()

  return (
    <Dropdown className={`d-inline-flex ${className || ''}`}>
      <Dropdown.Toggle variant={isDark ? 'secondary' : 'light'} id={`dropdown-card-${id}`} className='no-arrow history-menu d-inline-flex align-items-center'>
        <ForkAwesomeIcon icon="bars" className=''/>
      </Dropdown.Toggle>

      <Dropdown.Menu>

        <Dropdown.Header>
          <Trans i18nKey="landing.history.menu.recentNotes"/>
        </Dropdown.Header>

        <ShowIf condition={location === HistoryEntryOrigin.LOCAL}>
          <Dropdown.Item disabled>
            <ForkAwesomeIcon icon="laptop" fixedWidth={true} className="mx-2"/>
            <Trans i18nKey="landing.history.menu.entryLocal"/>
          </Dropdown.Item>
        </ShowIf>
        <ShowIf condition={location === HistoryEntryOrigin.REMOTE}>
          <Dropdown.Item disabled>
            <ForkAwesomeIcon icon="cloud" fixedWidth={true} className="mx-2"/>
            <Trans i18nKey="landing.history.menu.entryRemote"/>
          </Dropdown.Item>
        </ShowIf>
        <DeleteRemoveNoteItem onConfirm={onRemove} noteTitle={title} variant={'removeHistoryItem'} />

        <Dropdown.Divider/>

        <DeleteRemoveNoteItem onConfirm={onDelete} noteTitle={title} variant={'deleteNote'} />
      </Dropdown.Menu>
    </Dropdown>
  )
}

export { EntryMenu }
