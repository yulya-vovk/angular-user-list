/// <reference types="cypress" />

describe('User List App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('отображает заголовок', () => {
    cy.contains('Список пользователей').should('be.visible');
  });

  it('позволяет искать по имени', () => {
    cy.get('input').first().type('Анна');
    cy.get('.user-item').should('have.length', 1);
    cy.get('.user-item').should('contain.text', 'Анна');
  });

  it('фильтрует по статусу "активные"', () => {
    cy.get('select').select('active');
    cy.get('.user-item').should('have.length', 3);
  });

  it('показывает email при клике на пользователя', () => {
    cy.get('.user-item').first().click();
    cy.get('.selected-user').should('contain.text', 'anna@example.com');
  });
});
