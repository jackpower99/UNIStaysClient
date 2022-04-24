const newLandlord = {
    email: "landlord00@landlord.ie",
    password: "testing123",
    confirm:  "testing123",
  };


describe("Student Form", () => {

    before(() =>{
        cy.request('POST', 'http://localhost:8081/api/users/delete')
        cy.request('POST', 'http://localhost:8081/api/landlords/delete')
        cy.visit("/select-role");
        cy.get('.makeStyles-root-4 > .MuiPaper-root').click()

        cy.get(':nth-child(3) > .MuiInputBase-root > .MuiInputBase-input').clear().type(newLandlord.email)
        cy.get(':nth-child(4) > .MuiInputBase-root > .MuiInputBase-input').clear().type(newLandlord.password)
        cy.get(':nth-child(5) > .MuiInputBase-root > .MuiInputBase-input').clear().type(newLandlord.confirm)
        cy.get(':nth-child(6) > .MuiButtonBase-root').click()
        
        cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').clear().type("John")
        cy.get(':nth-child(6) > .MuiInputBase-root > .MuiInputBase-input').clear().type("Doe")
        cy.get('[style="height: 155px; max-height: 155px;"] > .MuiInputBase-root').clear().type("Testing, test strret")
        cy.get(':nth-child(8) > .MuiInputBase-root > .MuiInputBase-input').clear().type("12/09/1978")
        cy.get(':nth-child(10) > .MuiInputBase-root > .MuiInputBase-input').clear().type("0876725289")

        cy.get('[style="display: flex; flex-flow: row wrap; place-content: center flex-end; align-items: center; padding-right: 1vw; gap: 2px;"] > .MuiButton-root').click()


        cy.visit("/")
        cy.get('.MuiToolbar-root > :nth-child(4)').click()
          cy.get(':nth-child(3) > .MuiInputBase-root > .MuiInputBase-input').clear().type(newLandlord.email)
          cy.get(':nth-child(4) > .MuiInputBase-root > .MuiInputBase-input').clear().type(newLandlord.password)
          cy.get(':nth-child(6) > .MuiButtonBase-root').click()
          cy.wait(5000)

          cy.get('.MuiToolbar-root > :nth-child(3)').click()
    })

    describe("Base test", () => {
        it("Lanldord Profile page visible", () => {
            cy.url().should('include', '/profile');
        });
      });

    })