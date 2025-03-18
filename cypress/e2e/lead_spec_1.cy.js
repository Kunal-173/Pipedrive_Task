///<reference types = "Cypress"/>
import LeadPage from "../pages/leadPage";
import { ContactName, OrganizationName, phoneNumber, LeadName } from "../fixtures/helpers/randomLeadGenerator";

const leadPage = new LeadPage();

describe('Feature - Lead Test Cases - Part 1', () => {

  it('Verify Lead is created with just mandatory fields i.e Person/Organization, Lead Title & Phone Number', () => {
    leadPage.clickOnAddLeadButton();
    leadPage.verifyAddModalPopupAppears();
    leadPage.enterAllInputDetails(ContactName, OrganizationName, LeadName, phoneNumber);
    leadPage.clickOnSaveButton();
    leadPage.verifyLeadIsCreatedSuccessfully(LeadName);
  })

  it('Verify Lead can be archived via Lead Details Page', ()=> {

    leadPage.verifyLeadIsPresentInLeadList(LeadName);
    leadPage.selectLead(LeadName);
    leadPage.verifyCreatedPopupAppears(LeadName);
    leadPage.archiveLead(LeadName);
    leadPage.clickOnArchiveIcon();
    leadPage.verifyLeadIsPresentInLeadList(LeadName);

  })

  it('Verify Lead can be unarchived via Lead Archived List Page', ()=> {

    leadPage.clickOnArchiveIcon();
    leadPage.verifyLeadIsPresentInLeadList(LeadName);
    leadPage.selectLead(LeadName);
    leadPage.clickOnUnarchiveButton();
    leadPage.clickOnInboxIcon();
    leadPage.verifyLeadIsPresentInLeadList(LeadName);

  })

  it('Verify Lead can be updated via Lead Details Page', ()=>{
    leadPage.verifyLeadIsPresentInLeadList(LeadName);
    leadPage.selectLead(LeadName);
    leadPage.clickOnTitleEdit(`${LeadName}+Edit`);
    leadPage.verifyUpdatedTitle(`${LeadName}+Edit`)
  })

})