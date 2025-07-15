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
    cy.get('[data-testid="ingredient-card"]')
      .first()
      .within(() => {
        // Кликнуть по кнопке "Добавить"
        cy.contains('Добавить').click();
      });
    // Проверить, что элемент появился в конструкторе
    cy.get('[data-testid="constructor-item"]').should('exist');
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
