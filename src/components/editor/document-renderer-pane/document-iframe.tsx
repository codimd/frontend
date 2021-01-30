/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useIsDarkModeActivated } from '../../../hooks/common/use-is-dark-mode-activated'
import { ApplicationState } from '../../../redux'
import { isTestMode } from '../../../utils/is-test-mode'
import { IframeEditorToRendererCommunicator } from '../../render-page/iframe-editor-to-renderer-communicator'
import { ImageDetails } from '../../render-page/rendering-message'
import { AutoShowingImageLightbox } from './auto-showing-image-lightbox'
import { DocumentRenderPaneProps } from './document-render-pane'
import { useOnIframeLoad } from './hooks/use-on-iframe-load'

export const DocumentIframe: React.FC<DocumentRenderPaneProps> = (
  {
    markdownContent,
    onTaskCheckedChange,
    onMetadataChange,
    scrollState,
    onFirstHeadingChange,
    wide,
    onScroll,
    onMakeScrollSource,
    extraClasses
  }) => {
  const darkMode = useIsDarkModeActivated()
  const [rendererReady, setRendererReady] = useState<boolean>(false)
  const [lightboxDetails, setLightboxDetails] = useState<ImageDetails | undefined>(undefined)

  const iframeCommunicator = useMemo(() => new IframeEditorToRendererCommunicator(), [])
  useEffect(() => () => iframeCommunicator.unregisterEventListener(), [iframeCommunicator])
  useEffect(() => iframeCommunicator.onFirstHeadingChange(onFirstHeadingChange), [iframeCommunicator, onFirstHeadingChange])
  useEffect(() => iframeCommunicator.onMetaDataChange(onMetadataChange), [iframeCommunicator, onMetadataChange])
  useEffect(() => iframeCommunicator.onSetScrollState(onScroll), [iframeCommunicator, onScroll])
  useEffect(() => iframeCommunicator.onSetScrollSourceToRenderer(onMakeScrollSource), [iframeCommunicator, onMakeScrollSource])
  useEffect(() => iframeCommunicator.onTaskCheckboxChange(onTaskCheckedChange), [iframeCommunicator, onTaskCheckedChange])
  useEffect(() => iframeCommunicator.onImageClicked(setLightboxDetails), [iframeCommunicator])
  useEffect(() => iframeCommunicator.onRendererReady(() => setRendererReady(true)), [darkMode, iframeCommunicator, scrollState, wide])
  useEffect(() => {
    if (rendererReady) {
      iframeCommunicator.sendSetDarkmode(darkMode)
    }
  }, [darkMode, iframeCommunicator, rendererReady])
  useEffect(() => {
    if (rendererReady) {
      iframeCommunicator.sendScrollState(scrollState)
    }
  }, [iframeCommunicator, rendererReady, scrollState])
  useEffect(() => {
    if (rendererReady) {
      iframeCommunicator.sendSetWide(wide ?? false)
    }
  }, [iframeCommunicator, rendererReady, wide])

  useEffect(() => {
    if (rendererReady) {
      iframeCommunicator.sendSetBaseUrl(window.location.toString())
    }
  }, [iframeCommunicator, rendererReady])
  useEffect(() => {
    if (rendererReady) {
      iframeCommunicator.sendSetMarkdownContent(markdownContent)
    }
  }, [iframeCommunicator, markdownContent, rendererReady])

  const frameReference = useRef<HTMLIFrameElement>(null)
  const rendererOrigin = useSelector((state: ApplicationState) => state.config.iframeCommunication.rendererOrigin)
  const renderPageUrl = `${rendererOrigin}/render`
  const resetRendererReady = useCallback(() => setRendererReady(false), [])
  const onIframeLoad = useOnIframeLoad(frameReference, iframeCommunicator, rendererOrigin, renderPageUrl, resetRendererReady)

  return <Fragment>
    <AutoShowingImageLightbox details={lightboxDetails}/>
    <iframe data-cy={'documentIframe'} onLoad={onIframeLoad} title="render" src={renderPageUrl}
            {...isTestMode() ? {} : { sandbox: 'allow-downloads allow-same-origin allow-scripts allow-popups' }}
            ref={frameReference} className={`h-100 w-100 border-0 ${extraClasses ?? ''}`}/>
  </Fragment>
}
