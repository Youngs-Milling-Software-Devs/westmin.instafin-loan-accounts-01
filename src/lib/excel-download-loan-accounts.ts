"use client";

import { IDataSource } from "@/app/_types";
import { IColumSchema } from "@/components/Table";
import { Workbook } from "exceljs";

export class ExcelDownloadLoansAccounts {
  workbook = new Workbook();
  constructor() {}

  private createWorksheet() {
    // create new sheet with pageSetup settings for A4 - landscape
    const worksheet = this.workbook.addWorksheet("Loan Accounts", {
      pageSetup: { paperSize: 9, orientation: "landscape" },
      views: [{ state: "frozen", xSplit: 1, ySplit: 1 }],
    });

    return worksheet;
  }
  async generate({
    columnSchema,
    dataSource,
  }: {
    dataSource: IDataSource[];
    columnSchema: IColumSchema<IDataSource>[];
  }) {
    const worksheet = this.createWorksheet();

    if (!columnSchema?.length || !dataSource?.length) return;

    worksheet.addTable({
      name: "MyTable",
      ref: "A1",
      headerRow: true,
      totalsRow: false, // safer
      columns: columnSchema.map((col) => ({
        name: col.title,
        filterButton: true,
      })),
      rows: dataSource.map((source) =>
        columnSchema.map((col) => source[col.key]),
      ),
    });

    await this.saveFile();
  }

  private async saveFile(fileName = "loan-accounts.xlsx") {
    // Generate Excel file as ArrayBuffer
    const buffer = await this.workbook.xlsx.writeBuffer();

    // Create a Blob
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create a download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;

    // Trigger download
    document.body.appendChild(a);
    a.click();

    // Cleanup
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
