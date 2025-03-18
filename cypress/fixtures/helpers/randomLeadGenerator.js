export let ContactName = `Contact_Persion_LEAD_${Math.floor(Math.random() * 1000000000)}`;
export let OrganizationName = `Organization_LEAD_${Math.floor(Math.random() * 1000000000)}`;
export let LeadName = `Lead_Name_${Math.floor(Math.random() * 1000000000)}`;
export let phoneNumber = Math.floor(Math.random() * 1000000000);
export let email = `test_lead${Math.random() * 10000}@testmail.com`

export function generateRandomNumber(min = 0, max = 10000) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}