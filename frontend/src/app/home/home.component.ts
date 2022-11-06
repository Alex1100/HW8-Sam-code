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
    });

    this.onChanges();
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

    this.service.getBusinesses(data).subscribe((response: any) => {
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
    });
  }

  clear() {
    this.businesses = [];
    this.noResult = false;
    this.searchForm.reset();
    this.searchForm.controls['location'].enable();
  }
}
