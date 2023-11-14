import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { CourseType } from '../../models/course-type.model';
import { CourseService } from '../../services/course.service';
import { CourseTypeService } from '../../services/course-type.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.css']
})
export class ViewCoursesComponent implements OnInit {
  courses: Course[] = [];
  courseTypes: CourseType[] = [];

  constructor(
    private courseService: CourseService,
    private courseTypeService: CourseTypeService
  ) { }

  ngOnInit(): void {
    this.getCourses();
    this.getCourseTypes();
  }

  private getCourses() {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
    });
  }

  private getCourseTypes() {
    this.courseTypeService.getCourseTypes().subscribe(data => {
      this.courseTypes = data;
    });
  }

  getCourseTypeName(courseTypeId: number): string {
    const courseType = this.courseTypes.find(ct => ct.courseTypeId === courseTypeId);
    return courseType ? courseType.typeName : '';
  }

  deleteCourse(courseId: number) {
    if(confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(courseId).subscribe(() => {
        this.getCourses();
      });
    }
  }
}
