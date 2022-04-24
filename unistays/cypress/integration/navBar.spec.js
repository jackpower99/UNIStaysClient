

const newLandlord = {
    email: "landlord00@landlord.ie",
    password: "testing123",
    confirm:  "testing123",
    role: "Landlord"
  };

const newStudent = {
    email: "student00@student.ie",
    password: "testing123",
    confirm:  "testing123",
    role: "Student"
  };

var token;

describe("Navigation", () => {

  before(() =>{

    cy.request('POST', 'http://localhost:8081/api/users/delete')
    cy.request('POST', 'http://localhost:8081/api/students/delete')
    cy.visit("/select-role");
    cy.get('.makeStyles-root-3 > .MuiPaper-root').click()

    cy.get(':nth-child(3) > .MuiInputBase-root > .MuiInputBase-input').clear().type(newStudent.email)
    cy.get(':nth-child(4) > .MuiInputBase-root > .MuiInputBase-input').clear().type(newStudent.password)
    cy.get(':nth-child(5) > .MuiInputBase-root > .MuiInputBase-input').clear().type(newStudent.confirm)
    cy.get(':nth-child(6) > .MuiButtonBase-root').click()

    cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').clear().type("John")
    cy.get('[style="height: 170px; max-height: 170px;"] > .MuiInputBase-root').clear().type("12, test street")
    cy.get(':nth-child(6) > .MuiInputBase-root > .MuiInputBase-input').clear().type("Doe")
    cy.get(':nth-child(8) > .MuiInputBase-root > .MuiInputBase-input').clear().type("WIT")
    cy.get(':nth-child(10) > .MuiInputBase-root > .MuiInputBase-input').clear().type("0876725289")
    cy.get(':nth-child(12) > .MuiInputBase-root > .MuiInputBase-input').clear().type("10/12/2011")
    cy.get(':nth-child(14) > .MuiInputBase-root > .MuiInputBase-input').clear().type("5")

    cy.get('[style="display: flex; flex-flow: row wrap; place-content: center flex-end; align-items: center; padding-right: 1vw; gap: 2px;"] > .MuiButton-root').click()

    cy.visit("/")

  })

      describe("Base test", () => {
          it("NavBar Visible fetched", () => {
            cy.get('.MuiToolbar-root > .MuiTypography-h4').contains("UNIStays");
          });
        });

        describe("Home Page Buttons work", () => {
            it("Navigation to student register on button click", () => {
              //  cy.get(':nth-child(6) > .MuiButtonBase-root').click()
                cy.visit("/");
                cy.get('.MuiGrid-container > :nth-child(1) > .MuiButton-root').click()
                cy.url().should('include', '/register')
            });
            it("Navigation to landlord register on button click", () => {
                cy.visit("/");
                cy.get('.css-oux40l-MuiGrid-root > .MuiButton-root').click()
                cy.url().should('include', '/register')
            });
          });


          describe("Check NavBar Buttons", () => {
            it("Navigate to profile page if logged in user", () => {
              cy.visit("/")
              cy.get('.MuiToolbar-root > :nth-child(4)').click()
                cy.get(':nth-child(3) > .MuiInputBase-root > .MuiInputBase-input').clear().type(newStudent.email)
                cy.get(':nth-child(4) > .MuiInputBase-root > .MuiInputBase-input').clear().type(newStudent.password)
                cy.get(':nth-child(6) > .MuiButtonBase-root').click()
                cy.wait(500)
                cy.get('.MuiToolbar-root > :nth-child(3)').click()
                cy.url().should('include', '/profile')
            });

            it("Navigation to login if not logged in user", () => {
                cy.visit("/");
                cy.get('.MuiToolbar-root > :nth-child(4)').click()
                cy.wait(500)
                cy.get('.MuiToolbar-root > :nth-child(3)').click()
                cy.url().should('include', '/login')
            });
          });

})