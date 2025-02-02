describe('Manage Credit Requests E2E', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('input[name="username"]').type('admin');
    cy.get('input[name="password"]').type('admin');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/admin');
    cy.visit('/admin/credit-requests');
  });

  it('should display the credit requests table', () => {
    cy.get('table').should('exist');
    cy.get('table thead').should('contain', 'ID').and('contain', 'Amount').and('contain', 'Status');
    cy.get('table tbody tr').should('have.length.greaterThan', 0);
  });

  it('should approve a credit request', () => {
    cy.get('table tbody tr').first().within(() => {
      cy.contains('Approve').click({ force: true });
    });

    cy.get('table tbody tr').first().should('contain', 'APPROVED');
  });

  it('should reject a credit request', () => {
    cy.get('table tbody tr').first().within(() => {
      cy.contains('Reject').click({ force: true });
    });

    cy.get('table tbody tr').first().should('contain', 'REJECTED');
  });

  it('should approve a credit request with API intercept', () => {
    cy.intercept('PUT', '/api/credit-requests/approve/*', {
      statusCode: 200,
      body: {
        id: 1,
        amount: 5000,
        status: 'APPROVED',
        interestRate: 5,
        startDate: '2025-01-01',
        endDate: '2025-12-31',
        eligibilityStatus: 'ELIGIBLE',
      },
    }).as('approveRequest');

    cy.get('table tbody tr').first().within(() => {
      cy.contains('Approve').click({ force: true });
    });

    cy.wait('@approveRequest');
    cy.get('table tbody tr').first().should('contain', 'APPROVED');
  });

  it('should reject a credit request with API intercept', () => {
    cy.intercept('PUT', '/api/credit-requests/approve/*', {
      statusCode: 200,
      body: {
        id: 1,
        amount: 5000,
        status: 'REJECTED',
        interestRate: 5,
        startDate: '2025-01-01',
        endDate: '2025-12-31',
        eligibilityStatus: 'ELIGIBLE',
      },
    }).as('rejectRequest');

    cy.get('table tbody tr').first().within(() => {
      cy.contains('Reject').click({ force: true });
    });

    cy.wait('@rejectRequest');
    cy.get('table tbody tr').first().should('contain', 'REJECTED');
  });



});
