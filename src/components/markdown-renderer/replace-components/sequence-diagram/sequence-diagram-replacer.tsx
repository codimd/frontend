import { DomElement } from 'domhandler'
import React, { Fragment } from 'react'
import { ComponentReplacer } from '../ComponentReplacer'
import { LazyMermaid } from '../mermaid/lazy-mermaid'
import { DeprecationWarning } from './deprecation-warning'

export class SequenceDiagramReplacer implements ComponentReplacer {
  getReplacement (codeNode: DomElement): React.ReactElement | undefined {
    if (codeNode.name !== 'code' || !codeNode.attribs || !codeNode.attribs['data-highlight-language'] || codeNode.attribs['data-highlight-language'] !== 'sequence' || !codeNode.children || !codeNode.children[0]) {
      return
    }

    const code = codeNode.children[0].data as string

    return <Fragment>
      <DeprecationWarning/>
      <LazyMermaid code={'sequenceDiagram\n' + code}/>
    </Fragment>
  }
}
