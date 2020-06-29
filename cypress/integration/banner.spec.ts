import { banner } from '../support/config'

describe('Banner', () => {
  beforeEach(() => {
    cy.visit('/')
    expect(localStorage.getItem('bannerTimeStamp')).to.be.null
  })

  it('text correct', () => {
    cy.get('.alert-primary.show').contains(banner.text)
  })

  it('text dismissable', () => {
    cy.get('.alert-primary.show').contains(banner.text)
    cy.get('.alert-primary.show').find('.fa-times').click().then(() => {
      expect(localStorage.getItem('bannerTimeStamp')).to.equal(banner.timestamp)
    })
    cy.get('.alert-primary.show').should('not.exist')
  })
})
