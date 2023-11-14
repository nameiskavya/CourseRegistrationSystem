import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Course } from '../models/course.model';
import { MessageService } from './message.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'https://localhost:7247/courses'; // replace with your actual API endpoint

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl)
      .pipe(
        tap(_ => this.log('fetched courses')),
        catchError(this.handleError)
      );
  }

  getCourse(id: number): Observable<Course> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Course>(url)
      .pipe(
        tap(_ => this.log(`fetched course id=${id}`)),
        catchError(this.handleError)
      );
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, JSON.stringify(course), this.httpOptions)
      .pipe(
        tap(_ => this.log('added course')),
        catchError(this.handleError)
      );
  }

  updateCourse(course: Course): Observable<any> {
    const url = `${this.apiUrl}/${course.courseId}`;
    return this.http.put(url, JSON.stringify(course), this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated course id=${course.courseId}`)),
        catchError(this.handleError)
      );
  }

  deleteCourse(id: number): Observable<Course> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Course>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted course id=${id}`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.log(`An error occurred: ${error.message}`);
    alert(`An error occurred: ${error.message}`);
    return EMPTY;
  }

  private log(message: string): void {
    this.messageService.add(`CourseService: ${message}`);
  }
}
