import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedOverviewRoutingModule } from './shared-overview-routing.module';
import { SharedOverviewComponent } from './shared-overview.component';
import { ProfesorsComponent } from './profesors/profesors.component';

import { MessageModule } from 'primeng/message';
import { TableModule} from 'primeng/table';
import { DialogModule} from 'primeng/dialog';
import { ButtonModule} from 'primeng/button';
import { ToastModule} from 'primeng/toast';
import { MessagesModule} from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OverviewComponent } from './overview/overview.component';
import { StudentComponent } from './student/student.component';
import { CoursesComponent } from './courses/courses.component';

@NgModule({
  declarations: [SharedOverviewComponent, ProfesorsComponent, OverviewComponent, StudentComponent, CoursesComponent],
  imports: [
    CommonModule,
    SharedOverviewRoutingModule,
    TableModule,
    DialogModule,
    FormsModule,
    ButtonModule,
    ToastModule,
    MultiSelectModule,
    SharedModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
    NgbModule
  ]
})
export class SharedOverviewModule { }
