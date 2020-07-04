import { languages } from '../fixtures/languages'

describe('Languages', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('all languages are available', () => {
    cy.get('option').as('languages')
    cy.get('@languages').should('have.length', 28)
    languages.forEach(language => {
      cy.get('@languages').contains(language)
    })
  })

  it('language changes affect the UI', () => {
    cy.get('select').find(':selected').contains('English')
    cy.get('.d-inline-flex.btn-primary').find('span').contains('New note')
    cy.get('select').select('Deutsch')
    cy.get('.d-inline-flex.btn-primary').find('span').contains('Neue Notiz')
  })
})
