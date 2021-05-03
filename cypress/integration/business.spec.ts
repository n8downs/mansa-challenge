/// <reference types="cypress" />

context('business screen', () => {
  it('searches for a SIREN and checks account transactions', () => {
    cy.visit('http://localhost:3000');
    cy.get('input[placeholder="SIREN"]').type('833079619{enter}');
    cy.get('h5').should('have.text', 'ALI RAMI');

    cy.get('a[aria-label="account ending in 8346"]').click();
    cy.get('#transactions-list-heading').should('have.text', 'Transactions');
    cy.get('ul[aria-labelledby="transactions-list-heading"] > li').should(
      'have.length.greaterThan',
      0
    );
  });
});
