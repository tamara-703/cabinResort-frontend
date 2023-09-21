import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Cabin } from 'src/app/users';
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

      console.log("incoming state " , stateId);
      return this.http.get<Cabin[]>(`${this.base_url}/homepage/${stateId}`);

  }
}
