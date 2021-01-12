/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

describe('YAML Array for deprecated syntax of document tags in frontmatter', () => {
  beforeEach(() => {
    cy.visit('/n/features')

    cy.get('.CodeMirror')
      .click()
      .get('textarea')
      .as('codeinput')
  })

  it('is shown when using old syntax', () => {
    cy.get('@codeinput')
      .fill('---\ntags: a, b, c\n---')
    cy.get('[data-cy="yamlArrayDeprecationAlert"]')
      .should('be.visible')
  })

  it('isn\'t shown when using inline yaml-array', () => {
    cy.get('@codeinput')
      .fill('---\ntags: [\'a\', \'b\', \'c\']\n---')
    cy.get('[data-cy="yamlArrayDeprecationAlert"]')
      .should('not.exist')
  })

  it('isn\'t shown when using multi line yaml-array', () => {
    cy.get('@codeinput')
      .fill('---\ntags:\n  - a\n  - b\n  - c\n---')
    cy.get('[data-cy="yamlArrayDeprecationAlert"]')
      .should('not.exist')
  })
})