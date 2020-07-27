import { Component, OnInit, Input } from '@angular/core';
import {Courses} from '../../models/courses';
import { CoursesService } from 'src/app/services/course.service';
import { MessageService } from 'primeng/api';
import { StudentService } from 'src/app/services/student.service';
import { ProfessorsService } from 'src/app/services/professors.service';
import { Subscriber, Subscription } from 'rxjs';
import { Student } from 'src/app/models/student';
import { Professor } from 'src/app/models/profesor';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers: [MessageService]
})
export class CoursesComponent implements OnInit {
  @Input() overview = false;
  course: Courses = {};
  displayDialog: boolean;
  selectedCourses: Courses;
  newCourses: boolean;
  courses: Courses[];
  students: Student[] = [];
  professors: Professor[] = [];
  cols: any[];

  courseSubscribe: Subscription = new Subscription();


  constructor(private courSrv: CoursesService, public messageService: MessageService,
              private studSrv: StudentService, private profSrv: ProfessorsService) { }

  async ngOnInit() {
    /* this.studSrv.getStudents().then(data => this.students = data); */

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'professors', header: 'Professors' },
      { field: 'students', header: 'Students' }
  ];
    this.getStudents();
    this.getProfessors();

    this.courSrv.getCourses().subscribe(data => {

      this.courses = data.map(e => {
        return {
          id: e.payload.doc.id,
          // tslint:disable-next-line:no-string-literal
          name: e.payload.doc.data()['name'],
          professors: this.professors.filter(element =>
                      {
                        if (element === undefined) {
                          return false;
                        } else {
                            return element.courses.some(s => s.id.includes(e.payload.doc.id));
                          }
                      }),
          students: this.students.filter(element =>
                          {
                            if (element === undefined) {
                              return false;
                            } else {
                                return element.courses.some(s => s.id.includes(e.payload.doc.id));
                              }
                          })
        };
      });

      /* this.courses.forEach(element => {
          console.log(this.studSrv.getUsersByCourse(element).subscribe(data2 =>
            {
              console.log(data2);
            }));
        }); */
    });
  }

ngOnDestroy(): void {
    // tslint:disable-next-line:no-unused-expression
    this.courseSubscribe.unsubscribe;
}

/*   debugPrint(){
    console.log(this.students);
    console.log(this.professors);
    console.log(this.courses);
  } */

  async getStudents(){
    this.studSrv.getStudents().subscribe(data => {
        this.students = data.map(e => {
          return {
            // tslint:disable-next-line:no-string-literal
            name: e.payload.doc.data()['name'],
            // tslint:disable-next-line:no-string-literal
            last_name: e.payload.doc.data()['last_name'],
            // tslint:disable-next-line:no-string-literal
            courses: e.payload.doc.data()['courses']
          };
        });
      });
}

getProfessors(){
  this.profSrv.getProfessors().subscribe(data => {
      this.professors = data.map(e => {
        return {
          // tslint:disable-next-line:no-string-literal
          name: e.payload.doc.data()['name'],
          // tslint:disable-next-line:no-string-literal
          courses: e.payload.doc.data()['courses']
        };
      });
    });
}

  showDialogToAdd() {
    this.newCourses = true;
    this.course = {};
    this.displayDialog = true;
}

save() {
  // tslint:disable-next-line:prefer-const
  let students = [...this.courses];
  if (this.newCourses){
      students.push(this.course);
      this.courSrv.createCourse(this.course).then(resp => {
        console.log('inserted');
      })
        .catch(error => {
          console.log(error);
        });
  }  else {
    students[this.courses.indexOf(this.selectedCourses)] = this.course;
    this.courSrv.updateCourse(this.course.id, this.course);
  }

  this.courses = students;
  this.course = null;
  this.displayDialog = false;
}

  delete() {
    // tslint:disable-next-line:prefer-const
    let index = this.courses.indexOf(this.selectedCourses);
    this.courses = this.courses.filter((val, i) => i !== index);
    this.courSrv.deleteCourse(this.selectedCourses.id);
    this.course = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    if (this.overview === false) {
      this.newCourses = false;
      this.course = this.cloneStudent(event.data);
      this.displayDialog = true;
    }
  }

  cloneStudent(c: Courses): Courses {
    // tslint:disable-next-line:prefer-const
    let course = {};
    // tslint:disable-next-line:forin
    for (let prop in c) {
      course[prop] = c[prop];
    }
    return course;
  }
}
