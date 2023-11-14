
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { ViewStudentsComponent } from './components/view-students/view-students.component';
import { ManageStudentsComponent } from './components/manage-students/manage-students.component';
import { ViewCourseTypesComponent } from './components/view-course-types/view-course-types.component';
import { ManageCourseTypesComponent } from './components/manage-course-types/manage-course-types.component';
import { ViewCoursesComponent } from './components/view-courses/view-courses.component';
import { ManageCoursesComponent } from './components/manage-courses/manage-courses.component';
import { LoginComponent } from './components/login/login.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { ManageRegistrationsComponent } from './components/manage-registrations/manage-registrations.component';
import { ViewRegistrationsComponent } from './components/view-registrations/view-registrations.component';

const routes: Routes = [
  { path: 'students', component: ViewStudentsComponent, canActivate: [AuthGuard] },
  { path: 'manage-student', component: ManageStudentsComponent, canActivate: [AuthGuard] },
  { path: 'manage-student/:id', component: ManageStudentsComponent, canActivate: [AuthGuard] },
  { path: 'course-types', component: ViewCourseTypesComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'Admin' } },
  { path: 'manage-course-type', component: ManageCourseTypesComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'Admin' } },
  { path: 'manage-course-type/:id', component: ManageCourseTypesComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'Admin' } },
  { path: 'courses', component: ViewCoursesComponent, canActivate: [AuthGuard] },
  { path: 'manage-course', component: ManageCoursesComponent, canActivate: [AuthGuard] },
  { path: 'manage-course/:id', component: ManageCoursesComponent, canActivate: [AuthGuard] },
  { path: 'registrations', component: ViewRegistrationsComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'Clerk' } },
  { path: 'manage-registration', component: ManageRegistrationsComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'Clerk' } },
  { path: 'manage-registration/:id', component: ManageRegistrationsComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'Clerk' } },
  { path: 'login', component: LoginComponent },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: '**', redirectTo: 'students', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

