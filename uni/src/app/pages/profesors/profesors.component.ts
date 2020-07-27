import { Component, OnInit, Input } from '@angular/core';
import {Professor} from '../../models/profesor';
import { ProfessorsService } from 'src/app/services/professors.service';
import { MessageService } from 'primeng/api';
import { Courses } from 'src/app/models/courses';
import { CoursesService } from 'src/app/services/course.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profesors',
  templateUrl: './profesors.component.html',
  styleUrls: ['./profesors.component.css'],
  providers: [MessageService]
})
export class ProfesorsComponent implements OnInit {
  @Input() overview = false;
  professor: Professor = {};
  displayDialog: boolean;
  selectedProfessor: Professor;
  newProfessor: boolean;
  professors: Professor[];
  cols: any[];

  courses: Courses[];
  selectedCourses: Courses[] = [];
  item: Courses;

  professorSubscribe: Subscription = new Subscription();
  courseSubscribe: Subscription = new Subscription();


  constructor(private profSrv: ProfessorsService, private courSrv: CoursesService, public messageService: MessageService) { }

  ngOnInit() {
    /* this.studSrv.getStudents().then(data => this.students = data); */

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'courses', header: 'Courses' },
  ];

    this.professorSubscribe = this.profSrv.getProfessors().subscribe(data => {

      this.professors = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          courses: e.payload.doc.data()['courses'],
        };
      });
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

ngOnDestroy(): void {
    // tslint:disable-next-line:no-unused-expression
    this.professorSubscribe.unsubscribe;
    this.courseSubscribe.unsubscribe;
}

showDialogToAdd() {
    this.newProfessor = true;
    this.professor = {};
    this.displayDialog = true;
}

save() {
  // tslint:disable-next-line:prefer-const
  let professors = [...this.professors];
  if (this.newProfessor){
    professors.push(this.professor);

    this.profSrv.createProfessor(this.professor).then(resp => {
      console.log('inserted');
    })
      .catch(error => {
        console.log(error);
      });

  }  else {
    professors[this.professors.indexOf(this.selectedProfessor)] = this.professor;
    this.profSrv.updateProfessor(this.professor.id, this.professor);
  }

  this.professors = professors;
  this.professors = null;
  this.displayDialog = false;
}

  delete() {
    // tslint:disable-next-line:prefer-const
    let index = this.professors.indexOf(this.selectedProfessor);
    this.professors = this.professors.filter((val, i) => i !== index);
    this.profSrv.deleteProfessor(this.selectedProfessor.id);
    this.professor = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    if (this.overview === false) {
      this.newProfessor = false;
      this.professor = this.cloneProfessor(event.data);
      this.displayDialog = true;
    }
  }

  cloneProfessor(p: Professor): Professor {
    // tslint:disable-next-line:prefer-const
    let professor = {};
    // tslint:disable-next-line:forin
    for (let prop in p) {
      professor[prop] = p[prop];
    }
    return professor;
  }
}
