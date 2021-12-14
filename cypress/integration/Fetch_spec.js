import 'cypress-real-events/support'

describe('Spreadsheet app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  describe('Fetch data from json placeholder with function bar and cell input', function () {
    beforeEach(function () {
      cy.get('input[name=rows]').type(10)
      cy.get('input[name=cols]').type(10)
      cy.get('button[type=submit]').click()
    })
    it('Fetch all data with cell input and function bar', function () {
      cy.get('#01 .input')
        .eq(0)
        .type('S{enter}')
        .then(() => {
          let result = Cypress.$('#01 .dropdown')
          if (result.length) {
            cy.get('#01 .dropdown').realHover()
            cy.wait(1000).get('#01 .level-2 > li').realHover()
            cy.wait(1000)
            cy.get('#01 .dropdown')
              .should('contain', 'Geton')
              .find('.level-2 > li')
              .should('have.length', 10)
              .and('contain', 'Timo')
              .and('contain', 'tmk')
              .and('contain', '546378567')
          }
        })
      cy.get('#11 .input').click()
      cy.get('.kaputt')
        .type('S{enter}')
        .then(() => {
          let result = Cypress.$('#11 .dropdown')
          if (result.length) {
            cy.get('#11 .dropdown').realHover()
            cy.wait(1000)

            cy.get('#11 .dropdown')
              .should('contain', 'Geton')
              .find('.level-2 > li')
              .should('have.length', 10)
              .and('contain', 'Timo')
              .and('contain', 'tmk')
              .and('contain', '546378567')
          }
        })
    })
    it('Dropdown children are hidden on initialized and are shown on hover', function () {
      cy.get('#13 .input')
        .eq(0)
        .type('S{enter}')
        .then(() => {
          let result = Cypress.$('#13 .dropdown')
          if (result.length) {
            cy.get('#13 .dropdown .level-2').should(
              'have.css',
              'display',
              'none',
            )
            cy.get('#13 .dropdown .level-3').should(
              'have.css',
              'display',
              'none',
            )
            cy.get('#13 .dropdown').realHover()
            cy.wait(1000)
            cy.get('#13 .level-2').should('have.css', 'display', 'block')
            cy.get('#13 .level-2 li').first().realHover()
            cy.wait(1000)
            cy.get('#13 .level-3').should('have.css', 'display', 'block')
          }
        })
    })
    it('Fetch data with 2 parameter', function () {
      cy.get('#14 .input')
        .eq(0)
        .type('S(s="Nhi"){enter}')
        .then(() => {
          let result = Cypress.$('#14 .dropdown')
          if (result.length) {
            cy.get('#14 .dropdown').realHover()
            cy.get('#14 .level-2 >li').realHover()
            cy.get('#14 .dropdown')
              .should('contain', 'Geton')
              .and('contain', 'Niina')
              .and('contain', '377829006')
          }
        })
      cy.get('#31 .input')
        .eq(0)
        .type('S(p="Niina"){enter}')
        .then(() => {
          let result = Cypress.$('#31 .dropdown')
          if (result.length) {
            cy.get('#31 .dropdown').realHover()
            cy.get('#31 .level-2 >li').realHover()
            cy.get('#31 .dropdown')
              .should('contain', 'Geton')
              .and('contain', 'Nhi')
              .and('contain', '377829006')
          }
        })
      cy.get('#55 .input')
        .eq(0)
        .type('S(o="377829006"){enter}')
        .then(() => {
          let result = Cypress.$('#55 .dropdown')
          if (result.length) {
            cy.get('#55 .dropdown').realHover()
            cy.get('#55 .level-2 >li').realHover()
            cy.get('#55 .dropdown')
              .should('contain', 'Geton')
              .and('contain', 'Nhi')
              .and('contain', 'Niina')
          }
        })
    })
    it('Fetch data with 2 parameter', function () {
      cy.get('#14 .input')
        .eq(0)
        .type('S(s="Nhi",p="Niina"){enter}')
        .then(() => {
          let result = Cypress.$('#14 .dropdown')
          if (result.length) {
            cy.get('#14 .dropdown').realHover()
            cy.get('#14 .level-2 >li').realHover()
            cy.get('#14 .dropdown')
              .should('contain', 'Geton')
              .and('contain', '377829006')
          }
        })
      cy.get('#31 .input')
        .eq(0)
        .type('S(p="Niina",o="377829006"){enter}')
        .then(() => {
          let result = Cypress.$('#31 .dropdown')
          if (result.length) {
            cy.get('#31 .dropdown').realHover()
            cy.get('#31 .level-2 >li').realHover()
            cy.get('#31 .dropdown')
              .should('contain', 'Geton')
              .and('contain', 'Nhi')
          }
        })
      cy.get('#55 .input')
        .eq(0)
        .type('S(p="Niina",o="377829006"){enter}')
        .then(() => {
          let result = Cypress.$('#55 .dropdown')
          if (result.length) {
            cy.get('#55 .dropdown').realHover()
            cy.get('#55 .level-2 >li').realHover()
            cy.get('#55 .dropdown')
              .should('contain', 'Geton')
              .and('contain', 'Nhi')
          }
        })
    })
  })
})
