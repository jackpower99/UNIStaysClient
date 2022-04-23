const newStudent = {
    email: "student00@student.ie",
    password: "testing123",
    confirm:  "testing123",
    role: "Student"
  };


describe("Student Form", () => {

    beforeEach(() =>{
        cy.request('POST', 'http://localhost:8081/api/users/delete')
        cy.request('POST', 'http://localhost:8081/api/students/delete')
        cy.visit("/select-role");
        cy.get('.makeStyles-root-3 > .MuiPaper-root').click()

        cy.get(':nth-child(3) > .MuiInputBase-root > .MuiInputBase-input').clear().type(newStudent.email)
        cy.get(':nth-child(4) > .MuiInputBase-root > .MuiInputBase-input').clear().type(newStudent.password)
        cy.get(':nth-child(5) > .MuiInputBase-root > .MuiInputBase-input').clear().type(newStudent.confirm)
        cy.get(':nth-child(6) > .MuiButtonBase-root').click()
    })

    describe("Base test", () => {
        it("Student form visible fetched", () => {
            cy.get('#form > :nth-child(13)').contains("Year of Study");
        });
      });


      describe("Allow valid student", () => {
        it("Should allow valid inputs to register as a student", () => {
            cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').clear().type("John")
            cy.get('[style="height: 170px; max-height: 170px;"] > .MuiInputBase-root').clear().type("12, test street")
            cy.get(':nth-child(6) > .MuiInputBase-root > .MuiInputBase-input').clear().type("Doe")
            cy.get(':nth-child(8) > .MuiInputBase-root > .MuiInputBase-input').clear().type("WIT")
            cy.get(':nth-child(10) > .MuiInputBase-root > .MuiInputBase-input').clear().type("0876725289")
            cy.get(':nth-child(12) > .MuiInputBase-root > .MuiInputBase-input').clear().type("10/12/2011")
            cy.get(':nth-child(14) > .MuiInputBase-root > .MuiInputBase-input').clear().type("5")

            cy.get('[style="display: flex; flex-flow: row wrap; place-content: center flex-end; align-items: center; padding-right: 1vw; gap: 2px;"] > .MuiButton-root').click()

            cy.url().should("include", "/")
        });
      });


      describe("Not allow invalid student", () => {
        it("Should not allow student to register without required fields.", () => {
            cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').clear()
            cy.get('[style="height: 170px; max-height: 170px;"] > .MuiInputBase-root').clear()
            cy.get(':nth-child(6) > .MuiInputBase-root > .MuiInputBase-input').clear()
            cy.get(':nth-child(8) > .MuiInputBase-root > .MuiInputBase-input').clear()
            cy.get(':nth-child(10) > .MuiInputBase-root > .MuiInputBase-input').clear()
            cy.get(':nth-child(12) > .MuiInputBase-root > .MuiInputBase-input').clear()
            cy.get(':nth-child(14) > .MuiInputBase-root > .MuiInputBase-input').clear()
            cy.get('[style="display: flex; flex-flow: row wrap; place-content: center flex-end; align-items: center; padding-right: 1vw; gap: 2px;"] > .MuiButton-root').click()
            cy.url().should("include", "/student-form")
        });
      });


}
)