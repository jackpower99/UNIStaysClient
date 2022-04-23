let token;

const studentDetails={
    fname: "john",
    lnmae: "doe",
    dob: "12/12/2000",
    address: "12, test street",
    college: "WIT",
    YOS: 4,
    phone: "087928293",
}

const newStudent = {
    email: "student00@student.ie",
    password: "testing123",
    confirm:  "testing123",
    role: "Student"
  };

describe("Student Details Page", () => {

    before(() => {
        cy.request('POST', 'http://localhost:8081/api/users/delete')
        cy.visit("/select-role");
        cy.get('.makeStyles-root-3 > .MuiPaper-root').click()

        cy.get(':nth-child(3) > .MuiInputBase-root > .MuiInputBase-input').clear().type(newStudent.email)
        cy.get(':nth-child(4) > .MuiInputBase-root > .MuiInputBase-input').clear().type(newStudent.password)
        cy.get(':nth-child(5) > .MuiInputBase-root > .MuiInputBase-input').clear().type(newStudent.confirm)
        cy.get(':nth-child(6) > .MuiButtonBase-root').click()

    })

    // beforeEach(() => {
    //   cy.visit("/select-role");
    //   cy.get('.makeStyles-root-3 > .MuiPaper-root').click()
    // });
    describe("Allow Valid Submission tests", () => {
      it("should display register forms", () => {
        // cy.get('.makeStyles-root-3 > .MuiPaper-root').click()
        cy.url().should('include', '/student-form')
    
      });
      it("should allow register", () => {
        // cy.get('.makeStyles-root-3 > .MuiPaper-root').click()
        cy.url().should('include', '/student-form')
    
      });
      });
});