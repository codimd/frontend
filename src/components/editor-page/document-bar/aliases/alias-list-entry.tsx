/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback } from 'react'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { makeNoteAliasPrimary, removeNoteAlias } from '../../../../redux/note-details/methods'
import { showErrorNotification } from '../../../../redux/ui-notifications/methods'
import { ShowIf } from '../../../common/show-if/show-if'

/**
 * Properties for the {@link AliasListEntry} component.
 */
export interface AliasListEntryProps {
  alias: string
  isPrimary: boolean
}

/**
 * Component that shows an entry in the aliases list with buttons to remove it or mark it as primary.
 *
 * @param alias The alias.
 * @param isPrimary True if this alias is the primary one for the current note, false otherwise.
 */
export const AliasListEntry: React.FC<AliasListEntryProps> = ({ alias, isPrimary }) => {
  const { t } = useTranslation()

  /**
   * Handles a click on the remove button.
   * Calls the removal redux method and shows an error notification on failure.
   */
  const onRemoveClick = useCallback(() => {
    removeNoteAlias(alias).catch(showErrorNotification(t('editor.modal.aliases.errorRemovingAlias')))
  }, [alias, t])

  /**
   * Handles a click on the "mark as primary" button.
   * Calls the corresponding redux method and shows an error notification on failure.
   */
  const onMakePrimaryClick = useCallback(() => {
    makeNoteAliasPrimary(alias).catch(showErrorNotification(t('editor.modal.aliases.errorMakingPrimary')))
  }, [alias, t])

  return (
    <li className={'list-group-item d-flex flex-row justify-content-between align-items-center'}>
      {alias}
      <div>
        <ShowIf condition={isPrimary}>
          <Button
            className={'mr-2 text-warning'}
            variant='light'
            disabled={true}
            data-cy={'alias-is-primary'}
            title={t('editor.modal.aliases.isPrimary')}>
            <ForkAwesomeIcon icon={'star'} />
          </Button>
        </ShowIf>
        <ShowIf condition={!isPrimary}>
          <Button
            className={'mr-2'}
            variant='light'
            title={t('editor.modal.aliases.makePrimary')}
            onClick={onMakePrimaryClick}
            data-cy={'make-alias-primary'}>
            <ForkAwesomeIcon icon={'star-o'} />
          </Button>
        </ShowIf>
        <Button
          variant='light'
          className={'text-danger'}
          title={t('editor.modal.aliases.removeAlias')}
          onClick={onRemoveClick}
          data-cy={'remove-alias'}>
          <ForkAwesomeIcon icon={'times'} />
        </Button>
      </div>
    </li>
  )
}
