/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { loadAllConfig } from './configLoader'
import { setUpI18n } from './i18n'
import { refreshHistoryState } from '../../../redux/history/methods'

const customDelay: () => Promise<void> = async () => {
  if (window.localStorage.getItem('customDelay')) {
    return new Promise(resolve => setTimeout(resolve, 5000))
  } else {
    return Promise.resolve()
  }
}

const loadHistoryState = (): Promise<void> => {
  refreshHistoryState()
  return Promise.resolve()
}

export interface InitTask {
  name: string
  task: Promise<void>
}

export const createSetUpTaskList = (baseUrl: string): InitTask[] => {
  return [{
    name: 'Load Translations',
    task: setUpI18n()
  }, {
    name: 'Load config',
    task: loadAllConfig(baseUrl)
  }, {
    name: 'Load history state',
    task: loadHistoryState()
  }, {
    name: 'Add Delay',
    task: customDelay()
  }]
}
