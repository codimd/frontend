import { Editor, Hint, Hints, Pos } from 'codemirror'
import { findWordAtCursor, Hinter, search } from './index'

const allowedChars = /[`\w-_+]/
const wordRegExp = /^```((\w|-|_|\+)*)$/
let allSupportedLanguages: string[] = []

const codeBlockHint = (editor: Editor): Promise< Hints| null > => {
  return import('highlight.js').then(hljs =>
    new Promise((resolve) => {
      const searchTerm = findWordAtCursor(editor, allowedChars)
      const searchResult = wordRegExp.exec(searchTerm.text)
      if (searchResult === null) {
        resolve(null)
        return
      }
      const term = searchResult[1]
      if (allSupportedLanguages.length === 0) {
        allSupportedLanguages = hljs.listLanguages().concat('csv', 'flow', 'html')
      }
      const suggestions = search(term, allSupportedLanguages)
      const cursor = editor.getCursor()
      if (!suggestions) {
        resolve(null)
      } else {
        resolve({
          list: suggestions.map((suggestion: string): Hint => ({
            text: '```' + suggestion + '\n\n```\n',
            displayText: suggestion
          })),
          from: Pos(cursor.line, searchTerm.start),
          to: Pos(cursor.line, searchTerm.end)
        })
      }
    }))
}

export const CodeBlockHinter: Hinter = {
  allowedChars,
  wordRegExp,
  hint: codeBlockHint
}
