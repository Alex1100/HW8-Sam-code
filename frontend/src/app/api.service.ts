import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAutocomplete(keyword: string){
    const url = '/api/autocomplete';

    let queryParams = new HttpParams().append("keyword", keyword);

    return this.http.get(url,{params: queryParams});
  }

  getBusinesses(formData: any){
    const url = '/api/getBusinesses'
    let queryParams = {
      "keyword": formData.keyword,
      "distance": (formData.distance)*1609.344,
      "category": formData.category,
      "location": formData.location
    };

    return this.http.get(url, {params: queryParams});
  }

  getBusinessesByCurrenLocation(formData: any){
    const url = '/api/getBusinessesByCoords'
    let queryParams = {
      "keyword": formData.keyword,
      "distance": (formData.distance)*1609.344,
      "category": formData.category,
      "latitude": formData.latitude,
      "longitude": formData.longitude
    };

    return this.http.get(url, {params: queryParams});
  }

  
  getBusiness(id: any){
    const url = '/api/business'
    let queryParams = {
      "id": id,
    };

    return this.http.get(url, {params: queryParams});
  }

  getReviews(id: any){
    const url = '/api/reviews'
    let queryParams = {
      "id": id,
    };

    return this.http.get(url, {params: queryParams});
  }
}
