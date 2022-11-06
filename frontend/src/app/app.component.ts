import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  bookings: any = [];
 
  constructor(private router: Router) { }

  ngOnInit(): void {
    localStorage.setItem("bookings", JSON.stringify(this.bookings));
  }

  showBookings(){
    this.router.navigate(['bookings'])
  }
  
  showSearch(){
    this.router.navigate([''])
  }
}
