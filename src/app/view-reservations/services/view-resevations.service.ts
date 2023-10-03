import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cabin, Reservations } from 'src/app/dataFormat';
import { Environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewResevationsService {

  base_url = Environment.EnvironmentURL;

  constructor(private http: HttpClient) { }


  getAllReservationsByUserName(username: string) : Observable<Reservations[]>
  {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                  'Authorization': 'Basic ' + btoa(`${sessionStorage.getItem('username')}:${sessionStorage.getItem('unencryptedPass')}`)
                                  })
    };
    return this.http.get<Reservations[]>(`${this.base_url}/user/reservations/${username}`,httpOptions);
  }

  getCabinById(cabinId: number) : Observable<Cabin>
  {
      return this.http.get<Cabin>(`${this.base_url}/homepage/reserve/${cabinId}`)
  }


}
