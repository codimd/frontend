import { CustomEmoji, EmojiData } from 'emoji-mart'
import { BaseEmoji } from 'emoji-mart/dist-es/utils/emoji-index/nimble-emoji-index'
import React, { Fragment, useState } from 'react'
import { Editor } from 'codemirror'
import React from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import './tool-bar.scss'
import { EmojiPicker } from './emoji-picker'
import {
  addCodeFences,
  addComment,
  addHeaderLevel,
  addImage,
  addLine,
  addLink,
  addList,
  addOrderedList,
  addQuotes,
  addTable,
  addTaskList,
  makeSelectionBold,
  makeSelectionItalic,
  strikeThroughSelection,
  subscriptSelection,
  superscriptSelection,
  underlineSelection
} from './utils'

export interface ToolBarProps {
  editor: Editor | undefined
}

export const ToolBar: React.FC<ToolBarProps> = ({ editor }) => {
  const { t } = useTranslation()
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const notImplemented = () => {
    alert('This feature is not yet implemented')
  }

  const addEmoji = (emoji: EmojiData): void => {
    setShowEmojiPicker(false)
    let replacement = ''
    if ((emoji as BaseEmoji).native) {
      replacement = (emoji as BaseEmoji).native
    } else if ((emoji as CustomEmoji).imageUrl) {
      replacement = `<i class="fa fa-${(emoji as CustomEmoji).name}"></i>`
    }
    replaceSelection(content, positions.startPosition, positions.endPosition, onContentChange, replacement)
  }

  if (!editor) {
    return null
  }

  return (
    <Fragment>
      <ButtonToolbar className='flex-nowrap bg-light'>
        <Button variant='light' onClick={() => makeSelectionBold(editor)} title={t('editor.editorToolbar.bold')}>
          <ForkAwesomeIcon icon="bold"/>
        </Button>
        <Button variant='light' onClick={() => makeSelectionItalic(editor)} title={t('editor.editorToolbar.italic')}>
          <ForkAwesomeIcon icon="italic"/>
      </Button>
      <Button variant='light' onClick={() => underlineSelection(editor)} title={t('editor.editorToolbar.underline')}>
        <ForkAwesomeIcon icon="underline"/>
        </Button>
        <Button variant='light' onClick={() => strikeThroughSelection(editor)} title={t('editor.editorToolbar.strikethrough')}>
          <ForkAwesomeIcon icon="strikethrough"/>
      </Button>
      <Button variant='light' onClick={() => subscriptSelection(editor)} title={t('editor.editorToolbar.subscript')}>
        <ForkAwesomeIcon icon="subscript"/>
      </Button>
      <Button variant='light' onClick={() => superscriptSelection(editor)} title={t('editor.editorToolbar.superscript')}>
        <ForkAwesomeIcon icon="superscript"/>
        </Button>
        <Button variant='light' onClick={() => addHeaderLevel(editor)} title={t('editor.editorToolbar.header')}>
          <ForkAwesomeIcon icon="header"/>
        </Button>
        <Button variant='light' onClick={() => addCodeFences(editor)} title={t('editor.editorToolbar.code')}>
          <ForkAwesomeIcon icon="code"/>
        </Button>
        <Button variant='light' onClick={() => addQuotes(editor)} title={t('editor.editorToolbar.blockquote')}>
          <ForkAwesomeIcon icon="quote-right"/>
        </Button>
        <Button variant='light' onClick={() => addList(editor)} title={t('editor.editorToolbar.unorderedList')}>
          <ForkAwesomeIcon icon="list"/>
        </Button>
        <Button variant='light' onClick={() => addOrderedList(editor)} title={t('editor.editorToolbar.orderedList')}>
          <ForkAwesomeIcon icon="list-ol"/>
        </Button>
        <Button variant='light' onClick={() => addTaskList(editor)} title={t('editor.editorToolbar.checkList')}>
          <ForkAwesomeIcon icon="check-square"/>
        </Button>
        <Button variant='light' onClick={() => addLink(editor)} title={t('editor.editorToolbar.link')}>
          <ForkAwesomeIcon icon="link"/>
        </Button>
        <Button variant='light' onClick={() => addImage(editor)} title={t('editor.editorToolbar.image')}>
          <ForkAwesomeIcon icon="picture-o"/>
        </Button>
        <Button variant='light' onClick={notImplemented} title={t('editor.editorToolbar.uploadImage')}>
          <ForkAwesomeIcon icon="upload"/>
        </Button>
        <Button variant='light' onClick={() => addTable(editor)} title={t('editor.editorToolbar.table')}>
          <ForkAwesomeIcon icon="table"/>
        </Button>
        <Button variant='light' onClick={() => addLine(editor)} title={t('editor.editorToolbar.line')}>
          <ForkAwesomeIcon icon="minus"/>
        </Button>
        <Button variant='light' onClick={() => addComment(editor)} title={t('editor.editorToolbar.comment')}>
          <ForkAwesomeIcon icon="comment"/>
        </Button>
        <Button variant='light' onClick={() => setShowEmojiPicker(true)} title={''}>
          <ForkAwesomeIcon icon="smile-o"/>
        </Button>
      </ButtonToolbar>
      <EmojiPicker show={showEmojiPicker} onEmojiSelected={addEmoji}/>
    </Fragment>
  )
}
