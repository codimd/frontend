import { DomElement } from 'domhandler'
import React from 'react'
import { ComponentReplacer } from '../ComponentReplacer'

const ImageFrame = React.lazy(() => import('./image-frame'))

export class ImageReplacer extends ComponentReplacer {
  public getReplacement (node: DomElement): React.ReactElement | undefined {
    if (node.name === 'img' && node.attribs) {
      return <ImageFrame
        id={node.attribs.id}
        className={node.attribs.class}
        src={node.attribs.src}
        alt={node.attribs.alt}
        title={node.attribs.title}
        width={node.attribs.width}
        height={node.attribs.height}
      />
    }
  }
}
