import { Component, OnInit } from '@angular/core';
import { GradesServiceService } from '../grades-service.service';


export class Grade{
  _id!:string;
  student_id!:Number;
  class_id!:Number;
  scores!:[any];
}

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {

  grades!: Grade[];

  constructor(private gradeService:GradesServiceService) { }

  ngOnInit(): void {
    this.getGrades();
  } 

  getGrades(){
    this.gradeService.getGrades().subscribe(
      data =>{
        console.log("Fetched Grades:",data)
        this.grades = data;
        this.grades.sort(compare);
      },
      err =>{},
      ()=>{}
    )
  }

}

const compare = function(a:Grade,b:Grade){
  if(a.student_id < b.student_id)
  return -1;
  if(a.student_id > b.student_id)
  return 1;
  return 0;
}
