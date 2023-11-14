import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewStudentsComponent } from './components/view-students/view-students.component';
import { ManageStudentsComponent } from './components/manage-students/manage-students.component';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from './components/message/message.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewCourseTypesComponent } from './components/view-course-types/view-course-types.component';
import { ManageCourseTypesComponent } from './components/manage-course-types/manage-course-types.component';
import { ManageCoursesComponent } from './components/manage-courses/manage-courses.component';
import { ViewCoursesComponent } from './components/view-courses/view-courses.component';
import { LoginComponent } from './components/login/login.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { ManageRegistrationsComponent } from './components/manage-registrations/manage-registrations.component';
import { ViewRegistrationsComponent } from './components/view-registrations/view-registrations.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewStudentsComponent,
    ManageStudentsComponent,
    ViewCourseTypesComponent,
    ManageCourseTypesComponent,
    MessageComponent,
    ManageCoursesComponent,
    ViewCoursesComponent,
    LoginComponent,
    AccessDeniedComponent,
    ManageRegistrationsComponent,
    ViewRegistrationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
