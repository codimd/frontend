/*
 * SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useRef } from 'react'
import { Button } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import './placeholder-image-frame.scss'
import { acceptedMimeTypes } from '../../../common/upload-image-mimetypes'
import { buildPlaceholderSizeCss } from './util'

export interface PlaceholderImageFrameProps {
  alt?: string
  title?: string
  width?: string | number
  height?: string | number
}

export interface PlaceholderImageFramePostingProps {
  onImageUpload: (file: File) => void
}

export const PlaceholderImageFrame: React.FC<PlaceholderImageFrameProps & PlaceholderImageFramePostingProps> = ({
  alt,
  title,
  width,
  height,
  onImageUpload
}) => {
  useTranslation()
  const fileInputReference = useRef<HTMLInputElement>(null)

  const onDropHandler = useCallback(
    (event: React.DragEvent<HTMLSpanElement>) => {
      console.log('onDrop called')
      event.preventDefault()
      if (event?.dataTransfer?.files?.length > 0) {
        onImageUpload(event.dataTransfer.files[0])
      }
    },
    [onImageUpload]
  )

  const onDragOverHandler = useCallback((event: React.DragEvent<HTMLSpanElement>) => event.preventDefault(), [])

  const onChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target.files
      if (!fileList || fileList.length < 1) {
        return
      }
      onImageUpload(fileList[0])
    },
    [onImageUpload]
  )

  return (
    <span
      className='image-drop d-inline-flex flex-column align-items-center bg-primary text-light p-4'
      style={buildPlaceholderSizeCss(width, height)}
      onDrop={onDropHandler}
      onDragOver={onDragOverHandler}>
      <input
        type='file'
        className='d-none'
        accept={acceptedMimeTypes}
        onChange={onChangeHandler}
        ref={fileInputReference}
      />
      <span>
        <Trans
          i18nKey={'editor.embeddings.placeholderImage.placeholderText'}
          className='my-2'
          onChange={onChangeHandler}
        />
      </span>
      <span className={'altText'}>{alt ?? title ?? ''}</span>
      <ForkAwesomeIcon icon={'upload'} size={'2x'} className='my-2' />
      <Button variant={'light'} onClick={() => fileInputReference.current?.click()}>
        <Trans i18nKey={'editor.embeddings.placeholderImage.upload'} className='my-2' />
      </Button>
    </span>
  )
}
