/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback } from 'react'
import { useIFrameRendererToEditorCommunicator } from '../../../editor-page/render-context/iframe-renderer-to-editor-communicator-context-provider'
import { PlaceholderImageFrame, PlaceholderImageFrameProps } from './placeholder-image-frame'

const convertFileToDataUri = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

export const IframeSendingPlaceholderImageFrame: React.FC<PlaceholderImageFrameProps> = ({
  width,
  height,
  title,
  alt
}) => {
  const iframeCommunicator = useIFrameRendererToEditorCommunicator()

  const onImageUpload = useCallback(
    (file: File) => {
      convertFileToDataUri(file)
        .then((dataUri) => iframeCommunicator?.sendImageDataUri(dataUri, file.name))
        .catch((error: ProgressEvent) => console.error('Failed to upload image', error))
    },
    [iframeCommunicator]
  )

  return <PlaceholderImageFrame width={width} height={height} alt={alt} title={title} onImageUpload={onImageUpload} />
}
