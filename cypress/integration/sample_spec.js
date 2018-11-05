describe('Home page', () => {
  describe('When a Guest visits the Home page', () => {
    beforeEach(() => {
      cy.viewport(1024, 768)
      cy.server()
      cy.route({
        method: 'POST',
        url: '/tealeaf',
        response: {}
      })
      cy.visit('https://www.walmart.com/')
    })

    it('then they should see Store Pickup, Trending, and Free Shipping', () => {
      cy.contains(/Shop\s+online\W+pick\s+up/)
      cy.contains(/Trending\s+near/)
      cy.contains(/Free\s+2-Day\s+Shipping/i)
    })

    describe('and clicks on the Account button', () => {
      afterEach(() => {
        const cancel = 'button.GlobalAccountMenu-closeBtn'
        cy.get(cancel).click()
      })

      it('then they should see the Account panel', () => {
        const account = 'button.GlobalHeaderBubblesNav-accountBubble'
        cy.get(account).click()
        cy.contains('Sign In')
        cy.contains('Track Orders')
        cy.contains('Reorder Items')
        cy.contains('Create Account')
        cy.contains('Help')
      })
    })

    describe('and subscribes to newsletter', () => {
      it('then they should see the success modal', () => {
        cy.get('footer').scrollIntoView()
        cy.get('footer input').type('test123@walmart.com')
        cy.get('footer .button--primary').click()
        cy.contains('Thank you')
      })
    })

    describe('and clicks the Hamburger Menu', () => {
      it('then they should see the left hand menu panel', () => {
        cy.get('.Header-leftNav > .button > .button-wrapper > .elc-icon').click()
        cy.contains('Free Grocery Pickup')
        cy.contains('Reorder Items')
        cy.contains('Track Orders')
        cy.wait(100)
        // first selector is for vanilla js, 2nd is for current production
        cy.get('.deptButton-9, .dept-nav-btn-lvl-1:nth-child(10)').click()
        cy.contains('Pharmacy')
      })
    })
  })
})
