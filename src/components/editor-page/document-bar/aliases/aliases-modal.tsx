/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { ChangeEvent, useCallback, useState } from 'react'
import { Button, Form, InputGroup, Modal } from 'react-bootstrap'
import { CommonModal, CommonModalProps } from '../../../common/modals/common-modal'
import { Trans, useTranslation } from 'react-i18next'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import { addNoteAlias } from '../../../../redux/note-details/methods'
import { useApplicationState } from '../../../../hooks/common/use-application-state'
import { ApplicationState } from '../../../../redux'
import { ShowIf } from '../../../common/show-if/show-if'
import { AliasListEntry } from './alias-list-entry'

/**
 * Component that holds a modal containing a list of aliases associated with the current note.
 *
 * @param show True when the modal should be visible, false otherwise.
 * @param onHide Callback that is executed when the modal is dismissed.
 */
export const AliasesModal: React.FC<CommonModalProps> = ({ show, onHide }) => {
  const { t } = useTranslation()
  const [newAlias, setNewAlias] = useState('')
  const [newAliasInvalid, setNewAliasInvalid] = useState(false)
  const aliases = useApplicationState((state: ApplicationState) => state.noteDetails.aliases)
  const primaryAlias = useApplicationState((state: ApplicationState) => state.noteDetails.primaryAlias)

  /**
   * Handles a submission of the new alias input field.
   * Calls the redux method and clears the input field on success or shows makes an error text visible on failure.
   */
  const addAlias = useCallback(() => {
    addNoteAlias(newAlias)
      .then(() => {
        setNewAlias('')
      })
      .catch((error) => {
        console.error(error)
        setNewAliasInvalid(true)
      })
  }, [setNewAliasInvalid, newAlias, setNewAlias])

  /**
   * Handles a change event of the new alias input field.
   * Validates whether the input value matches the regex for aliases and only updates the input field if this succeeds.
   *
   * @param event The change event from the input field.
   */
  const newAliasInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.currentTarget.value
      if (!/^[a-z0-9_-]*$/.test(newValue)) {
        return
      }
      setNewAlias(newValue)
      setNewAliasInvalid(false)
    },
    [setNewAlias, setNewAliasInvalid]
  )

  return (
    <CommonModal
      show={show}
      onHide={onHide}
      closeButton={true}
      data-cy={'aliases-modal'}
      titleI18nKey={'editor.modal.aliases.title'}>
      <Modal.Body>
        <p>
          <Trans i18nKey={'editor.modal.aliases.explanation'} />
        </p>
        <ul className={'list-group'}>
          {aliases.map((alias) => (
            <AliasListEntry alias={alias} isPrimary={alias === primaryAlias} key={alias} />
          ))}
          <li className={'list-group-item'}>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                addAlias()
              }}>
              <InputGroup className={'mr-1 mb-1'} hasValidation={true}>
                <Form.Control
                  value={newAlias}
                  placeholder={t('editor.modal.aliases.addAlias')}
                  onChange={newAliasInputChange}
                  isInvalid={newAliasInvalid}
                  required={true}
                />
                <Button
                  variant='light'
                  className={'text-secondary ml-2'}
                  title={t('editor.modal.aliases.addAlias')}
                  onClick={addAlias}>
                  <ForkAwesomeIcon icon={'plus'} />
                </Button>
              </InputGroup>
              <ShowIf condition={newAliasInvalid}>
                <small className={'text-danger'}>
                  <Trans i18nKey={'editor.modal.aliases.errorAddingAlias'} />
                </small>
              </ShowIf>
            </form>
          </li>
        </ul>
      </Modal.Body>
    </CommonModal>
  )
}
