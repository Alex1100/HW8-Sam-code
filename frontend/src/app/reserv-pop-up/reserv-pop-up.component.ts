import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reserv-pop-up',
  templateUrl: './reserv-pop-up.component.html',
  styleUrls: ['./reserv-pop-up.component.css']
})
export class ReservPopUpComponent implements OnInit {

  form: any;
  description: any;
  name: any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ReservPopUpComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
      this.name = data.name;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['email', []],
      date: ['date', []],
      time: ['time', []]
    });
  }

  save() {
    console.log(this.form.value);
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
