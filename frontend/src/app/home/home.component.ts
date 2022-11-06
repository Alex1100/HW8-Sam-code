import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchForm: any;
  filteredOptions: any;
  businesses: any[] = [];
  noResult: boolean = false;

  constructor(private service: ApiService, private formBuilder: FormBuilder, private router: Router) { }



  ngOnInit() {

    this.searchForm = this.formBuilder.group({
      keyword: ['', Validators.required],
      distance: [ , Validators.required],
      category: [ , Validators.required],
      location: ['', Validators.required],
      autoLocation: [ , Validators.required]
    });

    this.onChanges();
    this.checkboxOnChange();
  }

  checkboxOnChange() {
    this.searchForm.get('autoLocation').valueChanges.subscribe((value: any) => {
      console.log("autoLocation: ", value);
      this.searchForm.controls['location'].reset();
      this.searchForm.controls['location'].disable();
    })
  }

  onChanges(): void {
    this.searchForm.get('keyword').valueChanges.subscribe((val: any) => {
      console.log(val);
      this.service.getAutocomplete(val).subscribe((response: any) => {
        console.log("auto complete response: ", response);
        if (response && response.length) {
          let elements = []
          for (let elem of response) {
            elements.push(elem.text);
          }
          this.filteredOptions = elements;
        } else {
          this.filteredOptions = ['No results'];
        }

      }, error => {
        console.log("error in autocomplete: ", error);

      })
    });
  }

  onSubmit(): void {
    console.warn('Your order has been submitted', this.searchForm.value);
    
    var data = this.searchForm.value;

    if (!data.autoLocation) {
      this.service.getBusinesses(data).subscribe((response: any) => {
        // console.log("Response from API getBusinesses: ", response);

        if (response.businesses.length>0) {
          this.businesses = response.businesses;
          this.businesses.forEach(element => {
            element.distance = Math.round(element.distance * 0.000621371192);
          });
        } else {
          this.noResult = true;
        }

        console.log("businesses: ", this.businesses);

      }, (error: any) => {
        console.log('Error is: ', error);

      })
    } else {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;

          console.log("latitude: ", latitude);
          console.log("longitude: ", longitude);

          var obj = {
            category: data.category, distance: data.distance, keyword: data.keyword, latitude: latitude, longitude: longitude
          }

          this.service.getBusinessesByCurrenLocation(obj).subscribe((response: any) => {
            console.log("BusinessesByCurrenLocation: ", response);
            if (response.businesses.length>0) {
              this.businesses = response.businesses;
              this.businesses.forEach(element => {
                element.distance = Math.round(element.distance * 0.000621371192);
              });
            } else {
              this.noResult = true;
            }
    
            console.log("businesses: ", this.businesses);
    
          }, (error: any) => {
            console.log('Error is: ', error);
            
          })
          
        });
      }
    }

  }

  clear() {
    this.businesses = [];
    this.noResult = false;
    this.searchForm.reset();
    this.searchForm.controls['location'].enable();
  }



}
