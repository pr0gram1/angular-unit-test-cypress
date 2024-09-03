describe('Home Page',() => {

  beforeEach(()=>{

    // mocking corses.json reply
    cy.fixture('courses.json').as("coursesJSON");

    //mocking HTTP backend server
    cy.server();

    // specify route and link the reply
    cy.route('/api/courses', "@coursesJSON").as("courses");

    //visit localhost page trought cypress test
    cy.visit('/');
 })

  it('should display list of courses',() => {

    //check if page contains specific string
    cy.contains("All Courses");

    cy.wait('@courses');

    cy.get("mat-card").should("have.length",9);

  });

  it('should display the advanced courses'), () => {
    //check the length of those 2 bottuns
    cy.get('.mat-tab-label').should('have.length', 2);

    //simulate click on last mat-tab-lable bottun
    cy.get('.mat-tab-label').last().click();

    //when we click advanced it should change dom
    cy.get('mat-tab-body-active .mat-card-title').its('length').should('be.gt', 1);

    cy.get('mat-tab-body-active .mat-card-title').first().should('contain', 'Angular Security Course')

  }
})


//run cypress npm run cypress:open

// you can use console on localhost page in cypress just line in local
