import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { Registration } from 'src/app/models/registration.model';
import { Student } from 'src/app/models/student.model';
import { CourseService } from 'src/app/services/course.service';
import { RegistrationService } from 'src/app/services/registration.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-view-registrations',
  templateUrl: './view-registrations.component.html',
  styleUrls: ['./view-registrations.component.css']
})
export class ViewRegistrationsComponent {
  registrations: Registration[] = [];
  courses: Course[] = [];
  students: Student[] = [];

  constructor(private registrationService: RegistrationService,
              private courseService: CourseService,
              private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudents();
    this.getCourses();

    this.getRegistrations();
  }

  private getRegistrations() {
    this.registrationService.getRegistrations().subscribe(data => {
      this.registrations = data;
    });
  }

  deleteRegistration(registrationId: number) {
    if(confirm('Are you sure you want to delete this registration?')) {
      this.registrationService.deleteRegistration(registrationId).subscribe(() => {
        this.getRegistrations();
      });
    }
  }

  private getCourses() {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
    });
  }

  getCourseName(courseId: number): string {
    const course = this.courses.find(ct => ct.courseId === courseId);
    return course ? course.courseName : '';
  }

  private getStudents() {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
    });
  }

  getStudentName(studentId: number): string {
    const student = this.students.find(ct => ct.studentId === studentId);
    return student ? (student.firstName + " " + student.lastName) : '';
  }
}