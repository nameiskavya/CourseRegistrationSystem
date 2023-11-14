import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Registration } from '../models/registration.model';
import { MessageService } from './message.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl = 'https://localhost:7247/registrations'; // replace with your actual API endpoint

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getRegistrations(): Observable<Registration[]> {
    return this.http.get<Registration[]>(this.apiUrl)
      .pipe(
        tap(_ => this.log('fetched registrations')),
        catchError(this.handleError)
      );
  }

  getRegistration(id: number): Observable<Registration> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Registration>(url)
      .pipe(
        tap(_ => this.log(`fetched registration id=${id}`)),
        catchError(this.handleError)
      );
  }

  addRegistration(registration: Registration): Observable<Registration> {
    return this.http.post<Registration>(this.apiUrl, JSON.stringify(registration), this.httpOptions)
      .pipe(
        tap(_ => this.log('added registration')),
        catchError(this.handleError)
      );
  }

  updateRegistration(registration: Registration): Observable<any> {
    const url = `${this.apiUrl}/${registration.registrationId}`;
    return this.http.put(url, JSON.stringify(registration), this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated registration id=${registration.registrationId}`)),
        catchError(this.handleError)
      );
  }

  deleteRegistration(id: number): Observable<Registration> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Registration>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted registration id=${id}`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error) {
      alert(`An error occurred: ${error.error.detail}`);
      this.log(`An error occurred: ${error.error.detail}`);
    }
    return EMPTY;
  }

  private log(message: string): void {
    this.messageService.add(`RegistrationService: ${message}`);
  }
}
