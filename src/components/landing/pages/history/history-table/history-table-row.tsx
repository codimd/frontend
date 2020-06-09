import React from 'react'
import { Badge } from 'react-bootstrap'
import { formatHistoryDate } from '../../../../../utils/historyUtils'
import { EntryMenu } from '../common/entry-menu'
import { PinButton } from '../common/pin-button'
import { HistoryEntryProps } from '../history-content/history-content'

export const HistoryTableRow: React.FC<HistoryEntryProps> = ({ entry, onPinClick, onSyncClick, onRemoveClick }) => {
  return (
    <tr>
      <td>{entry.title}</td>
      <td>{formatHistoryDate(entry.lastVisited)}</td>
      <td>
        {
          entry.tags.map((tag) => <Badge variant={'light'} className={'mr-1 mb-1'}
            key={tag}>{tag}</Badge>)
        }
      </td>
      <td>
        <PinButton isDark={true} isPinned={entry.pinned} onPinClick={() => onPinClick(entry.id, entry.location)} className={'mb-1 mr-1'}/>
        <EntryMenu
          id={entry.id}
          location={entry.location}
          isDark={true}
          onSync={() => onSyncClick(entry.id, entry.location)}
          onRemove={() => onRemoveClick(entry.id, entry.location)}
          onDelete={() => onRemoveClick(entry.id, entry.location)}
        />
      </td>
    </tr>
  )
}
