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


  /*returns: Observable array of reservations
   purpose: gets all reservations for user */
  getAllReservationsByUserName(username: string) : Observable<Reservations[]>
  {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                  'Authorization': 'Basic ' + btoa(`${sessionStorage.getItem('username')}:${sessionStorage.getItem('unencryptedPass')}`)
                                  })
    };
    return this.http.get<Reservations[]>(`${this.base_url}/user/reservations/${username}`,httpOptions);
  }

  /*returns: Observable cabin
   purpose: this function gets cabin by id  */
  getCabinById(cabinId: number) : Observable<Cabin>
  {
      return this.http.get<Cabin>(`${this.base_url}/homepage/reserve/${cabinId}`)
  }

    /*returns: Observable reservation
   purpose: gets reservation by id  */
  getRsvpById(rsvpId: number) : Observable<Reservations>
  {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                  'Authorization': 'Basic ' + btoa(`${sessionStorage.getItem('username')}:${sessionStorage.getItem('unencryptedPass')}`)
                                  })
    };

    return this.http.get<Reservations>(`${this.base_url}/user/reservations/reservation/${rsvpId}`,httpOptions);
  }

   /*returns: Observable reservation
   purpose: updates reservation by id  */
  updateRsvp(rsvpId: number, rsvpBody: Reservations): Observable<Reservations>
  {

    rsvpBody.check_in = rsvpBody.check_in.substring(0,15)
    rsvpBody.check_out = rsvpBody.check_out.substring(0,15);

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                  'Authorization': 'Basic ' + btoa(`${sessionStorage.getItem('username')}:${sessionStorage.getItem('unencryptedPass')}`)
                                  })
    };

    return this.http.put<Reservations>(`${this.base_url}/user/reservations/${rsvpId}`, rsvpBody, httpOptions)
  }

   /*returns: void
   purpose: deletes reservation by id  */
  deleteRsvp(rsvpId: number)
  {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                  'Authorization': 'Basic ' + btoa(`${sessionStorage.getItem('username')}:${sessionStorage.getItem('unencryptedPass')}`)
                                  })
    };

    let result = false;

    this.http.delete(`${this.base_url}/user/reservations/${rsvpId}`,httpOptions).subscribe()
  }


}
