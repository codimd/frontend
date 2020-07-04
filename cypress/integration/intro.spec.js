/* eslint-disable @typescript-eslint/no-unsafe-call */
describe('Intro', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Cover Button are hidden when logged in', () => {
    it('Sign in Cover Button', () => {
      cy.get('.cover-button.btn-success').should('not.exist')
    })

    it('Features Cover Button', () => {
      cy.get('.cover-button.btn-primary').should('not.exist')
    })
  })

  describe('Cover Button are shown when logged out', () => {
    beforeEach(() => {
      cy.logout()
    })

    it('Sign in Cover Button', () => {
      cy.get('.cover-button.btn-success').should('exist')
    })

    it('Features Cover Button', () => {
      cy.get('.cover-button.btn-primary').should('exist')
    })
  })

  describe('Version', () => {
    it('open', () => {
      cy.get('#versionModal').should('not.be.visible')
      cy.get('#version').click()
      cy.get('#versionModal').should('be.visible')
    })

    it('close', () => {
      cy.get('#versionModal').should('not.be.visible')
      cy.get('#version').click()
      cy.get('#versionModal').should('be.visible')
      cy.get('body').click()
      cy.get('#versionModal').should('not.be.visible')
    })
  })
})
