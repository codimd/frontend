/*
SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)

SPDX-License-Identifier: AGPL-3.0-only
*/

import { Fragment } from 'react'

export interface ShowIfProps {
  condition: boolean
}

export const ShowIf: React.FC<ShowIfProps> = ({ children, condition }) => {
  return condition ? <Fragment>{children}</Fragment> : null
}
