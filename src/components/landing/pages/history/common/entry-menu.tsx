import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { Trans } from 'react-i18next'
import { ForkAwesomeIcon } from '../../../../common/fork-awesome/fork-awesome-icon'
import { ShowIf } from '../../../../common/show-if/show-if'
import { HistoryEntryOrigin } from '../history'
import './entry-menu.scss'

export interface EntryMenuProps {
  id: string;
  location: HistoryEntryOrigin
  isDark: boolean;
  onSync: () => void
  onRemove: () => void
  onDelete: () => void
  className?: string
}

const EntryMenu: React.FC<EntryMenuProps> = ({ id, location, isDark, onRemove, onDelete, className }) => {
  return (
    <Dropdown className={`${className || ''}`}>
      <Dropdown.Toggle size="sm" variant={isDark ? 'secondary' : 'light'} id={`dropdown-card-${id}`} className='history-menu d-flex align-items-center'>
        <ForkAwesomeIcon icon="ellipsis-h" className='history-menu'/>
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
        <Dropdown.Item onClick={onRemove}>
          <ForkAwesomeIcon icon="archive" fixedWidth={true} className="mx-2"/>
          <Trans i18nKey="landing.history.menu.removeEntry"/>
        </Dropdown.Item>

        <Dropdown.Divider/>

        <Dropdown.Item onClick={onDelete}>
          <ForkAwesomeIcon icon="trash" fixedWidth={true} className="mx-2"/>
          <Trans i18nKey="landing.history.menu.deleteNote"/>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export { EntryMenu }
