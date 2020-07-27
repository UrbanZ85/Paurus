import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private firestore: AngularFirestore) { }


  createCourse(data) {
    return this.firestore.collection('Courses').add(data);
  }

  getCourses() {
    return this.firestore.collection('Courses').snapshotChanges();
  }

  updateCourse(id, data){
    this.firestore.doc('Courses/' + id).update(data);
  }

  deleteCourse(id) {
    this.firestore.doc('Courses/' + id).delete();
  }
}
