interface ICurrentPenaltyAmounts {
  URI: string;
  penaltyId: number;
  ownInstalmentPenalty: number;
  roundedAmount: number;
  roundingError: number;
  paidPenalty: number;
  waived: number;
  loanInstalmentId: number;
  index: number;
}
interface ILoanInstallments {
  URI: string;
  id: number;
  accountId: number;
  obligatoryPaymentDate: Date;
  lastPenaltyCalculationDate: Date;
  initialPrincipalDue: number;
  initialLoanAccountBalance: number;
  currentPenaltyAmount: number;
  currentPenaltyAmounts: ICurrentPenaltyAmounts[];
  currentFeeAmount: number;
  currentFeeAmounts: [];
  currentPrincipalDue: number;
  ownInstalmentInterest: number;
  currentInterestDue: number;
  statusId: number;
  repaidDate: Date;
  isPrepayment: boolean;
  isObliterated: boolean;
  isSkipped: boolean;
  isZeroth: boolean;
  isNonPay: boolean;
  interestRoundingError: number;
  capitalizedInterestRoundingError: number;
  ownScheduledInterest: number;
  scheduledInterest: number;
  propagatedScheduledInterestError: number;
  paidFee: number;
  paidPenalty: number;
  paidInterest: number;
  instalmentGroupIndex: number;
  gracePeriodType: null;
  appliedSections: boolean;
  modifiedAt: Date;
}

interface IClient {
  URI: string;
  approvedOn: Date;
  branchName: string;
  clientID: number;
  clientStatus: string;
  clientType: string;
  createdOn: Date;
  name: string;
}

interface ILoan {
  URI: string;
  accountClassification: string;
  accountId: number;
  accountStatus: string;
  clientExternalId: string;
  daysInArrears: number;
  disbursementOn: Date;
  effectiveInterestRate: number;
  initialisedForClientUseOn: Date;
  interestAccrualStrategy: string;
  interestRate: number;

  isLocked: boolean;
  isRestructured: boolean;
  lastActionOccurredOn: Date;
  loanAmount: number;
  loanProductExternalId: string;
  loanProductId: number;
  loanPurpose: number;
  numberOfInstalments: number;
  organisationTreePath: string;

  scheduleStartDate: Date;
  secondInstalmentDate: Date;
  statusChangedOn: Date;
  tentativeDisbursementDate: Date;
  upToDateInstalments: number;
  userDefinedInterestRate: number;

  userDefinedAddOnRate: number;
  gracePeriodNumberOfInstalmentIntervals: number;
  payInstalments: number;
  typeOfBusiness: string;
  economicActivity: string;
  debtCapacity: string;
  workingCapital: string;
  otherFinancingLendingName: string;
  otherLoanMonthlyInstalment: number;
  otherLoanTermMonths: number;
  otherLoanRemainingTermMonths: number;
  applicationType: number;
  deviation: number;
  multiplierForCalculation: number;
  requiredDepositBalance: number;
  automaticRepayment: boolean;
  automaticRepaymentEndDate: number;
  olbP: boolean;
  olbI: boolean;
  deviationLevel: string;
  pendingOperationOn: Date;
  outstandingTotal: number;
}
export interface IAccount {
  URI: string;
  accountId: number;
  createdOn: Date;
  accountTypeId: number;
  accountExternalId: string;
  clientId: number;
  clientExternalId: string;
  clientName: string;
  productExternalId: string;
  productName: string;
  accountTypeName: string;
  accountStatusName: string;
  clientTypeName: string;
  productType: string;
}

export interface IDataItems {
  clientLoanCycle: number;
  deposit: number;
  loan: ILoan;
  account: IAccount;
  client: IClient;
  loanInstalments: ILoanInstallments[];
}

export interface IDataSource
  extends
    IClient,
    IAccount,
    ILoan,
    ILoanInstallments,
    Pick<IDataItems, "clientLoanCycle" | "deposit"> {
  counter: number;
}
