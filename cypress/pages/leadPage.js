import { LEAD_PAGE } from "../fixtures/locators"

export default class LeadPage {

    //Getter Methods

    getAddLeadButton() {
        return cy.get(LEAD_PAGE.ADD_LEAD_BUTTON)
    }

    getAddModal() {
        return cy.get(LEAD_PAGE.ADD_MODAL)
    }

    getInputDetails() {
        return cy.get(LEAD_PAGE.MODAL_INPUT_BOX)
    }

    getTitleInputDetails() {
        return cy.get(LEAD_PAGE.INPUT_TITLE_KEY)
    }

    getOtherInputDetails() {
        return cy.get(LEAD_PAGE.PHONE_NUMBER_INPUT_KEY)
    }

    getSaveButton() {
        return cy.get(LEAD_PAGE.SAVE_BUTTON)
    }

    getRowInputPage() {
        return cy.get(LEAD_PAGE.ROW_PAGE)
    }

    getArchiveButton() {
        return cy.get(LEAD_PAGE.ARCHIVE_BUTTON)
    }

    getArchiveIcon() {
        return cy.get(LEAD_PAGE.ARCHIVE_ICON)
    }

    getUnarchiveButton() {
        return cy.get(LEAD_PAGE.UNARCHIVE_BUTTON)
    }

    getCreatedPopup() {
        return cy.get(LEAD_PAGE.CREATED_POPUP)
    }

    getInboxIcon() {
        return cy.get(LEAD_PAGE.INBOX_ICON)
    }

    getSnackarMessage() {
        return cy.get(LEAD_PAGE.SNACKAR_MESSAGE)
    }

    getLeadValueInput() {
        return cy.get(LEAD_PAGE.LEAD_VALUE_INPUT)
    }

    getLeadLabels() {
        return cy.get(LEAD_PAGE.LEAD_LABELS)
    }

    getLeadLabelValues() {
        return cy.get(LEAD_PAGE.LEAD_LABEL_VALUES)
    }

    getLeadExpectedCloseDate() {
        return cy.get(LEAD_PAGE.LEAD_EXPECTED_CLOSE_DATE)
    }

    getLeadSourceChannel() {
        return cy.get(LEAD_PAGE.LEAD_SOURCE_CHANNEL)
    }

    getSourceChannelId(){
        return cy.get(LEAD_PAGE.LEAD_CHANNEL_ID)
    }

    getLeadVisibilityChannel(){
        return cy.get(LEAD_PAGE.LEAD_VISIBLITY_TO)
    }

    getLeadModalForm(){
        return cy.get(LEAD_PAGE.LEAD_MODAL)
    }

    getLeadEmail(){
        return cy.get(LEAD_PAGE.LEAD_EMAIL_INPUT)
    }

    //Action Methods

    clickOnAddLeadButton() {
        cy.intercept('POST','/v1/t').as('addModal')
        this.getAddLeadButton().should('be.visible').click();
        cy.wait('@addModal')
    }

    enterAllInputDetails(contactName, organizationName, leadName, phoneNumber) {
        this.getInputDetails().eq(0).should('be.visible').clear().type(contactName);
        this.getInputDetails().eq(1).should('be.visible').clear().type(organizationName);
        this.getTitleInputDetails().should('be.visible').clear().type(leadName);
        this.getOtherInputDetails().should('be.visible').type(phoneNumber);
    }

    enterAllLeadInputDetails(contactName, organizationName, leadName, phoneNumber, email, leadLabelValue, sourceChannel, ownerVisibilty){
        this.getInputDetails().eq(0).should('be.visible').clear().type(contactName);
        this.getInputDetails().eq(1).should('be.visible').clear().type(organizationName);
        this.getTitleInputDetails().should('be.visible').clear().type(leadName);
        this.getOtherInputDetails().should('be.visible').type(phoneNumber);
        this.getLeadEmail().clear().type(email)
        this.getLeadValueInput().should('be.visible').type(phoneNumber);
        this.getLeadLabels().should('be.visible').click();
        this.getLeadLabelValues().contains(leadLabelValue).click();
        this.getLeadSourceChannel().click();
        this.getLeadModalForm().contains(sourceChannel).click();
        this.getLeadExpectedCloseDate().type('03/29/2025{enter}')
        this.getSourceChannelId().type(phoneNumber);
        this.getLeadVisibilityChannel().click();
        this.getLeadModalForm().contains(ownerVisibilty).click();

    }

    clickOnSaveButton() {
        cy.intercept('POST','/v1/t').as('saveLead')
        this.getSaveButton().should('be.visible').click();
    }

    selectLead(organizationName) {
        cy.intercept('POST','/v1/t').as('openModal')
        this.getRowInputPage().contains(organizationName).click();
        cy.wait('@openModal')
    }

    archiveLead(organizationName) {
        this.selectLead(organizationName);
        cy.intercept('POST','/v1/t').as('archiveLead')
        this.getArchiveButton().should('be.visible').click();
        cy.wait('@archiveLead')
    }

    bulkCheckboxSelection(index){
        for(let i=1; i<=index; i++){
            cy.get('[type="checkbox"]+svg').eq(i).should('be.visible').click();
        }
    }

