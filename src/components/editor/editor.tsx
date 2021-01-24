/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router'
import useMedia from 'use-media'
import { useApplyDarkMode } from '../../hooks/common/use-apply-dark-mode'
import { useDocumentTitle } from '../../hooks/common/use-document-title'
import { ApplicationState } from '../../redux'
import { setDocumentContent, setDocumentMetadata, setNoteId } from '../../redux/document-content/methods'
import { setEditorMode } from '../../redux/editor/methods'
import { extractNoteTitle } from '../common/document-title/note-title-extractor'
import { MotdBanner } from '../common/motd-banner/motd-banner'
import { AppBar, AppBarMode } from './app-bar/app-bar'
import { EditorMode } from './app-bar/editor-view-mode'
import { DocumentIframe } from './document-renderer-pane/document-iframe'
import { EditorPane } from './editor-pane/editor-pane'
import { editorTestContent } from './editorTestContent'
import { useViewModeShortcuts } from './hooks/useViewModeShortcuts'
import { DualScrollState, ScrollState } from './scroll/scroll-props'
import { Sidebar } from './sidebar/sidebar'
import { Splitter } from './splitter/splitter'
import { YAMLMetaData } from './yaml-metadata/yaml-metadata'

export interface EditorPathParams {
  id: string
}

export enum ScrollSource {
  EDITOR,
  RENDERER
}

const TASK_REGEX = /(\s*[-*] )(\[[ xX]])( .*)/

export const Editor: React.FC = () => {
  const { t } = useTranslation()
  const { id } = useParams<EditorPathParams>()
  const { search } = useLocation()
  const untitledNote = t('editor.untitledNote')
  const markdownContent = useSelector((state: ApplicationState) => state.documentContent.content)
  const isWide = useMedia({ minWidth: 576 }, true)
  const [documentTitle, setDocumentTitle] = useState(untitledNote)
  const noteMetadata = useRef<YAMLMetaData>()
  const firstHeading = useRef<string>()
  const scrollSource = useRef<ScrollSource>(ScrollSource.EDITOR)

  const editorMode: EditorMode = useSelector((state: ApplicationState) => state.editorConfig.editorMode)
  const editorSyncScroll: boolean = useSelector((state: ApplicationState) => state.editorConfig.syncScroll)

  const [scrollState, setScrollState] = useState<DualScrollState>(() => ({
    editorScrollState: { firstLineInView: 1, scrolledPercentage: 0 },
    rendererScrollState: { firstLineInView: 1, scrolledPercentage: 0 }
  }))

  useEffect(() => {
    setDocumentContent(editorTestContent)
    const requestedMode = search.substr(1)
    const mode = Object.values(EditorMode).find(mode => mode === requestedMode)
    if (mode) {
      setEditorMode(mode)
    }
  }, [search])

  const updateDocumentTitle = useCallback(() => {
    const noteTitle = extractNoteTitle(untitledNote, noteMetadata.current, firstHeading.current)
    setDocumentTitle(noteTitle)
  }, [noteMetadata, firstHeading, untitledNote])

  const onFirstHeadingChange = useCallback((newFirstHeading: string | undefined) => {
    firstHeading.current = newFirstHeading
    updateDocumentTitle()
  }, [updateDocumentTitle])

  const onMetadataChange = useCallback((metaData: YAMLMetaData | undefined) => {
    noteMetadata.current = metaData
    setDocumentMetadata(metaData)
    updateDocumentTitle()
  }, [updateDocumentTitle])

  const onTaskCheckedChange = useCallback((lineInMarkdown: number, checked: boolean) => {
    const lines = markdownContent.split('\n')
    const results = TASK_REGEX.exec(lines[lineInMarkdown])
    if (results) {
      const before = results[1]
      const after = results[3]
      lines[lineInMarkdown] = `${before}[${checked ? 'x' : ' '}]${after}`
      setDocumentContent(lines.join('\n'))
    }
  }, [markdownContent])

  useViewModeShortcuts()

  useEffect(() => {
    setNoteId(id)
  }, [id])

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

  useApplyDarkMode()
  useDocumentTitle(documentTitle)

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
                onContentChange={setDocumentContent}
                content={markdownContent}
                scrollState={scrollState.editorScrollState}
                onScroll={onEditorScroll}
                onMakeScrollSource={setEditorToScrollSource}/>
            }
            showRight={editorMode === EditorMode.PREVIEW || editorMode === EditorMode.BOTH}
            right={
              <DocumentIframe markdownContent={markdownContent}
                              onMakeScrollSource={setRendererToScrollSource}
                              onFirstHeadingChange={onFirstHeadingChange}
                              onTaskCheckedChange={onTaskCheckedChange}
                              onMetadataChange={onMetadataChange}
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
