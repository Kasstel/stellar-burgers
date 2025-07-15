describe('Модальное окно ингредиента', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.visit('http://localhost:4000/');
    cy.wait('@getIngredients');
  });

  it('Открывает модалку при клике на ингредиент и отображает контент', () => {
    cy.get('[data-testid="ingredient-card"]').first().click();

    cy.get('[data-testid="modal"]').should('exist');
    cy.get('[data-testid="modal-title"]').should(
      'contain.text',
      'Детали ингредиента'
    );

    cy.get('[data-testid="ingredient-name"]').should('exist');
    cy.get('[data-testid="ingredient-image"]').should('be.visible', {
      force: true
    });
  });

  it('Закрывает модалку по кнопке', () => {
    cy.get('[data-testid="ingredient-card"]').first().click();

    cy.get('[data-testid="modal"]').should('exist');

    cy.get('[data-testid="modal-close-button"]').click();

    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('Закрывает модалку по клику на оверлей', () => {
    cy.get('[data-testid="ingredient-card"]').first().click();

    cy.get('[data-testid="modal"]').should('exist');

    cy.get('[data-testid="modal-overlay"]').click({ force: true });

    cy.get('[data-testid="modal"]').should('not.exist');
  });
});
