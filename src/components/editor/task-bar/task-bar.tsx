import React from 'react'
import { Button, Nav, Navbar } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Branding } from '../../common/branding/branding'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import { ConnectionIndicator } from './connection-indicator'
import { DarkModeButton } from './dark-mode-button'
import { EditorMenu } from './editor-menu'
import { EditorViewMode } from './editor-view-mode'
import { HelpButton } from './help-button'

const TaskBar: React.FC = () => {
  useTranslation()
  return (
    <Navbar bg={'light'}>
      <Nav className="mr-auto d-flex align-items-center">
        <Navbar.Brand>
          <Link to="/intro" className="text-secondary text-decoration-none">
            <ForkAwesomeIcon icon="file-text"/> CodiMD <Branding inline={true}/>
          </Link>
        </Navbar.Brand>
        <EditorViewMode/>
        <DarkModeButton/>
        <HelpButton/>
      </Nav>
      <Nav className="d-flex align-items-center text-secondary">
        <Button className="ml-2 text-secondary" size="sm" variant="outline-light">
          <ForkAwesomeIcon icon="plus"/> <Trans i18nKey="editor.menu.new"/>
        </Button>
        <Button className="ml-2 text-secondary" size="sm" variant="outline-light">
          <ForkAwesomeIcon icon="share-square-o"/> <Trans i18nKey="editor.menu.publish"/>
        </Button>
        <div className="text-secondary">
          <EditorMenu/>
        </div>
        <div className="mr-2">
          <ConnectionIndicator/>
        </div>
      </Nav>
    </Navbar>
  )
}

export { TaskBar }
