import { DomElement } from 'domhandler'
import React from 'react'
import { getAttributesFromCodiMdTag } from '../codi-md-tag-utils'
import { ComponentReplacer } from '../ComponentReplacer'
import { OneClickEmbedding } from '../one-click-frame/one-click-embedding'
import { GistFrame } from './gist-frame'
import preview from './gist-preview.png'

export class GistReplacer extends ComponentReplacer {
  private counterMap: Map<string, number> = new Map<string, number>()

  public getReplacement (node: DomElement, index: number): React.ReactElement | undefined {
    const attributes = getAttributesFromCodiMdTag(node, 'gist')
    if (attributes && attributes.id) {
      const gistId = attributes.id
      const count = (this.counterMap.get(gistId) || 0) + 1
      this.counterMap.set(gistId, count)
      return (
        <OneClickEmbedding previewContainerClassName={'gist-frame'} key={index} loadingImageUrl={preview} hoverIcon={'github'} tooltip={'click to load gist'}>
          <GistFrame id={gistId}/>
        </OneClickEmbedding>
      )
    }
  }
}
