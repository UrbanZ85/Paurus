import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { StudentComponent } from './shared-overview/student/student.component';
import { Routes } from '@angular/router';

describe('AppComponent', () => {
  const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'pages/students', component: StudentComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));
});
