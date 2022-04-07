import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


@Injectable({
  providedIn: 'root'
})


export class ExcelService {

  public converJson : string ;

  constructor() {

      this.converJson = '';
  }


  public exportAsExcelFile(json: any[], excelFileName: string)
  {
     const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
     const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
     const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });  this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string){
   const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
   FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
  }

  public exportHTMLAsExcelFile(html : any , excelFileName: string ){
    console.log(html);
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(html);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }





}
