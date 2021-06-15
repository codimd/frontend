/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Element, isTag } from 'domhandler'
import MarkdownIt from 'markdown-it'
import mathJax from 'markdown-it-mathjax'
import React from 'react'
import { ComponentReplacer } from '../ComponentReplacer'
import './katex.scss'

const getNodeIfKatexBlock = (node: Element): Element | undefined => {
  if (node.name !== 'p' || !node.children || node.children.length === 0) {
    return
  }
  return node.children.filter(isTag).find((subnode) => {
    return subnode.name === 'app-katex' && subnode.attribs?.inline === undefined
  })
}

const getNodeIfInlineKatex = (node: Element): Element | undefined => {
  return node.name === 'app-katex' && node.attribs?.inline !== undefined ? node : undefined
}

const KaTeX = React.lazy(() => import(/* webpackChunkName: "katex" */ '@matejmazur/react-katex'))

export class KatexReplacer extends ComponentReplacer {
  public static readonly markdownItPlugin: MarkdownIt.PluginSimple = mathJax({
    beforeMath: '<app-katex>',
    afterMath: '</app-katex>',
    beforeInlineMath: '<app-katex inline>',
    afterInlineMath: '</app-katex>',
    beforeDisplayMath: '<app-katex>',
    afterDisplayMath: '</app-katex>'
  })

  public getReplacement(node: Element): React.ReactElement | undefined {
    const katex = getNodeIfKatexBlock(node) || getNodeIfInlineKatex(node)
    if (katex?.children && katex.children[0]) {
      const mathJaxContent = ComponentReplacer.extractTextChildContent(katex)
      const isInline = katex.attribs?.inline !== undefined
      return <KaTeX block={!isInline} math={mathJaxContent} errorColor={'#cc0000'} />
    }
  }
}
