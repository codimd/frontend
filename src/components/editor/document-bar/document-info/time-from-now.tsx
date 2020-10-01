import { DateTime } from 'luxon'

import React from 'react'

export interface TimeFromNowProps {
  time: DateTime
}

export const TimeFromNow: React.FC<TimeFromNowProps> = ({ time }) => {
  return (
    <time className={'mx-1'} title={time.toFormat('DDDD t')} dateTime={time.toString()}>{time.toRelative()}</time>
  )
}
