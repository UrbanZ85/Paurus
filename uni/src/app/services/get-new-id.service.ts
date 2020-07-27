import { Injectable } from '@angular/core';
import { StudentService } from './student.service';
import { Student } from '../models/student';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetNewIdService {
    constructor(private studSrv: StudentService) {
        this.fiboNumbers = this.getFibonnaci();
    }

    students: any[];
    fiboNumbers = [];
    fiboStart = 101;

    studentsSubscribe: Subscription = new Subscription();

    async getNewId() {
        /* let newId: number;
        let maxnum: number; */
        /* await this.getStudents(); */
        this.getStudents();


        let max;

        let currFibo;

        if (this.students && this.students.length > 0){
           max =  Math.max.apply(null,
           this.students.map(item => item.fiboId === undefined ? this.fiboStart : item.fiboId.substring(0, 3)));

           currFibo = Math.max.apply(null, this.students
            .filter(item => item.fiboId === undefined ? max : +item.fiboId.substring(0, 3) === max)
            .map(item => item.fiboId === undefined ? 1 : item.fiboId.substring(6, item.fiboId.length)));
        } else {
            max = this.fiboStart;
            currFibo = 0;
        }

        return this.combineNumbers(max, currFibo);
    }

    combineNumbers(first3, fibo){
        let exit = false;
        let second3: string;
        let temp: string;
        const nextFibo = this.getNextFibo(fibo);
        while (!exit){
            second3 = (+first3 - nextFibo).toString();
            if (+second3 < 100 || +second3 > 999)
            {
                temp = (this.combineNumbers(first3 + 1, 1)).toString();
            } else {
                temp = first3 + second3 + nextFibo;
            }
            // todo
            /* if (second3 < 100 && first3 > 999 && nextFibo > 899){
                exit = true;
                error:max id is reached
            } */
            if (this.isUnique(temp)){
                exit = true;
                return temp;
            } else {
                return temp = this.combineNumbers( first3 + 1, 1);
            }
        }
    }

    async isUnique(newId) {
        let isunique = true;
        if ( (this.students).filter(e => e.fiboId === newId).length  > 0){
            isunique = false;
        }
        return isunique;
    }

    getNextFibo(fibo){
        const currentIndex = this.fiboNumbers.indexOf(fibo);
        const nextIndex = (currentIndex + 1) % this.fiboNumbers.length;
        return this.fiboNumbers[nextIndex];
    }

    getStudents(){
        /* await this.stdSer.getStudents().then((data) => {
             this.students = data;
        });     */
        this.studentsSubscribe = this.studSrv.getStudents().subscribe(data => {
            this.students = data.map(e => {
              return {
                // tslint:disable-next-line:no-string-literal
                fiboId: e.payload.doc.data()['fiboId']
              };
            });
          });
    }

    ngOnDestroy(): void {
        // tslint:disable-next-line:no-unused-expression
        this.studentsSubscribe.unsubscribe;
    }

    getFibonnaci(){
        let prevFibo = 1;
        let currentFibo = 2;
        let newFibo = 1;
        // tslint:disable-next-line:prefer-const
        let fiboNumbers = [1];
        while ( currentFibo < 899) {
            fiboNumbers.push(currentFibo);
            newFibo = currentFibo + prevFibo;
            prevFibo = currentFibo;
            currentFibo = newFibo;
        }
        return fiboNumbers;
    }

}
