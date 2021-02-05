/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useApplyDarkMode } from '../../hooks/common/use-apply-dark-mode'
import { ApplicationState } from '../../redux'
import { setDarkMode } from '../../redux/dark-mode/methods'
import { setNoteFrontmatter } from '../../redux/note-details/methods'
import { NoteFrontmatter } from '../editor-page/note-frontmatter/note-frontmatter'
import { ScrollState } from '../editor-page/synced-scroll/scroll-props'
import { ImageClickHandler } from '../markdown-renderer/replace-components/image/image-replacer'
import { useImageClickHandler } from './hooks/use-image-click-handler'
import { IframeRendererToEditorCommunicator } from './iframe-renderer-to-editor-communicator'
import { MarkdownDocument } from './markdown-document'
import { BaseConfiguration, RendererType } from './rendering-message'

export const RenderPage: React.FC = () => {
  useApplyDarkMode()

  const [markdownContent, setMarkdownContent] = useState('')
  const [scrollState, setScrollState] = useState<ScrollState>({ firstLineInView: 1, scrolledPercentage: 0 })
  const [baseConfiguration, setBaseConfiguration] = useState<BaseConfiguration | undefined>(undefined)

  const editorOrigin = useSelector((state: ApplicationState) => state.config.iframeCommunication.editorOrigin)

  const iframeCommunicator = useMemo(() => {
    const newCommunicator = new IframeRendererToEditorCommunicator()
    newCommunicator.setOtherSide(window.parent, editorOrigin)
    return newCommunicator
  }, [editorOrigin])

  useEffect(() => {
    iframeCommunicator.sendRendererReady()
    return () => iframeCommunicator.unregisterEventListener()
  }, [iframeCommunicator])

  useEffect(() => iframeCommunicator.onSetBaseConfiguration(setBaseConfiguration), [iframeCommunicator])
  useEffect(() => iframeCommunicator.onSetMarkdownContent(setMarkdownContent), [iframeCommunicator])
  useEffect(() => iframeCommunicator.onSetDarkMode(setDarkMode), [iframeCommunicator])
  useEffect(() => iframeCommunicator.onSetScrollState(setScrollState), [iframeCommunicator, scrollState])

  const onTaskCheckedChange = useCallback((lineInMarkdown: number, checked: boolean) => {
    iframeCommunicator.sendTaskCheckBoxChange(lineInMarkdown, checked)
  }, [iframeCommunicator])

  const onFirstHeadingChange = useCallback((firstHeading?: string) => {
    iframeCommunicator.sendFirstHeadingChanged(firstHeading)
  }, [iframeCommunicator])

  const onMakeScrollSource = useCallback(() => {
    iframeCommunicator.sendSetScrollSourceToRenderer()
  }, [iframeCommunicator])

  const onFrontmatterChange = useCallback((frontmatter?: NoteFrontmatter) => {
    setNoteFrontmatter(frontmatter)
    iframeCommunicator.sendSetFrontmatter(frontmatter)
  }, [iframeCommunicator])

  const onScroll = useCallback((scrollState: ScrollState) => {
    iframeCommunicator.sendSetScrollState(scrollState)
  }, [iframeCommunicator])

  const onImageClick: ImageClickHandler = useImageClickHandler(iframeCommunicator)

  const onHeightChange = useCallback((height: number) => {
    iframeCommunicator.sendHeightChange(height)
  }, [iframeCommunicator])

  if (!baseConfiguration) {
    return null
  }

  switch (baseConfiguration.rendererType) {
    case RendererType.DOCUMENT:
      return (
        <MarkdownDocument
          additionalOuterContainerClasses={ 'vh-100 bg-light' }
          additionalRendererClasses={ 'mb-3' }
          markdownContent={ markdownContent }
          onTaskCheckedChange={ onTaskCheckedChange }
          onFirstHeadingChange={ onFirstHeadingChange }
          onMakeScrollSource={ onMakeScrollSource }
          onFrontmatterChange={ onFrontmatterChange }
          scrollState={ scrollState }
          onScroll={ onScroll }
          baseUrl={ baseConfiguration.baseUrl }
          onImageClick={ onImageClick }/>
      )
    case RendererType.INTRO:
      return (
        <MarkdownDocument
          additionalOuterContainerClasses={ 'vh-100 bg-light overflow-y-hidden' }
          markdownContent={ markdownContent }
          baseUrl={ baseConfiguration.baseUrl }
          onImageClick={ onImageClick }
          disableToc={ true }
          onHeightChange={ onHeightChange }/>
      )
    default:
      return null
  }
}

export default RenderPage
