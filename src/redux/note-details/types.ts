/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { DateTime } from 'luxon'
import { Action } from 'redux'
import { NoteFrontmatter } from '../../components/editor-page/note-frontmatter/note-frontmatter'
import { NoteDto } from '../../api/notes/types'

export enum NoteDetailsActionType {
  SET_DOCUMENT_CONTENT = 'note-details/set',
  SET_NOTE_DATA_FROM_SERVER = 'note-details/data/server/set',
  SET_NOTE_FRONTMATTER = 'note-details/frontmatter/set',
  UPDATE_NOTE_TITLE_BY_FIRST_HEADING = 'note-details/update-note-title-by-first-heading',
  SET_CHECKBOX_IN_MARKDOWN_CONTENT = 'note-details/toggle-checkbox-in-markdown-content',
  ADD_ALIAS = 'note-details/aliases/add',
  REMOVE_ALIAS = 'note-details/aliases/remove',
  SET_PRIMARY_ALIAS = 'note-details/aliases/set-primary'
}

interface LastChange {
  userName: string
  timestamp: DateTime
}

export interface NoteDetails {
  markdownContent: string
  id: string
  createTime: DateTime
  lastChange: LastChange
  viewCount: number
  aliases: string[]
  primaryAlias: string | null
  authorship: string[]
  noteTitle: string
  firstHeading?: string
  frontmatter: NoteFrontmatter
}

export interface NoteDetailsAction extends Action<NoteDetailsActionType> {
  type: NoteDetailsActionType
}

export interface SetNoteDetailsAction extends NoteDetailsAction {
  type: NoteDetailsActionType.SET_DOCUMENT_CONTENT
  content: string
}

export interface SetNoteDetailsFromServerAction extends NoteDetailsAction {
  type: NoteDetailsActionType.SET_NOTE_DATA_FROM_SERVER
  note: NoteDto
}

export interface UpdateNoteTitleByFirstHeadingAction extends NoteDetailsAction {
  type: NoteDetailsActionType.UPDATE_NOTE_TITLE_BY_FIRST_HEADING
  firstHeading?: string
}

export interface SetNoteFrontmatterFromRenderingAction extends NoteDetailsAction {
  type: NoteDetailsActionType.SET_NOTE_FRONTMATTER
  frontmatter: NoteFrontmatter
}

export interface SetCheckboxInMarkdownContentAction extends NoteDetailsAction {
  type: NoteDetailsActionType.SET_CHECKBOX_IN_MARKDOWN_CONTENT
  lineInMarkdown: number
  checked: boolean
}

/**
 * Action definition for the {@link addNoteAlias} redux method.
 */
export interface AddAliasAction extends NoteDetailsAction {
  type: NoteDetailsActionType.ADD_ALIAS
  alias: string
}

/**
 * Action definition for the {@link removeNoteAlias} redux method.
 */
export interface RemoveAliasAction extends NoteDetailsAction {
  type: NoteDetailsActionType.REMOVE_ALIAS
  alias: string
}

/**
 * Action definition for the {@link makeNoteAliasPrimary} redux method.
 */
export interface SetPrimaryAliasAction extends NoteDetailsAction {
  type: NoteDetailsActionType.SET_PRIMARY_ALIAS
  alias: string
}
