import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  bookings: any = [];
  noResult:any = false;

  constructor() { }

  ngOnInit(): void {
    this.bookings = JSON.parse(localStorage.getItem("bookings") || '{}');

    if(this.bookings.length > 0) {
      this.noResult = false
    } else{
      this.noResult = true;
    }
    
  }

  delete(elem: any){
    console.log(elem);
    this.bookings.pop(elem);
    localStorage.removeItem("bookings");
    localStorage.setItem("bookings", JSON.stringify(this.bookings));
    alert("Reservation cancelled")
  }

}
