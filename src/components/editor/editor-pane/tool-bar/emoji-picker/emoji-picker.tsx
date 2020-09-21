import { CustomEmoji, Data, EmojiData, NimblePicker } from 'emoji-mart'
import emojiData from 'emoji-mart/data/twitter.json'
import React, { useRef } from 'react'
import { useClickAway } from 'react-use'
import { ShowIf } from '../../../../common/show-if/show-if'
import './emoji-picker.scss'
import { ForkAwesomeIcons } from './icon-names'
import forkawesomeIcon from './forkawesome.png'

export interface EmojiPickerProps {
  show: boolean
  onEmojiSelected: (emoji: EmojiData) => void
  onDismiss: () => void
}

export const customEmojis: CustomEmoji[] = Object.keys(ForkAwesomeIcons).map((name) => ({
  name: `fa-${name}`,
  short_names: [`fa-${name.toLowerCase()}`],
  text: '',
  emoticons: [],
  keywords: ['fork awesome'],
  imageUrl: forkawesomeIcon,
  customCategory: 'ForkAwesome'
}))

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ show, onEmojiSelected, onDismiss }) => {
  const pickerRef = useRef(null)

  useClickAway(pickerRef, () => {
    onDismiss()
  })

  return (
    <ShowIf condition={show}>
      <div className={'position-relative'} ref={pickerRef}>
        <NimblePicker
          data={emojiData as unknown as Data}
          native={true}
          onSelect={onEmojiSelected}
          theme={'auto'}
          title=''
          custom={customEmojis}
        />
      </div>
    </ShowIf>
  )
}
