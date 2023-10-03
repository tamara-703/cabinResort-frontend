import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { GuestId, newUser } from 'src/app/dataFormat';
import { MessageService } from 'src/app/message.service';
import { Environment } from 'src/environments/environment.production';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private userUrl = Environment.EnvironmentURL; //Gets URL based on environment

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'allow': 'PUT' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {}


  /** GET User by id. Will 404 if id not found */
  getUser(id: number): Observable<GuestId> {
    const url = `${this.userUrl}/${id}`;
    return this.http.get<GuestId>(url).pipe(
      tap(_ => this.log(`fetched User id=${id}`)),
      catchError(this.handleError<GuestId>(`getuser id=${id}`))
    );
  }

    /** GET User by id. Will 404 if id not found */
    getUsername(username: string): Observable<GuestId> {
      const url = `${this.userUrl}/homepage/newuser/${username}`;
      return this.http.get<GuestId>(url).pipe(
        tap(_ => this.log(`fetched User username=${username}`)),
        catchError(this.handleError<GuestId>(`getuser username=${username}`))
      );
    }


  //////// Save methods //////////

  /** POST: add a new User to the server */
  addUser(user: newUser): Observable<newUser> {
    console.log(user);
    const url = `${this.userUrl}/homepage/signup`;
    return this.http.post<newUser>(url, user).pipe(
      tap((newUser: newUser) => this.log(`added User`)),
      catchError(this.handleError<newUser>('addUser'))
    );
  }

  /** DELETE: delete the User from the server */
  deleteUser(id: string): Observable<GuestId> {
    const url = `${this.userUrl}/${id}`;

    return this.http.delete<GuestId>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<GuestId>('deleteUser'))
    );
  }

  /** PUT: update the user on the server */
  updateUser(user: GuestId, id:number): Observable<GuestId> {
    console.log("user in update ", user)
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${sessionStorage.getItem('username')}:${sessionStorage.getItem('unencryptedPass')}`)})
    }
    const url = `${this.userUrl}/user/profile/${id}`;
    return this.http.put<GuestId>(url, user,httpOptions).pipe(
      tap(_ => this.log(`updated user id=${id}`)),
      catchError(this.handleError<GuestId>('updateUser'))
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
