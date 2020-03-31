import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

  isPB:boolean = false;
  isSB:boolean = false;

  priorities = [
    {value: 'High', viewValue: 'High'},
    {value: 'Medium', viewValue: 'Medium'},
    {value: 'Low', viewValue: 'Low'}
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { 
    this.isPB = data.backlog === 'pb' ? true : false;
    this.isSB = data.backlog === 'sb' ? true : false;
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  
}
