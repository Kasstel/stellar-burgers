import selectors from '../support/selectors';

describe('Модальное окно ингредиента', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json',
    }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('открывает модалку с корректным ингредиентом', () => {
    cy.get(selectors.ingredientCard).first().then(($card) => {
      const name = $card.find('[data-testid="ingredient-name"]').text();

      cy.wrap($card).click();

      cy.get(selectors.modal).should('exist');
      cy.get(selectors.modalTitle).should('contain.text', 'Детали ингредиента');
      cy.get(selectors.ingredientName).should('have.text', name);
      cy.get(selectors.ingredientImage).should('be.visible');
    });
  });

  it('закрывает модалку по кнопке', () => {
    cy.get(selectors.ingredientCard).first().click();
    cy.get(selectors.modal).should('exist');
    cy.get(selectors.modalCloseBtn).click();
    cy.get(selectors.modal).should('not.exist');
  });

  it('закрывает модалку по клику на оверлей', () => {
    cy.get(selectors.ingredientCard).first().click();
    cy.get(selectors.modal).should('exist');
    cy.get(selectors.modalOverlay).click({ force: true });
    cy.get(selectors.modal).should('not.exist');
  });
});
