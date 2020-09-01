import React, { ReactElement } from 'react'
import { DomElement } from 'domhandler'
import { ComponentReplacer, SubNodeConverter } from '../ComponentReplacer'

export class TaskListReplacer implements ComponentReplacer {
  content: string
  onTaskCheckedChange: (i: number, checked: boolean) => void

  constructor (content: string, onTaskCheckedChange: (i: number, checked: boolean) => void) {
    this.content = content
    this.onTaskCheckedChange = onTaskCheckedChange
  }

  handleCheckboxChange = (event: React.MouseEvent<HTMLInputElement, MouseEvent>): void => {
    const lineNum = Number(event.currentTarget.dataset.line)
    this.onTaskCheckedChange(lineNum, event.currentTarget.checked)
  }

  getReplacement (node: DomElement, index:number, subNodeConverter: SubNodeConverter): (ReactElement|undefined) {
    if (node.attribs?.class === 'task-list-item-checkbox') {
      return (
        <input
          className="task-list-item-checkbox"
          type="checkbox"
          checked={node.attribs.checked !== undefined}
          onClick={this.handleCheckboxChange}
          data-line={node.attribs['data-line']}
          key={`task-list-item-checkbox${node.attribs['data-line']}`}
        />
      )
    }
  }
}
