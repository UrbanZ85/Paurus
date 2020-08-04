import { TestBed } from '@angular/core/testing';


import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { AuthService } from '../core/auth/auth.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { GetNewIdService } from './get-new-id.service';
import { StudentService } from './student.service';

describe('GetNewIdService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    providers: [AuthService, HttpClient, HttpHandler, { provider: StudentService} ],
      imports: [RouterTestingModule, AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        AngularFirestoreModule,
        FormsModule
      ]
  }
  ));

  it('should be created', () => {
    const service: GetNewIdService = TestBed.get(GetNewIdService);
    expect(service).toBeTruthy();
  });

  it('fibo start = 101', () => {
    const service: GetNewIdService = TestBed.get(GetNewIdService);
    expect(service.fiboStart).toEqual(101);
  });

  /* it('Max must be grather of 100 and lover of 1000', () => {
    //let students = this.studentServ();
    const service: GetNewIdService = TestBed.get(GetNewIdService);
    expect(service.getNewId(students)).toBeGreaterThanOrEqual(1);

  }); */
});
