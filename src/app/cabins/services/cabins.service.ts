import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Cabin } from 'src/app/dataFormat';
import { Environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CabinsService {

  base_url: string = Environment.EnvironmentURL;

  constructor(private http: HttpClient) { }

  /*returns: Observable of Cabin Array
   purpose: this function returns the Observable object of a an array of type Cabin    */
  getAllCabins() : Observable<Cabin[]>
  {
    return this.http.get<Cabin[]>(`${this.base_url}/homepage`);
  }

    /*returns: Observable of Cabin Array
   purpose: this function returns the Observable object of a an array of type Cabin by state id  */
  getCabinByStateId(stateId: string) : Observable<Cabin[]>
  {
      return this.http.get<Cabin[]>(`${this.base_url}/homepage/${stateId}`);

  }

  /*returns: Observable of Cabin
   purpose: this function returns the Observable object of type Cabin by id  */
  getCabinById(cabinId: string) : Observable<Cabin>
  {
    return this.http.get<Cabin>(`${this.base_url}/homepage/reserve/${cabinId}`);
  }
}
