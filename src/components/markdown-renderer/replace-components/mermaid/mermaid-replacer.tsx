import { DomElement } from 'domhandler'
import React from 'react'
import { ComponentReplacer } from '../ComponentReplacer'
import { MermaidChart } from './mermaid-chart'

export class MermaidReplacer implements ComponentReplacer {
  getReplacement (codeNode: DomElement, index: number): React.ReactElement | undefined {
    if (codeNode.name !== 'code' || !codeNode.attribs || !codeNode.attribs['data-highlight-language'] || codeNode.attribs['data-highlight-language'] !== 'mermaid' || !codeNode.children || !codeNode.children[0]) {
      return
    }

    const code = codeNode.children[0].data as string

    return <MermaidChart key={index} code={code}/>
  }
}
