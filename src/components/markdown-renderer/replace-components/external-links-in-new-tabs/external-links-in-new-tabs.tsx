/*
 * SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { DomElement } from 'domhandler'
import { ReactElement } from 'react'
import { ComponentReplacer, SubNodeTransform } from '../ComponentReplacer'

export class LinkInNewTabReplacer extends ComponentReplacer {
  public getReplacement (node: DomElement, subNodeTransform: SubNodeTransform): (ReactElement | null | undefined) {
    const isJumpMark = node.attribs?.href?.substr(0, 1) === '#'

    if (node.name !== 'a' || isJumpMark) {
      return undefined
    }

    return <a {...node.attribs} rel='noopener noreferrer' target='_blank'>
      {
        node.children?.map((child, index) => subNodeTransform(child, index))
      }
    </a>
  }
}