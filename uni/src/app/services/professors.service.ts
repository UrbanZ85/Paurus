
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProfessorsService {

  constructor(private firestore: AngularFirestore) { }


  createProfessor(data) {
    return this.firestore.collection('Professors').add(data);
  }

  getProfessors() {
    return this.firestore.collection('Professors').snapshotChanges();
  }

  updateProfessor(id, data){
    this.firestore.doc('Professors/' + id).update(data);
  }

  deleteProfessor(id) {
    this.firestore.doc('Professors/' + id).delete();
  }

  createCourseProfessor(profId, courseId) {
    return this.firestore.collection('CourseProffesor/' + courseId).add(profId);
  }

  delteProfessorCourse(profId, courseId){
    this.firestore.doc('CourseProffesor/' + courseId + '/profId/' + profId).delete();
  }
}
