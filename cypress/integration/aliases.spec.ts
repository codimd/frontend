/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

describe('Aliases', () => {
  beforeEach(() => {
    cy.visitTestEditor()
  })

  it('are correctly shown in modal', () => {
    cy.get('[data-cy="sidebar-btn-aliases"]').click()
    cy.get('[data-cy="aliases-modal"]').should('be.visible')
    cy.get('[data-cy="aliases-modal"] li:nth-child(1)').should('have.text', 'test')
    cy.get('[data-cy="aliases-modal"] li:nth-child(2)').should('have.text', 'e2e-test')
    cy.get('[data-cy="aliases-modal"] li:nth-child(3)').should('have.text', 'test-note')
    cy.get('[data-cy="aliases-modal"] li:nth-child(1) [data-cy="alias-is-primary"]').should('have.attr', 'disabled')
    cy.get('[data-cy="aliases-modal"] li:nth-child(2) [data-cy="make-alias-primary"]').should('not.have.attr', 'disabled')
    cy.get('[data-cy="aliases-modal"] li:nth-child(3) [data-cy="make-alias-primary"]').should('not.have.attr', 'disabled')
  })

  it('can be added', () => {
    cy.intercept('POST', '/mock-backend/api/private/notes/ABC11/metadata/alias/new-alias', {
      statusCode: 200
    })
    cy.get('[data-cy="sidebar-btn-aliases"]').click()
    cy.get('[data-cy="aliases-modal"]').should('be.visible')
    cy.get('[data-cy="aliases-modal"] input').click().type('new-alias{enter}')
    cy.get('[data-cy="aliases-modal"] li:nth-child(4)').should('have.text', 'new-alias')
  })


  it('can not be added when being blocklisted', () => {
    cy.intercept('POST', '/mock-backend/api/private/notes/ABC11/metadata/alias/forbidden-alias', {
      statusCode: 400
    })
    cy.get('[data-cy="sidebar-btn-aliases"]').click()
    cy.get('[data-cy="aliases-modal"]').should('be.visible')
    cy.get('[data-cy="aliases-modal"] input').click().type('forbidden-alias{enter}').should('have.class', 'is-invalid')
    cy.get('[data-cy="aliases-modal"] small.text-danger').should('be.visible')
  })

  it('can be removed', () => {
    cy.intercept('DELETE', '/mock-backend/api/private/notes/e2e-test/metadata/alias', {
      statusCode: 200
    })
    cy.get('[data-cy="sidebar-btn-aliases"]').click()
    cy.get('[data-cy="aliases-modal"]').should('be.visible')
    cy.get('[data-cy="aliases-modal"] li:nth-child(2)').should('have.text', 'e2e-test')
    cy.get('[data-cy="aliases-modal"] li:nth-child(2) [data-cy="remove-alias"]').click()
    cy.get('[data-cy="aliases-modal"] li:nth-child(2)').should('not.have.text', 'e2e-test')
  })

  it('can be marked as primary', () => {
    cy.intercept('PUT', '/mock-backend/api/private/notes/e2e-test/metadata/alias', {
      statusCode: 200
    })
    cy.get('[data-cy="sidebar-btn-aliases"]').click()
    cy.get('[data-cy="aliases-modal"]').should('be.visible')
    cy.get('[data-cy="aliases-modal"] li:nth-child(1) [data-cy="alias-is-primary"]').should('have.attr', 'disabled')
    cy.get('[data-cy="aliases-modal"] li:nth-child(2) [data-cy="make-alias-primary"]').should('not.have.attr', 'disabled')
    cy.get('[data-cy="aliases-modal"] li:nth-child(3) [data-cy="make-alias-primary"]').should('not.have.attr', 'disabled')
    cy.get('[data-cy="aliases-modal"] li:nth-child(2) [data-cy="make-alias-primary"]').click()
    cy.get('[data-cy="aliases-modal"] li:nth-child(1) [data-cy="make-alias-primary"]').should('not.have.attr', 'disabled')
    cy.get('[data-cy="aliases-modal"] li:nth-child(2) [data-cy="alias-is-primary"]').should('have.attr', 'disabled')
    cy.get('[data-cy="aliases-modal"] li:nth-child(3) [data-cy="make-alias-primary"]').should('not.have.attr', 'disabled')
  })
})
