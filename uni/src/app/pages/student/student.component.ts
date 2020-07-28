import { Component, OnInit, Input, Output } from '@angular/core';
import {TableModule} from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';
import {SelectItem, LazyLoadEvent} from 'primeng/api';

import { MenuItem, MessageService } from 'primeng/api';
import {MessageModule} from 'primeng/message';

import {Student} from '../../models/student';
import { StudentService } from 'src/app/services/student.service';
import { CoursesService } from 'src/app/services/course.service';
import {Courses} from '../../models/courses';
import { GetNewIdService } from 'src/app/services/get-new-id.service';
import * as moment from 'moment';


import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers: [MessageService]
})
export class StudentComponent implements OnInit {
  @Input() overview = false;
  student: Student = {};
  displayDialog: boolean;
  selectedStudent: Student;
  newStudent: boolean;
  datasource: Student[];
  students: Student[];
  cols: any[];

  courses: Courses[];
  selectedCourses: Courses[] = [];
  item: Courses;

  userform: FormGroup;
  loading: boolean;
  totalRecords;

  studentsSubscribe: Subscription = new Subscription();
  courseSubscribe: Subscription = new Subscription();


  constructor(private studSrv: StudentService, private courSrv: CoursesService,
              private messageService: MessageService, private getNewId: GetNewIdService, private fb: FormBuilder) {}

  ngOnInit() {
    /* this.studSrv.getStudents().then(data => this.students = data); */
    /* this.loading = true; */

    this.userform = this.fb.group({
      name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      birthdate: new FormControl('', Validators.required),
      studentNr: new FormControl('', Validators.required),
      courses: new FormControl(''),
      fiboId: new FormControl(''),
  });

    this.cols = [
      /* { field: 'id', header: 'ID' }, */
      { field: 'name', header: 'Name' },
      { field: 'last_name', header: 'Last name' },
      { field: 'birthdate', header: 'Birth date' },
      { field: 'studentNr', header: 'Studnet Number' },
      { field: 'courses', header: 'Courses' },
      { field: 'fiboId', header: 'fibo Id' }
    ];

    this.studentsSubscribe = this.studSrv.getStudents().subscribe(data => {
      this.students = data.map(e => {
        return {
          id: e.payload.doc.id,
          // tslint:disable-next-line:no-string-literal
          name: e.payload.doc.data()['name'],
          // tslint:disable-next-line:no-string-literal
          last_name: e.payload.doc.data()['last_name'],
          // tslint:disable-next-line:no-string-literal
          birthdate: moment(e.payload.doc.data()['birthdate']).format('DD.MM.YYYY'),
          // tslint:disable-next-line:no-string-literal
          studentNr: e.payload.doc.data()['studentNr'],
          // tslint:disable-next-line:no-string-literal
          courses: e.payload.doc.data()['courses'],
          // tslint:disable-next-line:no-string-literal
          fiboId: e.payload.doc.data()['fiboId']
        };
      });
      this.loading = false;
      this.datasource = this.students;
      this.totalRecords = this.students.length;
    });

    this.courseSubscribe = this.courSrv.getCourses().subscribe(data => {

      this.courses = data.map(e => {
        return {
          id: e.payload.doc.id,
          // tslint:disable-next-line:no-string-literal
          name: e.payload.doc.data()['name'],
          // tslint:disable-next-line:no-string-literal
          professor: e.payload.doc.data()['professor'],
        };
      });
    });
  }

// tslint:disable-next-line:use-lifecycle-interface
ngOnDestroy(): void {
    // tslint:disable-next-line:no-unused-expression
    this.studentsSubscribe.unsubscribe;
    // tslint:disable-next-line:no-unused-expression
    this.courseSubscribe.unsubscribe;
}

showDialogToAdd() {
    this.newStudent = true;
    this.student = {};
    this.displayDialog = true;
}

onSubmit(value: string) {
  console.log('submitted');
  this.messageService.add({severity: 'info', summary: 'Success', detail: 'Form Submitted'});
}


async save() {
  /* let tmpCour: Courses[];
  console.log(this.student) */
  console.log(this.userform.value)
  /* tmpCour = {...this.student.courses};
  this.userform.patchValue(tmpCour); */
  this.student = {...this.userform.value};

  this.userform.reset();
  this.displayDialog = false;

  if (this.newStudent){

      if (this.students !== undefined) {
        this.student.fiboId = await this.getNewId.getNewId();
      }
      this.studSrv.createStudent(this.student);
  }  else {
    /* let students;
    // tslint:disable-next-line:prefer-const
    if (this.students !== undefined) {
      students = [...this.students];
    } */

    /* students[this.students.indexOf(this.selectedStudent)] = this.student; */
    this.studSrv.updateStudent(this.selectedStudent.id, this.student);

  }
  /* this.students = students; */
  this.student = null;
}

  delete() {
    // tslint:disable-next-line:prefer-const
    let index = this.students.indexOf(this.selectedStudent);
    this.students = this.students.filter((val, i) => i !== index);
    this.studSrv.deleteStudent(this.selectedStudent.id);
    this.student = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    if (this.overview === false) {
      this.newStudent = false;
      this.student = this.cloneStudent(event.data);
      this.userform.patchValue({...event.data});
      this.displayDialog = true;
    }
  }

  cloneStudent(s: Student): Student {
    // tslint:disable-next-line:prefer-const
    let student = {};
    // tslint:disable-next-line:forin
    for (let prop in s) {
      student[prop] = s[prop];
    }
    return student;
  }


  /* loadCarsLazy(event: LazyLoadEvent) {
    this.loading = true;

    if (this.datasource) {
        this.students = this.datasource.slice(event.first, (event.first + event.rows));
        this.loading = false;
    }
} */
}
