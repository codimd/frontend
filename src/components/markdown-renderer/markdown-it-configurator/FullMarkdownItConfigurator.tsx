/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import MarkdownIt from 'markdown-it'
import { TocAst } from 'markdown-it-toc-done-right'
import { RawNoteFrontmatter } from '../../editor-page/note-frontmatter/note-frontmatter'
import { documentToc } from '../markdown-it-plugins/document-toc'
import { frontmatterExtract } from '../markdown-it-plugins/frontmatter'
import { headlineAnchors } from '../markdown-it-plugins/headline-anchors'
import { highlightedCode } from '../markdown-it-plugins/highlighted-code'
import { plantumlWithError } from '../markdown-it-plugins/plantuml'
import { quoteExtra } from '../markdown-it-plugins/quote-extra'
import { legacySlideshareShortCode } from '../regex-plugins/replace-legacy-slideshare-short-code'
import { legacySpeakerdeckShortCode } from '../regex-plugins/replace-legacy-speakerdeck-short-code'
import { AsciinemaReplacer } from '../replace-components/asciinema/asciinema-replacer'
import { GistReplacer } from '../replace-components/gist/gist-replacer'
import { KatexReplacer } from '../replace-components/katex/katex-replacer'
import { LineMarkers, lineNumberMarker } from '../replace-components/linemarker/line-number-marker'
import { VimeoReplacer } from '../replace-components/vimeo/vimeo-replacer'
import { YoutubeReplacer } from '../replace-components/youtube/youtube-replacer'
import { BasicMarkdownItConfigurator } from './BasicMarkdownItConfigurator'
import { quoteExtraColor } from '../markdown-it-plugins/quote-extra-color'

export class FullMarkdownItConfigurator extends BasicMarkdownItConfigurator {
  constructor(
    private useFrontmatter: boolean,
    private passYamlErrorState: (error: boolean) => void,
    private onRawMeta: (rawMeta: RawNoteFrontmatter) => void,
    private onToc: (toc: TocAst) => void,
    private onLineMarkers: (lineMarkers: LineMarkers[]) => void
  ) {
    super()
  }

  protected configure(markdownIt: MarkdownIt): void {
    super.configure(markdownIt)

    this.configurations.push(
      plantumlWithError,
      (markdownIt) => {
        frontmatterExtract(markdownIt,
          !this.useFrontmatter
            ? undefined
            : {
              onParseError: (hasError: boolean) => this.passYamlErrorState(hasError),
              onRawMeta: (rawMeta: RawNoteFrontmatter) => this.onRawMeta(rawMeta)
            })
      },
      headlineAnchors,
      KatexReplacer.markdownItPlugin,
      YoutubeReplacer.markdownItPlugin,
      VimeoReplacer.markdownItPlugin,
      GistReplacer.markdownItPlugin,
      legacySlideshareShortCode,
      legacySpeakerdeckShortCode,
      AsciinemaReplacer.markdownItPlugin,
      highlightedCode,
      quoteExtraColor,
      quoteExtra({
        quoteLabel: 'name',
        icon: 'user'
      }),
      quoteExtra({
        quoteLabel: 'time',
        icon: 'clock-o'
      }),
      (markdownIt) => documentToc(markdownIt, this.onToc),
      (markdownIt) => lineNumberMarker(markdownIt, (lineMarkers) => this.onLineMarkers(lineMarkers))
    )
  }
}
