let accomodations;
let token;

const registeredLandlord = {
    email: "landlord@landlord.ie",
    password: "testing123"
  };

const registeredStudent = {
    email: "student@student.ie",
    password: "testing123"
  };

describe("Home Page", () => {
    before(() => {
      cy.visit("/");
      // Get movies from TMDB and store in movies variable.
      cy.request(
        'http://localhost:8081/api/accomodations'
      )
        .its("body")    // Take the body of HTTP response from TMDB
        .then((response) => {
            accomodations = response.data
        });
    });

    describe("Base test", () => {
        it("accomodations fetched", () => {
            cy.get("h7").contains("Address:");
        });
      });

}
)