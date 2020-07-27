import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StudentComponent } from './pages/student/student.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { ProfesorsComponent } from './pages/profesors/profesors.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { AuthGuard } from './core/auth/auth.guard';


const routes: Routes = [
  {    path: '', component: HomeComponent },
  {    path: 'students', component: StudentComponent, canActivate: [AuthGuard]},
  {    path: 'overview', component: OverviewComponent, canActivate: [AuthGuard]},
  {    path: 'profesors', component: ProfesorsComponent, canActivate: [AuthGuard]},
  {    path: 'courses', component: CoursesComponent, canActivate: [AuthGuard]},
  {
    path: 'auth',
    loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule)
  }

];
/* {    path: 'login', component: OverviewComponent , canActivate: [BeforeLoginService] },]; */

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
