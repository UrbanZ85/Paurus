import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfesorsComponent } from './profesors/profesors.component';
import { AuthGuard } from '../core/auth/auth.guard';
import { StudentComponent } from './student/student.component';
import { CoursesComponent } from './courses/courses.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [{ path: 'overview', component: OverviewComponent, canActivate: [AuthGuard] },
                        {    path: 'students', component: StudentComponent, canActivate: [AuthGuard]},
                        {    path: 'profesors', component: ProfesorsComponent, canActivate: [AuthGuard]},
                        {    path: 'courses', component: CoursesComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    ],
  exports: [RouterModule]
})
export class SharedOverviewRoutingModule { }
