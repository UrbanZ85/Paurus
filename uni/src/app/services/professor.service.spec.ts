import { TestBed } from '@angular/core/testing';

import { ProfessorsService } from './professors.service';

import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';

describe('ProfessorsService', () => {
  let service: ProfessorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AngularFirestore ],
      imports: [ AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        AngularFirestoreModule]
    });
    service = TestBed.inject(ProfessorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
