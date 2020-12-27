/*
 * SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { combineReducers, createStore, Reducer } from 'redux'
import { Config } from '../api/config/types'
import { ApiUrlReducer } from './api-url/reducers'
import { ApiUrlObject } from './api-url/types'
import { BannerReducer } from './banner/reducers'
import { BannerState } from './banner/types'
import { ConfigReducer } from './config/reducers'
import { DarkModeConfigReducer } from './dark-mode/reducers'
import { DarkModeConfig } from './dark-mode/types'
import { DocumentContentReducer } from './document-content/reducers'
import { DocumentContent } from './document-content/types'
import { EditorConfigReducer } from './editor/reducers'
import { EditorConfig } from './editor/types'
import { NotificationReducer } from './notification/reducers'
import { NotificationState } from './notification/types'
import { UserReducer } from './user/reducers'
import { MaybeUserState } from './user/types'

export interface ApplicationState {
  user: MaybeUserState;
  config: Config;
  banner: BannerState;
  apiUrl: ApiUrlObject;
  editorConfig: EditorConfig;
  darkMode: DarkModeConfig;
  documentContent: DocumentContent;
  notifications: NotificationState
}

export const allReducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  user: UserReducer,
  config: ConfigReducer,
  banner: BannerReducer,
  apiUrl: ApiUrlReducer,
  editorConfig: EditorConfigReducer,
  darkMode: DarkModeConfigReducer,
  documentContent: DocumentContentReducer,
  notifications: NotificationReducer
})

export const store = createStore(allReducers)
