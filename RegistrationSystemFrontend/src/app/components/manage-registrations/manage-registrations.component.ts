import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registration } from '../../models/registration.model';
import { RegistrationService } from '../../services/registration.service';
import { Student } from 'src/app/models/student.model';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { StudentService } from 'src/app/services/student.service';
@Component({
  selector: 'app-manage-registrations',
  templateUrl: './manage-registrations.component.html',
  styleUrls: ['./manage-registrations.component.css']
})
export class ManageRegistrationsComponent implements OnInit {
  registration: Registration = {} as Registration;
  students: Student[] = [];
  courses: Course[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private registrationService: RegistrationService,
    private courseService: CourseService,
    private studentService: StudentService
  ) { }
  ngOnInit(): void {
    this.getCourses();
    this.getStudents();

    this.route.paramMap.subscribe(params  => {
      const id = params.get('id');
      console.log("id = "+id)
      if (id) {
        this.registrationService.getRegistrations().subscribe(data => {
          this.registration = data.find(s => s.registrationId.toString() === id)!;
        });
      }
    });
  }
  saveRegistration() {
    if (this.registration.registrationId) {
      this.registrationService.updateRegistration(this.registration).subscribe(() => {
        this.router.navigate(['/registrations']);
      }, (error) => {
        alert(error);
      });
    } else {
      this.registrationService.addRegistration(this.registration).subscribe(() => {
        this.router.navigate(['/registrations']);
      });
    }
  }
  isDateInFuture(date: Date) {
    return new Date(date) > new Date();
  }

  private getStudents() {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
      debugger;
    });
  }
  private getCourses() {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
    });
  }
}