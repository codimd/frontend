/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

describe('The status bar text length info', () => {
  const warningTestContent = ('0123456789'.repeat(10))
  const dangerTestContent = ('0123456789'.repeat(20))
  const tooMuchTestContent = `${dangerTestContent}a`

  beforeEach(() => {
    cy.visit('/n/test')

    cy.get('.CodeMirror ')
    .click()
    cy.get('.CodeMirror textarea')
    .as('markdownInput')
  })

  it('shows the maximal length of the document as number of available characters in the tooltip', () => {
    cy.get('.status-bar [data-cy="remainingCharacters"]')
    .attribute('title')
    .should('contain', ' 200 ')
  })

  it('color is set to "warning" on <= 100 characters remaining', () => {
    cy.get('@markdownInput')
    .fill(warningTestContent)
    cy.get('.status-bar [data-cy="remainingCharacters"]')
    .should('have.class', 'text-warning')
  })

  it('color is set to danger on <= 0 characters remaining', () => {
    cy.get('@markdownInput')
    .fill(dangerTestContent)
    cy.get('.status-bar [data-cy="remainingCharacters"]')
    .should('have.class', 'text-danger')
  })

  it('shows a warning and opens a modal', () => {
    cy.get('@markdownInput')
    .fill(tooMuchTestContent)
    cy.get('[data-cy="limitReachedModal"]')
    .should('be.visible')
    cy.get('[data-cy="limitReachedMessage"]')
    .should('be.visible')
  })

})
