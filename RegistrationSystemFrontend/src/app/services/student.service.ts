import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Student } from '../models/student.model';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'https://localhost:7247/students'; // replace with your actual API endpoint

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl)
      .pipe(
        tap(_ => this.log('fetched students')),
        catchError(this.handleError)
      );
  }

  getStudent(id: number): Observable<Student> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Student>(url)
      .pipe(
        tap(_ => this.log(`fetched student id=${id}`)),
        catchError(this.handleError)
      );
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, JSON.stringify(student), this.httpOptions)
      .pipe(
        tap(_ => this.log('added student')),
        catchError(this.handleError)
      );
  }

  updateStudent(student: Student): Observable<any> {
    const url = `${this.apiUrl}/${student.studentId}`;
    return this.http.put(url, JSON.stringify(student), this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated student id=${student.studentId}`)),
        catchError(this.handleError)
      );
  }

  deleteStudent(id: number): Observable<Student> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Student>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted student id=${id}`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.log(`An error occurred: ${error.message}`);
    alert(`An error occurred: ${error.message}`);
    return EMPTY;
  }

  private log(message: string): void {
    this.messageService.add(`StudentService: ${message}`);
  }
}
