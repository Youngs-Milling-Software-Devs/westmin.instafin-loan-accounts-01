"use client";
import Button from "@/components/Button";
import Table, { IColumSchema } from "@/components/Table";
import Image from "next/image";
import { useState, useTransition } from "react";
import DatePicker from "@/components/DatePicker";
import { ExcelDownloadLoansAccounts } from "@/lib/excel-download-loan-accounts";
import { IDataItems, IDataSource } from "../_types";

const columnSchema: IColumSchema<IDataSource>[] = [
  { key: "counter", title: "Series No." },
  { key: "accountId", title: "Account ID" },
  { key: "accountExternalId", title: "External ID" },
  { key: "clientName", title: "Client Name" },
  { key: "productName", title: "Product Name" },
  { key: "branchName", title: "Branch Name" },
  { key: "clientID", title: "Client ID" },

  { key: "clientStatus", title: "Client Status" },
  { key: "clientType", title: "Client Type" },
  { key: "accountStatusName", title: "Account Status Name" },
  {
    key: "obligatoryPaymentDate",
    title: "Obligatory Payment Date",
    format: (value) => new Date(value?.toString() ?? "").toLocaleDateString(),
  },
  {
    key: "initialPrincipalDue",
    title: "Initial Principal Due",
    format: (value) => new Date(value?.toString() ?? "").toLocaleDateString(),
  },
  { key: "initialLoanAccountBalance", title: "Initial Loan Account Balance" },
  { key: "currentPenaltyAmount", title: "Current Penalty Amount" },
  { key: "currentFeeAmount", title: "Current Fee Amount" },
  { key: "currentPrincipalDue", title: "Current Principal Due" },
  {
    key: "ownInstalmentInterest",
    title: "Own Instalment Interest",
    format: (value) => parseFloat(value?.toString() || "0").toFixed(5),
  },
  { key: "currentInterestDue", title: "Current Interest Due" },
  {
    key: "repaidDate",
    title: "Repaid Date",
    format: (value) =>
      value ? new Date(value?.toString()).toLocaleDateString() : "",
  },
  { key: "isPrepayment", title: "isPrepayment" },
  {
    key: "scheduledInterest",
    title: "Scheduled Interest",
    format: (value) => parseFloat(value?.toString() || "0").toFixed(5),
  },

  { key: "paidFee", title: "Paid Fee" },
  { key: "paidPenalty", title: "Paid Penalty" },
  { key: "paidInterest", title: "Paid Interest" },
  { key: "instalmentGroupIndex", title: "Instalment Group Index" },
  { key: "gracePeriodType", title: "Grace Period Type" },
  { key: "appliedSections", title: "Applied Sections" },

  { key: "clientLoanCycle", title: "Client Loan Cycle" },

  {
    key: "accountClassification",
    title: "Account Classification",
    format: (value) => (value ? value.toString() : ""),
  },
  {
    key: "accountStatus",
    title: "Account Status",
    format: (value) => (value ? value.toString() : ""),
  },
  {
    key: "daysInArrears",
    title: "Days InArrears",
    format: (value) => (value ? value.toString() : ""),
  },
  {
    key: "disbursementOn",
    title: "Disbursement On",
    format: (value) =>
      value ? new Date(value?.toString()).toLocaleDateString() : "",
  },
  {
    key: "effectiveInterestRate",
    title: "Effective Interest Rate",
    format: (value) => (value ? value.toString() : ""),
  },

  {
    key: "interestAccrualStrategy",
    title: "Interest Accrual Strategy",
    format: (value) => (value ? value.toString() : ""),
  },
  {
    key: "interestRate",
    title: "Interest Rate",
    format: (value) => (value ? value.toString() : ""),
  },
  {
    key: "isLocked",
    title: "Is Locked",
    format: (value) => (value ? value.toString() : ""),
  },

  {
    key: "loanAmount",
    title: "Loan Amount",
    format: (value) => (value ? value.toString() : ""),
  },
  {
    key: "loanProductExternalId",
    title: "Loan Product External ID",
    format: (value) => (value ? value.toString() : ""),
  },
  {
    key: "loanProductId",
    title: "Loan Product ID",
    format: (value) => (value ? value.toString() : ""),
  },
  {
    key: "loanPurpose",
    title: "Loan Purpose",
    format: (value) => (value ? value.toString() : ""),
  },
  {
    key: "numberOfInstalments",
    title: "Number Of Instalments",
    format: (value) => (value ? value.toString() : ""),
  },
  {
    key: "upToDateInstalments",
    title: "Up To Date Instalments",
    format: (value) => (value ? value.toString() : ""),
  },
  {
    key: "userDefinedInterestRate",
    title: "User Defined Interest Rate",
    format: (value) => (value ? value.toString() : ""),
  },
  {
    key: "userDefinedAddOnRate",
    title: "User Defined Add On Rate",
    format: (value) => (value ? value.toString() : ""),
  },
  {
    key: "gracePeriodNumberOfInstalmentIntervals",
    title: "Grace Period Number of Instalment Intervals",
    format: (value) => (value ? value.toString() : ""),
  },

  {
    key: "automaticRepayment",
    title: "Automatic Repayment",
    format: (value) => (value ? value.toString() : ""),
  },
  {
    key: "automaticRepaymentEndDate",
    title: "Automatic Repayment End date",
    format: (value) =>
      value ? new Date(value?.toString()).toLocaleDateString() : "",
  },
  {
    key: "olbP",
    title: "olbP",
    format: (value) => (value ? value.toString() : ""),
  },
  {
    key: "olbI",
    title: "olbI",
    format: (value) => (value ? value.toString() : ""),
  },
  {
    key: "deviationLevel",
    title: "Deviation Level",
    format: (value) => (value ? value.toString() : ""),
  },
  {
    key: "pendingOperationOn",
    title: "Pending Operation On",
    format: (value) =>
      value ? new Date(value?.toString()).toLocaleDateString() : "",
  },
  {
    key: "outstandingTotal",
    title: "Outstanding Total",
    format: (value) => (value ? value.toString() : ""),
  },
];

