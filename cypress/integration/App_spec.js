describe('Spreadsheet app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  it('Rows and columns form is shown', function () {
    cy.get('.form')
      .children()
      .should('contain', 'Rows')
      .and('contain', 'Columns')
      .and('contain', 'Add')
    cy.get('input[name=rows]')
      .should('have.attr', 'type', 'number')
      .and('have.attr', 'max', 100)
    cy.get('input[name=cols]')
      .should('have.attr', 'type', 'number')
      .and('have.attr', 'max', 26)
  })

  it('Inputs are required', function () {
    cy.get('button[type=submit]').click()
    cy.get('.form')
      .children()
      .should('contain', 'Rows number is required')
      .and('contain', 'Columns number is required')
  })

  it('Inputs work successfully with given values', function () {
    cy.get('input[name=rows]').type(10)
    cy.get('input[name=cols]').type(10)
    cy.get('button[type=submit]').click()
    cy.get('.sheet').children().should('contain', '10').and('contain', 'J')
    cy.get('.sheet').find('.input').should('have.length', 100)
  })

  describe('After enter rows and columns values', function () {
    beforeEach(function () {
      cy.get('input[name=rows]').type(10)
      cy.get('input[name=cols]').type(10)
      cy.get('button[type=submit]').click()
    })

    it('Function bar must be disabled on the first time', function () {
      cy.get('.kaputt')
        .should('have.attr', 'disabled', 'disabled')
        .and('have.css', 'backgroundColor', 'rgb(128, 128, 128)')
    })
    it('Cell has class active on focus, function bar will be enable after selecting a cell', function () {
      cy.get('.input').eq(0).click().should('have.class', 'active')
      cy.get('.kaputt').should('not.have.attr', 'disabled', 'disabled')
      cy.get('.input').eq(1).click().should('have.class', 'active')
      cy.get('.input').eq(0).should('not.have.class', 'active')
      cy.get('.input').eq(2).click().should('have.class', 'active')
      cy.get('.input').eq(1).should('not.have.class', 'active')
    })
    it('Function bar and cells are sync', function () {
      cy.get('.input').eq(0).type('Some text')
      cy.get('.kaputt')
        .should('have.value', 'Some text')
        .type('{backspace}{backspace}{backspace}{backspace}{backspace}thing')
      cy.get('.input').eq(0).should('have.value', 'Something')
      cy.get('.input').eq(1).click()
      cy.get('.kaputt').should('have.value', '')
      cy.get('.input').eq(1).type('Another cell')
      cy.get('.kaputt')
        .should('have.value', 'Another cell')
        .type(
          '{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}lso works',
        )
      cy.get('.input').eq(1).should('have.value', 'Also works')
    })
  })
})