    bulkUnarchive(){
        cy.get('[data-testid="ActionBarBulkActions"]').should('be.visible').click();
    }

    clickOnBulkDeleteLead(){
        cy.get(LEAD_PAGE.BULK_DELETE).should('be.visible').click()
    }

    clickOnBulkArchiveLead(){
        cy.get(LEAD_PAGE.BULK_ARCHIVE).should('be.visible').click()
    }

    clickOnArchiveIcon() {
        this.getArchiveIcon().should('be.visible').click()
    }

    clickOnUnarchiveButton() {
        cy.intercept('POST','/leads/archived').as('unarchiveLead')
        this.getUnarchiveButton().should('be.visible').click()
    }

    clickOnInboxIcon() {
        this.getInboxIcon().should('be.visible').click()
    }

    clickOnConfirmButton(){
        cy.get('[data-testid="dialogDeleteButton"]').should('be.visible').eq(1).click()
    }

    clickOnTitleEdit(title){
        cy.get('[data-testid="PersonSection"] [class*="LinkedField"]').eq(1).trigger('mouseover').then(()=>{
            cy.get('[data-testid="PersonSection"] .cui5-button--variant-secondary').eq(0).click({force:true})
        }) 
        cy.get('[placeholder="Name"]').clear().type(title)
        cy.get('button[class*="ActionFooter"]').click();
    }

    clickLabel(label){
        cy.get('[data-testid="LabelsFilter"]').should('be.visible').click();
        cy.get('body').contains(label).eq(0).click();
    }

    restoreLeadDataAction(){
        cy.get('[data-testid="MoreActionsButton"]').should('be.visible').click();
        cy.get('body').contains('Restore data').click();
    }

    exportLeadResultsAction(){
        cy.get('[data-testid="MoreActionsButton"]').should('be.visible').click();
        cy.get('body').contains('Export filter results').should('be.visible').click();
    }

    importLeadDataAction(){
        cy.get('[data-testid="MoreActionsButton"]').should('be.visible').click();
        cy.wait(1000)
        cy.get('body').contains('Import data').click({force: true});
    }

    restoreDataLeadConfirmButton(){
        cy.get('[data-testid="restore-selected-button"]').click();
        cy.get('[data-testid="confirmation-dialog-restore-button"]').click();
    }

    //Verification Methods

    verifyAddModalPopupAppears() {
        this.getAddModal().should('be.visible').and('include.text', "Add lead");
    }

    verifyLeadIsCreatedSuccessfully(organizationName) {
        this.getSnackarMessage().should('be.visible').and('contain', `New lead "${organizationName}" created`)
    }

    verifyLeadIsPresentInLeadList(organizationName) {
        this.getRowInputPage().should('be.visible').and('contain', organizationName);
    }

    verifyCreatedPopupAppears(organizationName) {
        this.getCreatedPopup().should('be.visible').and('contain', organizationName);
    }

    verifyTheSelectedCheckbox(check){
        cy.get(LEAD_PAGE.SELECTED_CHECKBOXES).should('contain',`${check} selected`)
    }

    verifyLeadIsArchivedSuccessfully() {
        cy.get(LEAD_PAGE.SUCCESSFUL_SNACKBAR).should('be.visible').and('contain', `Selected leads were successfully archived`)
    }

    verifyLeadIsBulkDeletedSuccessfully() {
        cy.get(LEAD_PAGE.SUCCESSFUL_SNACKBAR).should('be.visible').and('contain', `Selected leads were successfully deleted`)
    }

    verifyLeadIsBulkUnarchiveSuccessfully() {
        cy.get(LEAD_PAGE.SUCCESSFUL_SNACKBAR).should('be.visible').and('contain', `Selected leads were successfully unarchived`)
    }

    verifyErrorMessageinContact(){
        cy.get('[data-test-key="related_person_id"]').should('contain','A person or organization is required')

    }

    verifyErrorMessageInOrganization(){
        cy.get('[data-test-key="related_org_id"]').should('contain','A person or organization is required')
    }

    verifyErrorMessageInTitle(){
        cy.get('[data-test-key="title"]').should('contain','Title is required')
    }

    verifyInvalidEmailErrorMessage(){
        cy.get('[data-test-key="email"]').should('contain','Email is not valid')
    }

    verifyInvalidPhoneErrorMessage(){
        cy.get('[data-test-key="phone"]').should('contain','Phone is not valid')
    }

    verifySaveButtonDisabled(){
        cy.get('[data-test="add-modals-save"]').should('have.attr', 'aria-disabled', 'true')
    }

    verifyUpdatedTitle(title){
        cy.get('[data-testid="PersonSection"] [data-testid="LinkedFieldTitleText"]').should('contain',title)
    }

    verifyTheListIsUpdatedwithfilter(label){
        cy.get('[data-testid="LabelBadge"]').should('contain',label)
    }

    verifyRestoreSuccessfull(){
        this.getSnackarMessage().should('be.visible').and('contain', `leads restored successfully`)
    }

    verifyExportdatsResults(){
        cy.get('[title="Export results"]').should('be.visible')
        cy.get('[data-testid="export-modal-continue"]').should('be.visible')
    }

    verifyImportDataFilePage(){
        cy.url().should('contain','/import')
    }
}