export default function LoanAccountScreen() {
  const [startDate, setStartDate] = useState(""); // state for start date
  const [endDate, setEndDate] = useState(""); // state for end date

  const [dataSource, setDataSource] = useState<IDataSource[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleFilterByDateRange = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/submit-instafin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate,
          endDate,
        }),
      });

      const data = (await res.json()) as {
        items: IDataItems[];
        message: string;
      };

      if (!data?.items?.length) {
        const [error] = data as unknown as [{ message: string }];
        alert(`Error Response: ${error.message}`);
        return;
      }

      const { items } = data;

      const dataSource: IDataSource[] = [];
      for (const element of items) {
        const {
          account,
          client,
          loanInstalments,
          clientLoanCycle,
          deposit,
          loan,
        } = element;

        if (loanInstalments?.length) {
          loanInstalments.forEach((loanInstalment, index) => {
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
              lastPenaltyCalculationDate:
                loanInstalment.lastPenaltyCalculationDate,
              initialPrincipalDue: loanInstalment.initialPrincipalDue,
              initialLoanAccountBalance:
                loanInstalment.initialLoanAccountBalance,
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

      startTransition(() => {
        setDataSource(dataSource);
      });
    } catch (err) {
      console.log("Filter date range", err);
      throw err;
    }
  };

  const handleExportToExcel = async () => {
    await new ExcelDownloadLoansAccounts().generate({
      dataSource,
      columnSchema,
    });
  };

  return (
    <div className="m-10 overflow-hidden">
      <div className="flex justify-between">
        <div className="flex justify-center items-center gap-4">
          <Image
            className="dark:invert"
            src="/globe.svg"
            alt="Next.js logo"
            width={40}
            height={20}
            priority
          />
          <h1 className=" text-amber-500 font-semibold text-lg uppercase tracking-wider">
            Molave Youngs Milling Corporation
          </h1>
        </div>

        <form onSubmit={handleFilterByDateRange} className="flex space-x-4">
          <DatePicker
            label="Start date"
            id="startDate"
            name="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)} // <-- correct
          />
          <DatePicker
            label="End date"
            id="endDate"
            name="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)} // <-- correct
          />

          <div className="flex justify-center items-center w-full">
            <Button mode="primary" isSubmitting={isPending}>
              Filter by Date Range
            </Button>
          </div>
        </form>
      </div>

      <Table
        upperHeader={{
          title: "WestMin Loan Accounts",
          buttonLabel: "Export",
          onClick: handleExportToExcel,
        }}
        dataSource={dataSource}
        columnSchema={columnSchema}
        isFetchingDataSource={isPending}
      />
    </div>
  );
}
