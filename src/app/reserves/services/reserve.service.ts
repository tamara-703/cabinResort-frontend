import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Reservations } from 'src/app/users';
import { Environment } from 'src/app/environment';

@Injectable({
  providedIn: 'root'
})
export class ReserveService {

  base_url: string = Environment.EnvironmentURL;

  constructor(private http: HttpClient) { }


  createReservation(reservation: Reservations) : Observable<Reservations>
  {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                  'Authorization': 'Basic ' + btoa(`${reservation.guest_id.username}:${sessionStorage.getItem('unencrypted pass')}`)
                                  })
    };

    return this.http.post<Reservations>(`${this.base_url}/user/reservations`,reservation, httpOptions);


  }
}
