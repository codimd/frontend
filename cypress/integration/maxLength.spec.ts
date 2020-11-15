const tenChars = '0123456789'

describe('status-bar text-length info', () => {
  beforeEach(() => {
    cy.visit('/n/test')
    cy.get('.CodeMirror textarea')
      .type('{ctrl}a', { force: true })
      .type('{backspace}')
  })

  it('tooltip shows full remaining on empty text', () => {
    cy.get('.status-bar div:nth-child(2) span:nth-child(2)')
      .attribute('title')
      .should('contain', ' 200 ')
  })

  it('color is warning on <= 100 chars remaining', () => {
    cy.get('.CodeMirror textarea')
      .type(`${tenChars.repeat(10)}`, { delay: 0.1 })
    cy.get('.status-bar div:nth-child(2) span:nth-child(2)')
      .should('have.class', 'text-warning')
  })

  it('color is danger on <= 0 chars remaining', () => {
    Cypress.config('defaultCommandTimeout', 20000)
    cy.get('.CodeMirror textarea')
      .type(`${tenChars.repeat(20)}`, { delay: 0.1 })
    cy.get('.status-bar div:nth-child(2) span:nth-child(2)')
      .should('have.class', 'text-danger')
  })
})

describe('show warning if content length > configured max length', () => {
  Cypress.config('defaultCommandTimeout', 20000)
  beforeEach(() => {
    cy.visit('/n/test')
    cy.get('.CodeMirror textarea')
      .type('{ctrl}a', { force: true })
      .type('{backspace}')
      .type(`${tenChars.repeat(20)}`, { delay: 0.1 })
  })

  it('show warning alert in renderer and as modal', () => {
    cy.get('.CodeMirror textarea')
      .type('a')
    cy.get('.modal-body.limit-warning')
      .should('be.visible')
    cy.get('.splitter .alert-danger')
      .should('be.visible')
  })
})
