/// <reference types="cypress" />

describe('/users', () => {
    context('should list all users', () => {
        before(() => {
            cy.request('/users').as('req')
        })

        it('should return status code 200', () => {
            cy.request('/users').then((response) => {
                expect(response.status).to.equal(200)
            })
        })

        it('should return total number of users', () => {
            //cy.request('/users').then((response) => {
            //    expect(response.body).to.have.property('total', 12)
            //})

            cy.request('/users')
                .its('body')
                .its('total')
                .should('eq', 12)
        })
    })

    context('should find a user', () => {
        it('should return status code 200', () => {
            cy.request('/users/2')
                .its('status')
                .should('eq', 200)
        })

        it('should find the id of the user', () => {
            cy.request('/users/2')
                .its('body')
                .its('data')
                .its('id')
                .should('eq', 2)
        })
    })
})