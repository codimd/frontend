import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useMedia from 'use-media'
import { ApplicationState } from '../../redux'
import { setEditorModeConfig } from '../../redux/editor/methods'
import { Splitter } from '../common/splitter/splitter'
import { InfoBanner } from '../landing/layout/info-banner'
import { EditorWindow } from './editor-window/editor-window'
import { MarkdownRenderer } from './markdown-renderer/markdown-renderer'
import { EditorMode } from './task-bar/editor-view-mode'
import { TaskBar } from './task-bar/task-bar'

const Editor: React.FC = () => {
  const editorMode: EditorMode = useSelector((state: ApplicationState) => state.editorConfig.editorMode)
  const [markdownContent, setMarkdownContent] = useState(`# Embedding demo
[TOC]

## MathJax

You can render *LaTeX* mathematical expressions using **MathJax**, as on [math.stackexchange.com](https://math.stackexchange.com/):

The *Gamma function* satisfying $\\Gamma(n) = (n-1)!\\quad\\forall n\\in\\mathbb N$ is via the Euler integral

$$
x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.
$$

$$
\\Gamma(z) = \\int_0^\\infty t^{z-1}e^{-t}dt\\,.
$$

> More information about **LaTeX** mathematical expressions [here](https://meta.math.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference).

## Slideshare
{%slideshare mazlan1/internet-of-things-the-tip-of-an-iceberg %}

## Gist
https://gist.github.com/schacon/1

## YouTube
https://www.youtube.com/watch?v=KgMpKsp23yY

## Vimeo
https://vimeo.com/23237102

## PDF
{%pdf https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf %}`)
  const isWide = useMedia({ minWidth: 576 })
  const [firstDraw, setFirstDraw] = useState(true)

  useEffect(() => {
    setFirstDraw(false)
  }, [])

  useEffect(() => {
    if (!firstDraw && !isWide && editorMode === EditorMode.BOTH) {
      setEditorModeConfig(EditorMode.PREVIEW)
    }
  }, [editorMode, firstDraw, isWide])

  return (
    <Fragment>
      <InfoBanner/>
      <div className={'d-flex flex-column vh-100'}>
        <TaskBar/>
        <Splitter
          showLeft={editorMode === EditorMode.EDITOR || editorMode === EditorMode.BOTH}
          left={<EditorWindow onContentChange={content => setMarkdownContent(content)} content={markdownContent}/>}
          showRight={editorMode === EditorMode.PREVIEW || (editorMode === EditorMode.BOTH)}
          right={<MarkdownRenderer content={markdownContent}/>}
          containerClassName={'overflow-hidden'}/>
      </div>
    </Fragment>
  )
}

export { Editor }
