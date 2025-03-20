// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
///<reference types = "Cypress"/>
import './commands'
import { LoginPage } from '../pages/loginPage'
import * as login from '../fixtures/credentials.json'

const loginPage = new LoginPage();

beforeEach(()=>{
    cy.visit(login.baseUrl)
    //verify the login page details
    loginPage.clickOnLoginButton();
    loginPage.verifyErrorMessagesWhileInvalidLogin();
    loginPage.loginToApplication(login.email, login.password);
    loginPage.waitforPageToLoad();
    loginPage.verifyLoginIsSuccessfull();
})