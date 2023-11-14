import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../models/course.model';
import { CourseType } from '../../models/course-type.model';
import { CourseService } from '../../services/course.service';
import { CourseTypeService } from '../../services/course-type.service';

@Component({
  selector: 'app-manage-courses',
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.css']
})
export class ManageCoursesComponent implements OnInit {
  course: Course = {} as Course;
  courseTypes: CourseType[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private courseTypeService: CourseTypeService
  ) { }

  ngOnInit(): void {
    this.getCourseTypes();

    this.route.paramMap.subscribe(params  => {
      const id = params.get('id');
      console.log("id = "+id)
      if (id) {
        this.courseService.getCourses().subscribe(data => {
          this.course = data.find(c => c.courseId.toString() === id)!;
        });
      }
    });
  }

  saveCourse() {
    if (this.course.courseId) {
      this.courseService.updateCourse(this.course).subscribe(() => {
        this.router.navigate(['/courses']);
      });
    } else {
      this.courseService.addCourse(this.course).subscribe(() => {
        this.router.navigate(['/courses']);
      });
    }
  }

  private getCourseTypes() {
    this.courseTypeService.getCourseTypes().subscribe(data => {
      this.courseTypes = data;
    });
  }
}
