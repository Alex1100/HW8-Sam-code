import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ReservPopUpComponent } from '../reserv-pop-up/reserv-pop-up.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  business: any = {
    name: '',
    location: {
      display_address: []
    },
    categories: []
  };

  imageObject: Array<object> = [
  ];

  id: any;
  reviews: any = []
  bookings: any = []

  latitude: any;
  longitude: any;
  zoom: any;
  isClosed: any = false;

  constructor(private router: Router, private route: ActivatedRoute, private service: ApiService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.id = params.params.id;
      console.log("id: ", this.id);

      this.getBusinessData();

      this.getBusinessReviews();

    })
    
  }


  getBusinessData() {
    this.service.getBusiness(this.id).subscribe((response: any) => {
      console.log("business: ", response);
      this.business = response;

      let images = this.business.photos;
      for (let image of images) {
        let obj = {
          image: image,
          thumbImage: image
        }

        this.imageObject.push(obj);
      }

      this.latitude = response.coordinates.latitude;
      this.longitude = response.coordinates.longitude;

      this.setPlaceLocation();

    })

    if(this.business.is_closed){
      this.isClosed = true;
    }
  }

  getBusinessReviews() {
    this.service.getReviews(this.id).subscribe((response: any) => {
      this.reviews = response.reviews;
      console.log("Reviews: ", this.reviews);

    }, error => {
      console.log(error);

    })
  }

  // Get Current Location Coordinates
  private setPlaceLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        // this.latitude = position.coords.latitude;
        // this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }


  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      name: this.business.name
    };

    dialogConfig.width = '500px'

    const dialogRef = this.dialog.open(ReservPopUpComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      this.bookings = JSON.parse(localStorage.getItem("bookings")|| '{}');
      
      console.log("booking before pussh: ", this.bookings);
      
      var theDate = new Date(Date.parse(data.date));
      const localDate = theDate.toLocaleString().split(" ");
  
      console.log(localDate);
      

      let newObj = {
        name: this.business.name,
        date: localDate[0],
        time: data.time,
        email: data.email
      }

      this.bookings.push(newObj);

      console.log("booking after pussh: ", this.bookings);
      
      localStorage.setItem("bookings", JSON.stringify(this.bookings));

      alert("Reservation created!")

    })
  }

  backHome() {
    this.router.navigate([".."]);
  }
}
