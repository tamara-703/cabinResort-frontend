import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Cabin } from 'src/app/dataFormat';
import { Environment } from 'src/app/environment';

@Injectable({
  providedIn: 'root'
})
export class CabinsService {

  base_url: string = Environment.EnvironmentURL;

  constructor(private http: HttpClient) { }

  //get all cabins
  getAllCabins() : Observable<Cabin[]>
  {
    return this.http.get<Cabin[]>(`${this.base_url}/homepage`);
  }

  //get cabin by its state id
  getCabinByStateId(stateId: string) : Observable<Cabin[]>
  {
    //'Authorization': 'Basic ' + btoa(`${sessionStorage.getItem('username')}:${sessionStorage.getItem('unencrypted pass')}`),
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

      console.log("incoming state " , stateId);
      return this.http.get<Cabin[]>(`${this.base_url}/homepage/${stateId}`);

  }

  //get cabin by id
  getCabinById(cabinId: number) : Observable<Cabin>
  {
    return this.http.get<Cabin>(`${this.base_url}/homepage/reserve/${cabinId}`);
  }
}
