import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { query } from '@angular/animations';
import { Student } from '../models/student';
import { map, catchError, take, exhaustMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private firestore: AngularFirestore, private http: HttpClient, private authService: AuthService) { }


  createStudent(data) {
  /* data.courses2 = [];
  data.courses.forEach(element => {
       console.log(this.firestore.doc('Courses/' + element.id).ref);
      data.courses2.push({courses: this.firestore.doc('Courses/' + element.id).ref});
  });

  console.log(data); */
  return this.firestore.collection('Students').add(data);
  }

  /* createStudent(data) {
  return this.authService.user.pipe(take(1), exhaustMap( user => {
    return this.http.post('https://studentdb-a3972.firebaseio.com/Students.json?auth=' + user.token, data);
  })).subscribe(response => {});
  // return this.firestore.collection('Students').add(data);
  }

  // todo set pagination - 20 rows
  async getStudents(): Promise<any[]>{
    return this.authService.user.pipe(take(1), exhaustMap( user => {
     return this.http.get('https://studentdb-a3972.firebaseio.com/Students.json?auth=' + user.token)
      .pipe(map(resData => {
        const postArray = [];
        for (const key in resData){
          if (resData.hasOwnProperty(key)){
            postArray.push({...resData[key], id: key});
          }
        }
        return postArray;
        }));
      })).toPromise();
    // ((return this.firestore.collection('Students').snapshotChanges();
  } */

 /*  createStudent(data) {
      return this.http.post('https://studentdb-a3972.firebaseio.com/Students.json', data).subscribe(response => {});
    } */

    /* // todo set pagination - 20 rows
    async getStudents(): Promise<any[]>{
       return this.http.get('https://studentdb-a3972.firebaseio.com/Students.json').pipe(map(resData => {
        const postArray = [];
        for (const key in resData){
          if (resData.hasOwnProperty(key)){
            postArray.push({...resData[key], id: key});
          }
        }
        return postArray;
        })).toPromise();
    } */
  getStudents() {
    return this.firestore.collection('Students').snapshotChanges();
  }

  updateStudent(id, data){
    this.firestore.doc('Students/' + id).update(data);
  }

  deleteStudent(id) {
    this.firestore.doc('Students/' + id).delete();
  }

  getUsersByCourse(course) {
    const data =  this.firestore.collection('Students', ref => ref.where('courses', '==', course));
    // console.log(data.data());
    return data.snapshotChanges();
  }
}
