import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Reservations } from 'src/app/dataFormat';
import { Environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReserveService {

  base_url: string = Environment.EnvironmentURL;

  constructor(private http: HttpClient) { }


  /*returns: boolean for reservation result
   purpose: attempts to reserve a cabin and returns result  */
  createReservation(reservation: Reservations) : boolean
  {
    console.log("reservation " , reservation)
    let result = false;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                  'Authorization': 'Basic ' + btoa(`${reservation.guest_id.username}:${sessionStorage.getItem('unencryptedPass')}`)
                                  })
    };

    reservation.check_in = reservation.check_in.substring(0,15)
    reservation.check_out = reservation.check_out.substring(0,15);

    this.http.post<Reservations>(`${this.base_url}/user/reservations`,reservation, httpOptions).subscribe(response => {
      console.log("reserve created");
      result = true;
      console.log("result " , result)
    })

    return result;

  }
}
