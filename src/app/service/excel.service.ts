import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  public exportExcel(json: any[], fileName: string) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const buffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.guardarExcel(buffer, fileName);
  }

  private guardarExcel(buff: any, fileName: string) {
    const data: Blob = new Blob([buff], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
