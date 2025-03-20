///<reference types = "Cypress"/>

//locators
export const error_message = 'span.puco-field-message__text--error';
export const login_email = '#login';
export const login_password = '#password';
export const login_button = 'button.submit-button';
export const leads_page = '[data-testid="LeadsInboxWrapper"]';

export class LoginPage {
    
    //getter methods
    getLoginEmailField(){
        return cy.get(login_email);
    };

    getLoginPasswordField(){
        return cy.get(login_password);
    }

    getLoginButton(){
        return cy.get(login_button);
    }

    getLoginErrorMessage(){
        return cy.get(error_message);
    }

    getLandingPage(){
        return cy.get(leads_page);
    }

    //Action Methods

    clickOnLoginButton(){
        this.getLoginButton().should('be.visible').click();
    }

    loginToApplication(email, password){
        this.getLoginEmailField().type(email);
        this.getLoginPasswordField().type(password);
        this.clickOnLoginButton();
    }

    waitforPageToLoad() {
        cy.intercept('POST', '**/leads-graphql/**').as('pageLoad')
        cy.wait('@pageLoad')
    }


    //verification methods
    verifyErrorMessagesWhileInvalidLogin(){
        this.getLoginErrorMessage().eq(0).should('contain', 'Please add your email');
        this.getLoginErrorMessage().eq(1).should('contain', 'Please add your password');
    }

    verifyLoginIsSuccessfull(){
        cy.url().should('contain','/leads');
        this.getLandingPage().should('be.visible');
    }
}