/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import useMedia from 'use-media'
import { useApplyDarkMode } from '../../hooks/common/use-apply-dark-mode'
import { useDocumentTitleWithNoteTitle } from '../../hooks/common/use-document-title-with-note-title'
import { useMarkdownContent } from '../../hooks/common/use-markdown-content'
import { ApplicationState } from '../../redux'
import { setEditorMode } from '../../redux/editor/methods'
import {
  SetCheckboxInMarkdownContent,
  setNoteMarkdownContent,
  setNoteMetadata,
  updateNoteTitleByFirstHeading
} from '../../redux/note-content/methods'
import { MotdBanner } from '../common/motd-banner/motd-banner'
import { AppBar, AppBarMode } from './app-bar/app-bar'
import { EditorMode } from './app-bar/editor-view-mode'
import { DocumentIframe } from './document-renderer-pane/document-iframe'
import { EditorPane } from './editor-pane/editor-pane'
import { useViewModeShortcuts } from './hooks/useViewModeShortcuts'
import { DualScrollState, ScrollState } from './scroll/scroll-props'
import { Sidebar } from './sidebar/sidebar'
import { Splitter } from './splitter/splitter'
import { useLoadNoteFromServer } from './useLoadNoteFromServer'

export interface EditorPathParams {
  id: string
}

export enum ScrollSource {
  EDITOR,
  RENDERER
}

export const Editor: React.FC = () => {
  useTranslation()
  const { search } = useLocation()
  const markdownContent = useMarkdownContent()
  const isWide = useMedia({ minWidth: 576 }, true)
  const scrollSource = useRef<ScrollSource>(ScrollSource.EDITOR)

  const editorMode: EditorMode = useSelector((state: ApplicationState) => state.editorConfig.editorMode)
  const editorSyncScroll: boolean = useSelector((state: ApplicationState) => state.editorConfig.syncScroll)

  const [scrollState, setScrollState] = useState<DualScrollState>(() => ({
    editorScrollState: { firstLineInView: 1, scrolledPercentage: 0 },
    rendererScrollState: { firstLineInView: 1, scrolledPercentage: 0 }
  }))

  useEffect(() => {
    const requestedMode = search.substr(1)
    const mode = Object.values(EditorMode).find(mode => mode === requestedMode)
    if (mode) {
      setEditorMode(mode)
    }
  }, [search])

  useEffect(() => {
    if (!isWide && editorMode === EditorMode.BOTH) {
      setEditorMode(EditorMode.PREVIEW)
    }
  }, [editorMode, isWide])

  const onMarkdownRendererScroll = useCallback((newScrollState: ScrollState) => {
    if (scrollSource.current === ScrollSource.RENDERER && editorSyncScroll) {
      setScrollState((old) => ({ editorScrollState: newScrollState, rendererScrollState: old.rendererScrollState }))
    }
  }, [editorSyncScroll])

  const onEditorScroll = useCallback((newScrollState: ScrollState) => {
    if (scrollSource.current === ScrollSource.EDITOR && editorSyncScroll) {
      setScrollState((old) => ({ rendererScrollState: newScrollState, editorScrollState: old.editorScrollState }))
    }
  }, [editorSyncScroll])

  useViewModeShortcuts()
  useApplyDarkMode()
  useDocumentTitleWithNoteTitle()
  useLoadNoteFromServer()

  const setRendererToScrollSource = useCallback(() => {
    scrollSource.current = ScrollSource.RENDERER
  }, [])

  const setEditorToScrollSource = useCallback(() => {
    scrollSource.current = ScrollSource.EDITOR
  }, [])

  return (
    <Fragment>
      <MotdBanner/>
      <div className={'d-flex flex-column vh-100'}>
        <AppBar mode={AppBarMode.EDITOR}/>
        <div className={"flex-fill d-flex h-100 w-100 overflow-hidden flex-row"}>
          <Splitter
            showLeft={editorMode === EditorMode.EDITOR || editorMode === EditorMode.BOTH}
            left={
              <EditorPane
                onContentChange={setNoteMarkdownContent}
                content={markdownContent}
                scrollState={scrollState.editorScrollState}
                onScroll={onEditorScroll}
                onMakeScrollSource={setEditorToScrollSource}/>
            }
            showRight={editorMode === EditorMode.PREVIEW || editorMode === EditorMode.BOTH}
            right={
              <DocumentIframe
                markdownContent={markdownContent}
                onMakeScrollSource={setRendererToScrollSource}
                onFirstHeadingChange={updateNoteTitleByFirstHeading}
                onTaskCheckedChange={SetCheckboxInMarkdownContent}
                onMetadataChange={setNoteMetadata}
                onScroll={onMarkdownRendererScroll}
                wide={editorMode === EditorMode.PREVIEW}
                scrollState={scrollState.rendererScrollState}/>
            }
            containerClassName={'overflow-hidden'}/>
          <Sidebar/>
        </div>
      </div>
    </Fragment>
  )
}
export default Editor
