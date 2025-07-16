import selectors from 'cypress/support/selectors';

describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.visit('http://localhost:4000/');
    cy.wait('@getIngredients');
  });

  it('добавляет ингредиент в конструктор', () => {
    // Найти первую карточку ингредиента
    cy.get(selectors.ingredientCard)
      .first()
      .within(($card) => {
        const name = $card.find(selectors.ingredientName).text();
        cy.contains('Добавить').click();

        cy.get(selectors.constructorItem).should('have.text', name);
      });
  });

  it('добавляет начинку в конструктор', () => {
    cy.get('[data-testid="ingredient-card"][data-type="main"]')
      .first()
      .within(() => {
        cy.contains('Добавить').click();
      });
    cy.get('[data-testid="constructor-item"]').should('exist');
  });

  it('добавляет соус в конструктор', () => {
    cy.get('[data-testid="ingredient-card"][data-type="sauce"]')
      .first()
      .within(() => {
        cy.contains('Добавить').click();
      });
    cy.get('[data-testid="constructor-item"]').should('exist');
  });
});
