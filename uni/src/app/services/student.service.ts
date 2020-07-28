import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { Student } from '../models/student';
import { AuthService } from '../core/auth/auth.service';


// https://medium.com/@aaron_lu1/firebase-cloud-firestore-add-set-update-delete-get-data-6da566513b1b
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private firestore: AngularFirestore, private http: HttpClient, private authService: AuthService) { }


  createStudent(data: Student) {
  /* data.courses2 = [];
  data.courses.forEach(element => {
       console.log(this.firestore.doc('Courses/' + element.id).ref);
      data.courses2.push({courses: this.firestore.doc('Courses/' + element.id).ref});
  });

  console.log(data); */
  /* console.log('aaa');
  console.log(data);
  let test = this.firestore.collection('Students').add(data);
  console.log(test);
  console.log('bb');
  return test; */

  /* console.log('aaa');
  return new Promise<any>((resolve, reject) => {
    this.firestore
        .collection('Students')
        .add(JSON.stringify(data))
        .then(res => {console.log('OK'); } , err => reject(console.log(err)))
        .catch(e => {console.log(e); });
}); */
console.log(typeof(data))

/* return setTimeout(() => { */


return this.firestore.collection('Students').add(data);
/* }, 2000); */

/* return setTimeout(this.firestore.collection('Students').doc().set({name: data.name,
    last_name: data.last_name,
    birthdate: data.birthdate,
    studentNr: data.studentNr,
    fiboId: data.fiboId,
    courses: data.courses
}); */
/* return this.firestore.collection('Students').add(data); */

/* const studentsCollection = this.firestore.collection<Student>('Students');
 */

/* return this.firestore.collection('Students').add(data).then(documentReference => {
  console.log(`Added document with name '${documentReference.id}'`);
}); */

/* return studentsCollection.add(data); */

/* console.log(data);
return this.firestore.collection('Students').add(data); */
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
    console.log(data);
    this.firestore.doc('Students/' + id).update(data);
  }

  deleteStudent(id) {
    this.firestore.doc('Students/' + id).delete();
  }

  /* getUsersByCourse(course) {
    const data =  this.firestore.collection('Students', ref => ref.where('courses', '==', course));
    // console.log(data.data());
    return data.snapshotChanges();
  } */
}
