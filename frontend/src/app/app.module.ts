import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTabsModule} from '@angular/material/tabs';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { NgImageSliderModule } from 'ng-image-slider';
import {MatButtonModule} from '@angular/material/button';
import { AgmCoreModule } from '@agm/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from "@angular/material/dialog";
import { ReservPopUpComponent } from './reserv-pop-up/reserv-pop-up.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ReservationsComponent } from './reservations/reservations.component';



@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    HomeComponent,
    ReservPopUpComponent,
    ReservationsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTabsModule,
    MatGridListModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDividerModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    NgImageSliderModule,
    AgmCoreModule.forRoot({
      // mine unrestricted
      apiKey: 'AIzaSyDfPMWICLgoY8QF4DOHszDmy9Dfa-FpFv8',
      // sama's
      // apiKey: 'AIzaSyANzGsJHvG825T-KZotiMnXMmzgPhxD8zw',
      libraries: ['places']
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ReservPopUpComponent]
})
export class AppModule { }
