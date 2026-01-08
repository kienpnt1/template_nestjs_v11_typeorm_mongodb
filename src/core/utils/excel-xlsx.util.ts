import * as XLSX from 'xlsx';

export class ExcelUtil {
  /**
   * Parse a buffer of an Excel file and return its content as JSON array
   * @param buffer - The buffer of the Excel file
   * @returns An array of JSON objects representing rows in the Excel sheet
   */
  static parseExcel(buffer: Buffer): any[] {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(worksheet);
  }

  /**
   * Convert JSON data to an Excel buffer
   * @param data - Array of JSON objects to convert to Excel
   * @returns A buffer representing the Excel file
   */
  static writeExcel(data: any[]): Buffer {
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet1');
    const excelBuffer: Buffer = XLSX.write(workBook, {
      bookType: 'xlsx',
      type: 'buffer',
    });
    return excelBuffer;
  }
}
