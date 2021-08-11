/// <reference types="cypress" />

describe('login', () => {
    it('should login successfully', () => {
        let user = { "email": "fulano@qa.com", "password": "teste" }
        cy.request({
            method: 'POST',
            url: '/login',
            body: user
        }).should((response) => {
            expect(response.status).eq(200)
            expect(response.body.message).eq('Login realizado com sucesso')
            expect(response.body.authorization).to.not.be.null
        })
    })

    it('should attempt login with invalid credentials', () => {
        let user = { "email": "invalidemail@qa.com", "password": "teste" }
        cy.request({
            method: 'POST',
            url: '/login',
            body: user,
            failOnStatusCode: false
        }).should((response) => {
            expect(response.status).to.equal(401)
            expect(response.body.message).to.equal('Email e/ou senha inválidos')
        })
    })
})