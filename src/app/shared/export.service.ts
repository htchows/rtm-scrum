import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }
  downloadFile(data, type, filename='data') {
    var csvData;
    if(type==='pb'){
      csvData = this.ConvertToCSV(data, ['prj_id', 'pb_id', 'desc', 'priority','status']);
    }else if(type==='sb'){
      csvData = this.ConvertToCSV(data, ['prj_id', 'pb_id', 'sb_id','sb_item_id','desc','priority','status']);
    }else{
      // csvData = this.ConvertToCSV(data, ['id','project_id', 'keyword', 'backlog', 'priority','status']);
      csvData = this.ConvertToCSV(data, ['project_id', 'pb_id', 'pb_desc', 'pb_priority','pb_status',
      'sb_id','sb_item_id','sb_desc','sb_desc','sb_priority','sb_status']);
    }
    // console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
        dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  ConvertToCSV(objArray, headerList) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No,';
    for (let index in headerList) {
            row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
        let line = (i+1)+'';
        for (let index in headerList) {
            let head = headerList[index];
            line += ',' + array[i][head];
        }
        str += line + '\r\n';
    }
    return str;
  }
}
