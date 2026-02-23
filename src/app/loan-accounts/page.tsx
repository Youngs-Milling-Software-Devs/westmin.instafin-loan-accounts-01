"use client";
import Button from "@/components/Button";
import Table, { IColumSchema } from "@/components/Table";

import { useEffect, useMemo, useRef, useState } from "react";
import DatePicker from "@/components/DatePicker";
import { ExcelDownloadLoansAccounts } from "@/lib/excel-download-loan-accounts";
import { IDataItems, IDataSource } from "../../_types";
import { format } from "date-fns";
import { loanAccountsEffects } from "@/store/features/loan-accounts/loan-accounts.effects";
import { AppDispatch, store } from "@/store";
import { useDispatch } from "react-redux";
import { loanAccountSelector } from "@/store/features/loan-accounts/loan-accounts.selector";

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
    format: (value) =>
      value ? format(new Date(value.toString()), "yyyy-MM-dd") : "",
  },
  {
    key: "initialPrincipalDue",
    title: "Initial Principal Due",
    format: (value) => parseFloat(value?.toString() || "0"),
  },
  { key: "initialLoanAccountBalance", title: "Initial Loan Account Balance" },
  { key: "currentPenaltyAmount", title: "Current Penalty Amount" },
  { key: "currentFeeAmount", title: "Current Fee Amount" },
  {
    key: "currentPrincipalDue",
    title: "Current Principal Due",
    format: (value) => parseFloat(value?.toString() || "0"),
  },
  {
    key: "ownInstalmentInterest",
    title: "Own Instalment Interest",
  },
  {
    key: "currentInterestDue",
    title: "Current Interest Due",
  },
  {
    key: "repaidDate",
    title: "Repaid Date",
    format: (value) =>
      value ? format(new Date(value.toString()), "yyyy-MM-dd") : "",
  },
  { key: "isPrepayment", title: "isPrepayment" },
  {
    key: "scheduledInterest",
    title: "Scheduled Interest",
  },

  { key: "paidFee", title: "Paid Fee" },
  { key: "paidPenalty", title: "Paid Penalty" },
  { key: "paidInterest", title: "Paid Interest" },
  { key: "instalmentGroupIndex", title: "Instalment Group Index" },
  {
    key: "gracePeriodType",
    title: "Grace Period Type",
    format: (value) => (value ? value.toString() : ""),
  },
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
      value ? format(new Date(value.toString()), "yyyy-MM-dd") : "",
  },
  {
    key: "effectiveInterestRate",
    title: "Effective Interest Rate",
  },

  {
    key: "interestAccrualStrategy",
    title: "Interest Accrual Strategy",
    format: (value) => (value ? value.toString() : ""),
  },
  {
    key: "interestRate",
    title: "Interest Rate",
    format: (value) => {
      if (!value) return "";
      const num = parseFloat(value.toString());
      return isNaN(num) ? 0 : num;
    },
  },
  {
    key: "isLocked",
    title: "Is Locked",
    format: (value) => (value ? value.toString() : ""),
  },

  {
    key: "loanAmount",
    title: "Loan Amount",
    format: (value) => (value ? parseFloat(value.toString()) : 0),
  },
  {
    key: "loanProductExternalId",
    title: "Loan Product External ID",
  },
  {
    key: "loanProductId",
    title: "Loan Product ID",
  },
  {
    key: "loanPurpose",
    title: "Loan Purpose",
    format: (value) => (value ? value.toString() : ""),
  },
  {
    key: "numberOfInstalments",
    title: "Number Of Instalments",
  },
  {
    key: "upToDateInstalments",
    title: "Up To Date Instalments",
  },
  {
    key: "userDefinedInterestRate",
    title: "User Defined Interest Rate",
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
      value ? format(new Date(value.toString()), "yyyy-MM-dd") : "",
  },
  {
    key: "olbP",
    title: "olbP",
  },
  {
    key: "olbI",
    title: "olbI",
  },
  {
    key: "deviationLevel",
    title: "Deviation Level",
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
  },
];

export default function LoanAccountScreen() {
  const [startDate, setStartDate] = useState("2000-01-01"); // state for start date
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd")); // state for end date

  const [isLoading, setLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const workerRef = useRef<Worker | null>(null);
  const accumulatedDataRef = useRef<IDataSource[]>([]);
  const totalChunksRef = useRef(0);
  const completedChunksRef = useRef(0);
  const [fullData, setFullData] = useState<IDataSource[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50); // 50 rows per page

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return fullData.slice(start, end);
  }, [fullData, currentPage, pageSize]);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("./../../lib/loan-worker.ts", import.meta.url),
    );

    workerRef.current.onmessage = (event) => {
      const { processed } = event.data;

      // accumulate results
      accumulatedDataRef.current = [
        ...accumulatedDataRef.current,
        ...processed,
      ];

      completedChunksRef.current += 1;

      // when all chunks are done
      if (completedChunksRef.current === totalChunksRef.current) {
        setFullData(accumulatedDataRef.current);
        setLoading(false);

        // reset counters
        accumulatedDataRef.current = [];
        completedChunksRef.current = 0;
        totalChunksRef.current = 0;
      }
    };

    workerRef.current.onerror = (error) => {
      console.error("Worker error:", error);
      setLoading(false);
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const handleFilterByDateRange = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    try {
      setFullData([]);
      setLoading(true);

      await dispatch(
        loanAccountsEffects({
          startDate,
          endDate,
        }),
      );

      const { loanAccounts } = loanAccountSelector(store.getState());

      if (!loanAccounts) {
        const [error] = loanAccounts as unknown as [{ message: string }];
        alert(`Error Response: ${error.message}`);
        return;
      }

      const { items } = loanAccounts as unknown as { items: IDataItems[] };

      const CHUNK_SIZE = 5000;

      // reset before sending
      accumulatedDataRef.current = [];
      completedChunksRef.current = 0;

      totalChunksRef.current = Math.ceil(items.length / CHUNK_SIZE);

      for (let i = 0; i < items.length; i += CHUNK_SIZE) {
        const chunkIndex = i / CHUNK_SIZE;

        workerRef.current?.postMessage({
          items: items.slice(i, i + CHUNK_SIZE),
          chunkIndex,
        });
      }
    } catch (err) {
      console.log("Filter date range", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleExportToExcel = async () => {
    try {
      setIsExporting(true);
      await new ExcelDownloadLoansAccounts().generate({
        dataSource: fullData,
        columnSchema,
      });
    } catch (err) {
      console.log("Exporting is error", err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="m-10 overflow-hidden">
      <div className="flex justify-between">
        {/* <div className="flex justify-center items-center gap-4">
          <h1 className=" text-amber-500 font-semibold text-4xl uppercase tracking-wider">
            WestMin Lending Corporation
          </h1>
        </div> */}
        {/* Title Section */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 tracking-tight">
            WestMin Lending Corporation
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Filter records by date range
          </p>
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
            <Button mode="primary" isSubmitting={isLoading}>
              Apply Filter
            </Button>
          </div>
        </form>
      </div>

      <Table
        upperHeader={{
          title: "Loan Accounts",
          buttonProps: {
            isSubmitting: isExporting,
            onClick: handleExportToExcel,
            children: "Export",
            mode: "success",
          },
        }}
        dataSource={paginatedData}
        columnSchema={columnSchema}
        isFetchingDataSource={isLoading}
        paginationProps={{
          currentPage,
          pageSize,
          totalItems: fullData.length,
          onPageChange: setCurrentPage,
          onPageSizeChange: setPageSize,
        }}
      />
    </div>
  );
}
