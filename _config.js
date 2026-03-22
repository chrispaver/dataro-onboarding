const { google } = require('googleapis');

const CLIENT_ID     = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI  = process.env.REDIRECT_URI;

function makeOAuthClient() {
  return new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
}

const TEMPLATE_IDS = {
  offer:      '1Va8w_5mAK2dWKE4h416TqD4hig2679lRLEUdXHC3JZw',
  contractor: '1xEV3l8RFqSBQNn8xPbegvemMfjAaWtf77UXsavDsYR0'
};

const OPTIONAL_BLOCKS = {
  annualBonus: `[INCLUDE IF THE EMPLOYEE WILL RECEIVE AN ANNUAL BONUS, OTHERWISE DELETE THIS PARAGRAPH:  Following the end of each calendar year, you will be eligible to receive a discretionary performance bonus ("Annual Bonus") based on your performance and the performance of the Company during the applicable calendar year, as determined by the Company in its sole and absolute discretion.  Any Annual Bonus shall be paid in accordance with Company's generally applicable policies.]`,

  quarterlyBonus: `[INCLUDE IF THE EMPLOYEE WILL RECEIVE A QUARTERLY BONUS, OTHERWISE DELETE THIS PARAGRAPH:  Following the end of each calendar quarter, you will be eligible to receive a discretionary performance bonus ("Quarterly Bonus") based on your performance and the performance of the Company during the applicable calendar quarter, as determined by the Company in its sole and absolute discretion.  Any Quarterly Bonus shall be paid in accordance with Company's generally applicable policies. This compensation shall be considered normal income and will be subject to applicable state and federal income taxes.]`,

  commissions: `[INCLUDE IF THE EMPLOYEE WILL RECEIVE COMMISSIONS, OTHERWISE DELETE THIS PARAGRAPH:  In addition, you will be eligible to participate in Company's [TITLE OF COMMISSION PLAN], a copy of which is attached with this letter as Exhibit A.]`,

  stockOptions: `[INCLUDE IF THE EMPLOYEE WILL RECEIVE THE OPTION TO PURCHASE SHARES IN THE COMPANY, OTHERWISE DELETE THIS PARAGRAPH: Stock Options.  Subject to the approval of the Company's Board of Directors or its Compensation Committee, you will be granted an option to purchase [NUMBER] shares of the Company's [TYPE OF STOCK] Stock (the "Option"). The exercise price per share of the Option will be determined by the Board of Directors or the Compensation Committee when the Option is granted. The Option will be subject to the terms and conditions applicable to options granted under the Company's [YEAR AND TITLE OF STOCK PLAN] (the "Plan"), as described in the Plan and the applicable Stock Option Agreement.  You will vest in 25% of the Option shares after 12 months of continuous service, and the balance will vest in equal monthly installments over the next 36 months of continuous service, as described in the applicable Stock Option Agreement.]]`,

  benefitsEligible: `[INCLUDE IF THE EMPLOYEE IS ELIGIBLE FOR BENEFITS, OTHERWISE DELETE THE REMAINDER OF THIS PARAGRAPH:  that the Company may make available to you from time to time. The Company reserves the right to modify or terminate these benefits from time to time. [INCLUDE IF BENEFIT INFORMATION WILL BE PROVIDED DURING ONBOARDING, OTHERWISE DELETE THIS BRACKETED TEXT:  You will receive more detailed information about these benefits from [NAME OR DEPARTMENT] during the onboarding process][INCLUDE IF BENEFIT INFORMATION WILL BE PROVIDED WITH THE OFFER LETTER, OTHERWISE DELETE THIS BRACKETED TEXT:  A summary of available benefits is enclosed with this letter as Exhibit [#]]]`,

  commissionsAttachment: `[INCLUDE IF THE EMPLOYEE WILL RECEIVE COMMISSIONS, OTHERWISE DELETE THIS PARAGRAPH:  Exhibit A:\tCommission Plan]`,

  benefitsAttachment: `[INCLUDE IF EMPLOYEE IS ELIGIBLE FOR BENEFITS AND BENEFIT INFORMATION WILL BE PROVIDED DURING ONBOARDING, OTHERWISE DELETE THIS PARAGRAPH:  Exhibit [#]:\tBenefits Plan]`
};

const INCLUDE_PREFIXES = {
  annualBonus:      `[INCLUDE IF THE EMPLOYEE WILL RECEIVE AN ANNUAL BONUS, OTHERWISE DELETE THIS PARAGRAPH:  `,
  quarterlyBonus:   `[INCLUDE IF THE EMPLOYEE WILL RECEIVE A QUARTERLY BONUS, OTHERWISE DELETE THIS PARAGRAPH:  `,
  commissions:      `[INCLUDE IF THE EMPLOYEE WILL RECEIVE COMMISSIONS, OTHERWISE DELETE THIS PARAGRAPH:  `,
  benefitsEligible: `[INCLUDE IF THE EMPLOYEE IS ELIGIBLE FOR BENEFITS, OTHERWISE DELETE THE REMAINDER OF THIS PARAGRAPH:  `,
  stockOptions:     `[INCLUDE IF THE EMPLOYEE WILL RECEIVE THE OPTION TO PURCHASE SHARES IN THE COMPANY, OTHERWISE DELETE THIS PARAGRAPH: `
};

module.exports = { makeOAuthClient, TEMPLATE_IDS, OPTIONAL_BLOCKS, INCLUDE_PREFIXES };
