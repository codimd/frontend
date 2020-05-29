import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './task-bar.scss'
import { Link } from 'react-router-dom'
import { Button, Nav, Navbar } from 'react-bootstrap'
import { DarkModeButton } from './dark-mode-button'
import { EditorViewMode } from './editor-view-mode'
import { Trans, useTranslation } from 'react-i18next'
import { EditorMenu } from './editor-menu'
import { ConnectionIndicator } from './connection-indicator'

const TaskBar: React.FC = () => {
  useTranslation()
  return (
    <Navbar bg={'light'}>
      <Nav className="mr-auto d-flex align-items-center">
        <Navbar.Brand>
          <Link to="/intro" className="text-secondary">
            <FontAwesomeIcon icon="file-alt"/> CodiMD
          </Link>
        </Navbar.Brand>
        <EditorViewMode/>
        <DarkModeButton/>
        <Button className="button-space-left text-secondary" size="sm"
          variant="outline-light">
          <FontAwesomeIcon icon="question-circle"/>
        </Button>
      </Nav>
      <Nav className="d-flex align-items-center text-secondary">
        <Button className="button-space-left text-secondary" size="sm" variant="outline-light">
          <FontAwesomeIcon icon="plus"/> <Trans i18nKey="new"/>
        </Button>
        <Button className="button-space-left text-secondary" size="sm" variant="outline-light">
          <FontAwesomeIcon icon="share-square"/> <Trans i18nKey="publish"/>
        </Button>
        <div className="text-secondary">
          <EditorMenu/>
        </div>
        <div className="button-space-right">
          <ConnectionIndicator/>
        </div>
      </Nav>
    </Navbar>
  )
}

export { TaskBar }
