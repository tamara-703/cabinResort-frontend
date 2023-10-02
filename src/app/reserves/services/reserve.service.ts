import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Reservations } from 'src/app/dataFormat';
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
                                  'Authorization': 'Basic ' + btoa(`${reservation.guest_id.username}:${sessionStorage.getItem('unencrypted pass')}`),
                                  'Access-Control-Allow-Origin': '*',
                                  'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE,PATCH,OPTIONS'
                                  })
    };

    reservation.check_in = reservation.check_in.substring(0,15)
    reservation.check_out = reservation.check_out.substring(0,15);

    return this.http.post<Reservations>(`${this.base_url}/user/reservations`,reservation, httpOptions);


  }
}
