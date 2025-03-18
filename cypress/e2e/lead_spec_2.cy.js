///<reference types = "Cypress"/>
import LeadPage from "../pages/leadPage";
import { generateRandomNumber } from "../fixtures/helpers/randomLeadGenerator";
import { ContactName, OrganizationName, phoneNumber, LeadName} from "../fixtures/helpers/randomLeadGenerator";

const leadPage = new LeadPage();
const Label_Name = ['Hot', 'Warm','Cold']

describe('Feature - Lead Test Cases - Part 2', () => {

    // This for loop is implemented for parameterization tests based on "label" value and to avoid repeatation of tests
    for(let labels of Label_Name){

         let ContactName = `Contact_Persion_LEAD_${generateRandomNumber(10, 99)}`;
         let OrganizationName = `Organization_LEAD_${generateRandomNumber(10, 99)}`;
         let LeadName = `Lead_Name_${generateRandomNumber(10, 99)}`;
         let phoneNumber = generateRandomNumber(1000,999);
         let email = `test_lead${Math.random() * 10000}@testmail.com`

        it(`Verify - Lead is created with all the details and ${labels} label is assigned to the lead`, () => {
            leadPage.clickOnAddLeadButton();
            leadPage.verifyAddModalPopupAppears();
            leadPage.enterAllLeadInputDetails(ContactName, OrganizationName, LeadName, phoneNumber, email, labels, 'Web visitors', `Item owner’s visibility group` );
            leadPage.clickOnSaveButton();
            leadPage.verifyLeadIsCreatedSuccessfully(LeadName);
          })
    }

    it('Verify bulk archiving of leads using checkbox selection and the successfull message', ()=>{
        leadPage.bulkCheckboxSelection(3)
        leadPage.verifyTheSelectedCheckbox(3)
        leadPage.clickOnBulkArchiveLead();
        leadPage.clickOnConfirmButton();
        leadPage.verifyLeadIsArchivedSuccessfully();
    })

    // This test case will fail due to bug - Pipedrive_Bug#1
    it('Verify there is an error while entering invalid email and the save button is disabled', ()=>{
        leadPage.clickOnAddLeadButton();
        leadPage.verifyAddModalPopupAppears();
        leadPage.enterAllInputDetails(ContactName, OrganizationName, LeadName, phoneNumber);
        leadPage.getLeadEmail().clear().type(phoneNumber)
        leadPage.verifyInvalidEmailErrorMessage()
        leadPage.verifySaveButtonDisabled()

    })

    // This test case will fail due to bug - Pipedrive_Bug#2
    it('Verify there is an error while entering invalid phone and the save button is disabled', ()=>{
        let inavlidPhone = '7hkakla'
        leadPage.clickOnAddLeadButton();
        leadPage.verifyAddModalPopupAppears();
        leadPage.enterAllInputDetails(ContactName, OrganizationName, LeadName, inavlidPhone);
        leadPage.verifyInvalidPhoneErrorMessage()
        leadPage.verifySaveButtonDisabled()

    })
    it('Verify there is error message while creating lead with all empty fields and the save button is disabled', ()=> {
        leadPage.clickOnAddLeadButton();
        leadPage.verifyAddModalPopupAppears();
        leadPage.clickOnSaveButton();
        leadPage.clickOnSaveButton();
        leadPage.verifyErrorMessageinContact()
        leadPage.verifyErrorMessageInOrganization();
        leadPage.verifyErrorMessageInTitle();
        leadPage.verifySaveButtonDisabled();
    })

    it('Verify bulk unarchiving of leads using checkbox selection and the successfull message', ()=> {
    
        leadPage.clickOnArchiveIcon();
        leadPage.bulkCheckboxSelection(3)
        leadPage.verifyTheSelectedCheckbox(3)
        leadPage.bulkUnarchive();
        leadPage.clickOnConfirmButton();
        leadPage.verifyLeadIsBulkUnarchiveSuccessfully();
    
      })

    it('Verify bulk deleting of leads using checkbox selectionand the successfull message', ()=>{
        leadPage.bulkCheckboxSelection(3)
        leadPage.verifyTheSelectedCheckbox(3)
        leadPage.clickOnBulkDeleteLead();
        leadPage.clickOnConfirmButton();
        leadPage.verifyLeadIsBulkDeletedSuccessfully();
    })

    it('Verify we can restore deleted lead within 30 day period and successfull message', ()=>{
        leadPage.restoreLeadDataAction()
        leadPage.bulkCheckboxSelection(1)
        leadPage.restoreDataLeadConfirmButton()
        leadPage.verifyRestoreSuccessfull();
    })

    it('Verify we can export the lead data list in XSLX/CSV format',()=>{
        leadPage.exportLeadResultsAction();
        leadPage.verifyExportdatsResults();

    })
    it('Verify the Import data Page', ()=>{
        leadPage.importLeadDataAction();
        leadPage.verifyImportDataFilePage();
    })
  
})