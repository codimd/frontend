import React from 'react'
import { Row } from 'react-bootstrap'
import { Pager } from '../../../../pagination/pager'
import { HistoryEntriesProps } from '../history-content/history-content'
import { HistoryCard } from './history-card'

export const HistoryCardList: React.FC<HistoryEntriesProps> = ({ entries, onPinClick, onSyncClick, pageIndex, onLastPageIndexChange }) => {
  return (
    <Row className="justify-content-start">
      <Pager numberOfElementsPerPage={6} pageIndex={pageIndex} onLastPageIndexChange={onLastPageIndexChange}>
        {
          entries.map((entry) => (
            <HistoryCard
              key={entry.id}
              entry={entry}
              onPinClick={onPinClick}
              onSyncClick={onSyncClick}
            />))
        }
      </Pager>
    </Row>
  )
}
