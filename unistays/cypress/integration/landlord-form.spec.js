const newLandlord = {
    email: "landlord00@landlord.ie",
    password: "testing123",
    confirm:  "testing123",
  };


describe("Student Form", () => {

    beforeEach(() =>{
        cy.request('POST', 'http://localhost:8081/api/users/delete')
        cy.request('POST', 'http://localhost:8081/api/landlords/delete')
        cy.visit("/select-role");
        cy.get('.makeStyles-root-4 > .MuiPaper-root').click()

        cy.get(':nth-child(3) > .MuiInputBase-root > .MuiInputBase-input').clear().type(newLandlord.email)
        cy.get(':nth-child(4) > .MuiInputBase-root > .MuiInputBase-input').clear().type(newLandlord.password)
        cy.get(':nth-child(5) > .MuiInputBase-root > .MuiInputBase-input').clear().type(newLandlord.confirm)
        cy.get(':nth-child(6) > .MuiButtonBase-root').click()
    })

    describe("Base test", () => {
        it("Lanldord form visible fetched", () => {
            cy.get('#form > :nth-child(1)').contains("First Name");
        });
      });


      describe("Allow valid landlord", () => {
        it("Should allow valid inputs to register as a landlord", () => {
            cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').clear().type("John")
            cy.get(':nth-child(6) > .MuiInputBase-root > .MuiInputBase-input').clear().type("Doe")
            cy.get('[style="height: 155px; max-height: 155px;"] > .MuiInputBase-root').clear().type("Testing, test strret")
            cy.get(':nth-child(8) > .MuiInputBase-root > .MuiInputBase-input').clear().type("12/09/1978")
            cy.get(':nth-child(10) > .MuiInputBase-root > .MuiInputBase-input').clear().type("0876725289")

            cy.get('[style="display: flex; flex-flow: row wrap; place-content: center flex-end; align-items: center; padding-right: 1vw; gap: 2px;"] > .MuiButton-root').click()

            cy.url().should("include", "/")
        });
      });

      describe("Don't allow invalid landlord", () => {
        it("Should not allow invalid inputs to register as a landlord", () => {
            cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').clear()
            cy.get(':nth-child(6) > .MuiInputBase-root > .MuiInputBase-input').clear()
            cy.get('[style="height: 155px; max-height: 155px;"] > .MuiInputBase-root').clear()
            cy.get(':nth-child(8) > .MuiInputBase-root > .MuiInputBase-input').clear()
            cy.get(':nth-child(10) > .MuiInputBase-root > .MuiInputBase-input').clear()

            cy.get('[style="display: flex; flex-flow: row wrap; place-content: center flex-end; align-items: center; padding-right: 1vw; gap: 2px;"] > .MuiButton-root').click()

            cy.url().should("include", "/student-form")
        });
      });


    //   describe("Not allow invalid student", () => {
    //     it("Should not allow student to register without required fields.", () => {
    //         cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').clear()
    //         cy.get('[style="height: 170px; max-height: 170px;"] > .MuiInputBase-root').clear()
    //         cy.get(':nth-child(6) > .MuiInputBase-root > .MuiInputBase-input').clear()
    //         cy.get(':nth-child(8) > .MuiInputBase-root > .MuiInputBase-input').clear()
    //         cy.get(':nth-child(10) > .MuiInputBase-root > .MuiInputBase-input').clear()
    //         cy.get(':nth-child(12) > .MuiInputBase-root > .MuiInputBase-input').clear()
    //         cy.get(':nth-child(14) > .MuiInputBase-root > .MuiInputBase-input').clear()
    //         cy.get('[style="display: flex; flex-flow: row wrap; place-content: center flex-end; align-items: center; padding-right: 1vw; gap: 2px;"] > .MuiButton-root').click()
    //         cy.url().should("include", "/student-form")
    //     });
    //   });


}
)