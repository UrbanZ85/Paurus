import { TestBed } from '@angular/core/testing';

import { StudentService } from './student.service';

import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { AuthService } from '../core/auth/auth.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, FormsModule } from '@angular/forms';

describe('StudentService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [AuthService, HttpClient, HttpHandler ],
      imports: [RouterTestingModule, AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        AngularFirestoreModule,
        FormsModule
      ]
  }));

  it('should be created', () => {
    const service: StudentService = TestBed.get(StudentService);
    expect(service).toBeTruthy();
  });
});
