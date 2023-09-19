import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { GuestId } from 'src/app/users';
import { MessageService } from 'src/app/message.service';
import { Environment } from 'src/app/environment';

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

  /** GET warehouse from the server 
  getUser(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(this.warehouseUrl)
      .pipe(
        tap(_ => this.log('fetched Warehouses')),
        catchError(this.handleError<Warehouse[]>('getWarehouses', []))
      );
  }
  */


  /** GET User by id. Will 404 if id not found */
  getUser(id: number): Observable<GuestId> {
    const url = `${this.userUrl}/${id}`;
    return this.http.get<GuestId>(url).pipe(
      tap(_ => this.log(`fetched User id=${id}`)),
      catchError(this.handleError<GuestId>(`getuser id=${id}`))
    );
  }


  //////// Save methods //////////

  /** POST: add a new User to the server */
  addUser(user: GuestId): Observable<GuestId> {
    return this.http.post<GuestId>(this.userUrl, user, this.httpOptions).pipe(
      tap((newUser: GuestId) => this.log(`added User w/ id=${newUser.id}`)),
      catchError(this.handleError<GuestId>('addUser'))
    );
  }

  /** DELETE: delete the User from the server */
  deleteUser(id: number): Observable<GuestId> {
    const url = `${this.userUrl}/${id}`;

    return this.http.delete<GuestId>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<GuestId>('deleteUser'))
    );
  }

  /** PUT: update the user on the server */
  updateUser(user: GuestId, id:number): Observable<any> {
    const url = `${this.userUrl}/${id}`;
    return this.http.put(url, user, this.httpOptions).pipe(
      tap(_ => this.log(`updated user id=${user.id}`)),
      catchError(this.handleError<any>('updateUser'))
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
