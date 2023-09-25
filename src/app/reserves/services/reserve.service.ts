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

  httpOptions = {

    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'allow': 'PUT' })

  };


  createReservation(reservation: Reservations) : Observable<Reservations>
  {
    return this.http.post<Reservations>(`${this.base_url}/user/reservations`,reservation, this.httpOptions).pipe(
      tap((newReservation: Reservations) => `added Warehouse w/ id=${newReservation.id}`)
    )


  }
}
