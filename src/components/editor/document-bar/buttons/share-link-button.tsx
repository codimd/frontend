import React, { Fragment, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Trans } from 'react-i18next'
import { CopyableField } from '../../../common/copyable-field/copyable-field'
import { CommonModal } from '../../../common/modals/common-modal'
import { TranslatedIconButton } from '../../../common/icon-button/translated-icon-button'

export const ShareLinkButton: React.FC = () => {
  const [showReadOnly, setShowReadOnly] = useState(false)

  return (
    <Fragment>
      <TranslatedIconButton size={'sm'} className={'mx-1'} icon={'history'} variant={'light'} onClick={() => setShowReadOnly(true)} i18nKey={'editor.documentBar.shareLink'}/>
      <CommonModal
        show={showReadOnly}
        onHide={() => setShowReadOnly(false)}
        closeButton={true}
        titleI18nKey={'editor.modal.shareLink.title'}>
        <Modal.Body>
          <span className={'my-4'}><Trans i18nKey={'editor.modal.shareLink.viewOnlyDescription'}/></span>
          <CopyableField content={'https://example.com'}/>
        </Modal.Body>
      </CommonModal>
    </Fragment>
  )
}
