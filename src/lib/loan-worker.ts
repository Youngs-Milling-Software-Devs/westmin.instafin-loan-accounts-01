/// <reference lib="webworker" />

import { IDataItems, IDataSource } from "@/_types";

export {};

self.onmessage = (event: MessageEvent) => {
  const { items, chunkIndex } = event.data as {
    items: IDataItems[];
    chunkIndex: number;
  };

  const dataSource: IDataSource[] = [];

  for (const element of items) {
    const { account, client, loanInstalments, clientLoanCycle, deposit, loan } =
      element;

    if (loanInstalments?.length) {
      loanInstalments.forEach((loanInstalment, index: number) => {
        dataSource.push({
          counter: index + 1,
          approvedOn: client.approvedOn,
          branchName: client.branchName,
          clientID: account.clientId,

          // Client information
          clientStatus: client.clientStatus,
          clientType: client.clientType,
          createdOn: client.createdOn,
          name: client.name,
          accountId: account.accountId,
          accountExternalId: account.accountExternalId,
          accountTypeId: account.accountTypeId,
          clientId: account.clientId,
          clientExternalId: account.clientExternalId,
          clientName: account.clientName,
          productExternalId: account.productExternalId,
          productName: account.productName,
          accountTypeName: account.accountTypeName,
          accountStatusName: account.accountStatusName,
          clientTypeName: account.clientTypeName,
          productType: account.productType,

          // Loan Installment
          id: loanInstalment.id,
          URI: loanInstalment.URI,
          obligatoryPaymentDate: loanInstalment.obligatoryPaymentDate,
          lastPenaltyCalculationDate: loanInstalment.lastPenaltyCalculationDate,
          initialPrincipalDue: loanInstalment.initialPrincipalDue,
          initialLoanAccountBalance: loanInstalment.initialLoanAccountBalance,
          currentPenaltyAmount: loanInstalment.currentPenaltyAmount,
          currentPenaltyAmounts: [],
          currentFeeAmount: loanInstalment.currentFeeAmount,
          currentFeeAmounts: [],
          currentPrincipalDue: loanInstalment.currentPrincipalDue,
          ownInstalmentInterest: loanInstalment.ownInstalmentInterest,
          currentInterestDue: loanInstalment.currentInterestDue,
          statusId: 0,
          repaidDate: loanInstalment.repaidDate,
          isPrepayment: loanInstalment.isPrepayment,
          isObliterated: loanInstalment.isObliterated,
          isSkipped: loanInstalment.isSkipped,
          isZeroth: loanInstalment.isZeroth,
          isNonPay: loanInstalment.isNonPay,
          interestRoundingError: loanInstalment.interestRoundingError,
          capitalizedInterestRoundingError:
            loanInstalment.capitalizedInterestRoundingError,
          ownScheduledInterest: loanInstalment.ownInstalmentInterest,
          scheduledInterest: loanInstalment.scheduledInterest,
          propagatedScheduledInterestError:
            loanInstalment.propagatedScheduledInterestError,
          paidFee: loanInstalment.paidFee,
          paidPenalty: loanInstalment.paidPenalty,
          paidInterest: loanInstalment.paidInterest,
          instalmentGroupIndex: loanInstalment.instalmentGroupIndex,
          gracePeriodType: loanInstalment.gracePeriodType,
          appliedSections: loanInstalment.appliedSections,
          modifiedAt: loanInstalment.modifiedAt,
          clientLoanCycle,
          deposit,

          // loans
          accountClassification: loan.accountClassification,
          accountStatus: loan.accountStatus,
          daysInArrears: loan.daysInArrears,
          disbursementOn: loan.disbursementOn,
          effectiveInterestRate: loan.effectiveInterestRate,
          initialisedForClientUseOn: loan.initialisedForClientUseOn,
          interestAccrualStrategy: loan.interestAccrualStrategy,
          interestRate: loan.interestRate,
          isLocked: loan.isLocked,
          isRestructured: loan.isRestructured,
          lastActionOccurredOn: loan.lastActionOccurredOn,
          loanAmount: loan.loanAmount,
          loanProductExternalId: loan.loanProductExternalId,
          loanProductId: loan.loanProductId,
          loanPurpose: loan.loanPurpose,
          numberOfInstalments: loan.numberOfInstalments,
          organisationTreePath: loan.organisationTreePath,
          scheduleStartDate: loan.scheduleStartDate,
          secondInstalmentDate: loan.secondInstalmentDate,
          statusChangedOn: loan.statusChangedOn,
          tentativeDisbursementDate: loan.tentativeDisbursementDate,
          upToDateInstalments: loan.upToDateInstalments,
          userDefinedInterestRate: loan.userDefinedInterestRate,
          userDefinedAddOnRate: loan.userDefinedAddOnRate,
          gracePeriodNumberOfInstalmentIntervals:
            loan.gracePeriodNumberOfInstalmentIntervals,
          payInstalments: loan.payInstalments,
          typeOfBusiness: loan.typeOfBusiness,
          economicActivity: loan.economicActivity,
          debtCapacity: loan.debtCapacity,
          workingCapital: loan.workingCapital,
          otherFinancingLendingName: loan.otherFinancingLendingName,
          otherLoanMonthlyInstalment: loan.otherLoanMonthlyInstalment,
          otherLoanTermMonths: loan.otherLoanTermMonths,
          otherLoanRemainingTermMonths: loan.otherLoanRemainingTermMonths,
          applicationType: loan.applicationType,
          deviation: loan.deviation,
          multiplierForCalculation: loan.multiplierForCalculation,
          requiredDepositBalance: loan.requiredDepositBalance,
          automaticRepayment: loan.automaticRepayment,
          automaticRepaymentEndDate: loan.automaticRepaymentEndDate,
          olbP: loan.olbP,
          olbI: loan.olbI,
          deviationLevel: loan.deviationLevel,
          pendingOperationOn: loan.pendingOperationOn,
          outstandingTotal: loan.outstandingTotal,
        });
      });
    }
  }

  self.postMessage({
    chunkIndex,
    processed: dataSource,
  });
};
