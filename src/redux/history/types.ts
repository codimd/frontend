/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Action } from 'redux'

export enum HistoryEntryOrigin {
  LOCAL,
  REMOTE
}

export interface HistoryEntry {
  identifier: string
  title: string
  lastVisited: string
  tags: string[]
  pinStatus: boolean
  origin: HistoryEntryOrigin
}

export interface V1HistoryEntry {
  id: string
  text: string
  time: number
  tags: string[]
  pinned: boolean
}

export interface HistoryExportJson {
  version: number
  entries: HistoryEntry[]
}

export enum HistoryActionType {
  SET_ENTRIES = 'SET_ENTRIES',
  ADD_ENTRY = 'ADD_ENTRY',
  UPDATE_ENTRY = 'UPDATE_ENTRY',
  REMOVE_ENTRY = 'REMOVE_ENTRY'
}

export interface HistoryAction extends Action<HistoryActionType> {
  type: HistoryActionType
}

export interface SetEntriesAction extends HistoryAction {
  type: HistoryActionType.SET_ENTRIES
  entries: HistoryEntry[]
}

export interface AddEntryAction extends HistoryAction {
  type: HistoryActionType.ADD_ENTRY
  newEntry: HistoryEntry
}

export interface UpdateEntryAction extends HistoryAction {
  type: HistoryActionType.UPDATE_ENTRY
  noteId: string
  newEntry: HistoryEntry
}

export interface RemoveEntryAction extends HistoryEntry {
  type: HistoryActionType.REMOVE_ENTRY
  noteId: string
}
