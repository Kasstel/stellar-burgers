describe('тест заказа', () => {
  beforeEach(() => {

    // Настраиваем интерсепторы ДО посещения страницы
    cy.intercept('GET', '**/auth/user', {
      fixture: 'users.json'
    }).as('getUser');

    cy.intercept('POST', '**/orders', {
      fixture: 'order.json'
    }).as('orderPost');

    cy.intercept('GET', '**/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    window.localStorage.setItem('refreshToken', JSON.stringify('testRefreshToken'))
    cy.setCookie('accessToken', 'testAccsessToken')

    cy.visit('http://localhost:4000/');


    cy.wait('@getIngredients');

    cy.wait('@getUser');
  });

  afterEach(()=>{
    cy.clearLocalStorage();
    cy.clearAllCookies();
  })

  it('Собирает бургер и оформляет заказ', () => {
  
    cy.get('[data-type="bun"]')
      .first()
      .within(() => {
        cy.contains('Добавить').click();
      });


    cy.get('[data-type="main"]')
      .eq(0)
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.get('[data-type="sauce"]')
      .eq(0)
      .within(() => {
        cy.contains('Добавить').click();
      });


    cy.get('[data-testid="order-button"]').contains('Оформить заказ').click();

    cy.wait('@orderPost');

    
    cy.get('[data-testid="modal"]').should('exist');
    
    cy.contains('10101').should('exist');


    cy.get('[data-testid="modal-overlay"]').click({ force: true });


    cy.get('[data-testid="modal"]').should('not.exist');


    cy.get('[data-testid="constructor-item"]').should('not.exist');
  });
});
