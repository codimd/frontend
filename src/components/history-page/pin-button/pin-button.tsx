/*
SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)

SPDX-License-Identifier: AGPL-3.0-only
*/

import { Button } from 'react-bootstrap'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import './pin-button.scss'

export interface PinButtonProps {
  isPinned: boolean;
  onPinClick: () => void;
  isDark: boolean;
  className?: string
}

export const PinButton: React.FC<PinButtonProps> = ({ isPinned, onPinClick, isDark, className }) => {
  return (
    <Button variant={isDark ? 'secondary' : 'light'}
      className={`history-pin ${className || ''} ${isPinned ? 'pinned' : ''}`} onClick={onPinClick}>
      <ForkAwesomeIcon icon="thumb-tack"/>
    </Button>
  )
}
