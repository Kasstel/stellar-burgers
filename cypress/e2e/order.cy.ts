import selectors from '../support/selectors';

describe('тест заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/auth/user', {
      fixture: 'users.json'
    }).as('getUser');

    cy.intercept('POST', '**/orders', {
      fixture: 'order.json'
    }).as('orderPost');

    cy.intercept('GET', '**/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('testRefreshToken')
    );
    cy.setCookie('accessToken', 'testAccsessToken');

    cy.visit('/');

    cy.wait('@getIngredients');

    cy.wait('@getUser');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearAllCookies();
  });

  it('Собирает бургер и оформляет заказ', () => {
    cy.get(`${selectors.bunCard}`)
      .first()
      .within(() => {
        cy.contains(`${selectors.addButton}`).click();
      });

    cy.get(`${selectors.mainCard}`)
      .eq(0)
      .within(() => {
        cy.contains(`${selectors.addButton}`).click();
      });

    cy.get(`${selectors.sauceCard}`)
      .eq(0)
      .within(() => {
        cy.contains(`${selectors.addButton}`).click();
      });

    cy.get(`${selectors.orderButton}`).contains('Оформить заказ').click();

    cy.wait('@orderPost');

    cy.get(`${selectors.modal}`).should('exist');

    cy.contains('10101').should('exist');

    cy.get(`${selectors.modalOverlay}`).click({ force: true });

    cy.get(`${selectors.modal}`).should('not.exist');

    cy.get(`${selectors.constructorItem}`).should('not.exist');
  });
});
