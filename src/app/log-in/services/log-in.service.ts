import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { GuestId } from 'src/app/dataFormat';
import { MessageService } from 'src/app/message.service';
import { Environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LogInService {
//variables for login
  private userUrl = Environment.EnvironmentURL;
  public visible: boolean = false;


constructor(
  private http: HttpClient,
  private messageService: MessageService) {}

  /*returns: Observable any but is a GuestId  (user)
   purpose: this function logs in user and returns their info  */
  getUserInfo(username:string, password:string): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                  'Authorization': 'Basic ' + btoa(`${username}:${password}`)
                                  })
    };

    // Send request to the API to get the user info
    return this.http.get<any>(`${this.userUrl}/user/profile`, httpOptions)
      .pipe(
        // Handle errors
        catchError(this.handleError<any>(`userinfo not found`))
      );
  }

   /*returns: Observable any but is a GuestId  (user)
   purpose: this function gets user by id and returns their info  */
   getUserById(userId: any) : Observable<GuestId>
  {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${sessionStorage.getItem('username')}:${sessionStorage.getItem('unencryptedPass')}`)})
    }
        return this.http.get<GuestId>(`${this.userUrl}/user/profile/${userId}`, httpOptions)
  }



    /** GET User by id. Will 404 if id not found */
    getUser(): Observable<GuestId> {
      const url = `${this.userUrl}/user/profile`;
      return this.http.get<GuestId>(url).pipe(
        tap(_ => this.log(`fetched User`)),
        catchError(this.handleError<GuestId>(`unable to get users`))
      );
    }
     /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a UserService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }

}
