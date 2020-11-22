{/*
SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)

SPDX-License-Identifier: AGPL-3.0-only
*/}

import { DomElement } from 'domhandler'
import { ComponentReplacer } from '../ComponentReplacer'
import './possible-wider-replacer.scss'

const enabledTags = ['img', 'app-youtube', 'app-vimeo', 'app-asciinema', 'app-pdf']

/**
 * This replacer doesn't actually replace something.
 * It just uses the ComponentReplacer-Class to get access to the DOM and
 * appends the "wider-possible" class to paragraphs with special content.
 */
export class PossibleWiderReplacer extends ComponentReplacer {
  public getReplacement (node: DomElement): (undefined) {
    if (node.name !== 'p') {
      return
    }
    if (!node.children || node.children.length === 0) {
      return
    }

    if (node.children.find((subNode) => subNode.name && enabledTags.includes(subNode.name))) {
      if (!node.attribs) {
        node.attribs = {}
      }

      node.attribs.class = `${node.attribs.class ?? ''} wider-possible`
    }
  }
}
