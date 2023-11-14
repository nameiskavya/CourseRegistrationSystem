import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.css']
})
export class ManageStudentsComponent implements OnInit {
  student: Student = {} as Student;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params  => {
      const id = params.get('id');
      console.log("id = "+id)
      if (id) {
        this.studentService.getStudents().subscribe(data => {
          this.student = data.find(s => s.studentId.toString() === id)!;
        });
      }
    });
  }
  saveStudent() {
    if (this.student.studentId) {
      this.studentService.updateStudent(this.student).subscribe(() => {
        this.router.navigate(['/students']);
      }, (error) => {
        alert(error);
      });
    } else {
      this.studentService.addStudent(this.student).subscribe(() => {
        this.router.navigate(['/students']);
      });
    }
  }
  isDateInFuture(date: Date) {

    return new Date(date) > new Date();
  }
}