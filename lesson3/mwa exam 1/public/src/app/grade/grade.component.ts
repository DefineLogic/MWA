import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GradesServiceService } from '../grades-service.service';
import { Grade } from '../grades/grades.component';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {

  grade!:Grade;

  constructor(private route:ActivatedRoute,private gradeService:GradesServiceService) { }

  ngOnInit(): void {
    const gradeId = this.route.snapshot.params["gradeId"];
    this.gradeService.getOneGrade(gradeId).subscribe(
      data=>{
        console.log("Grade Fetched",data)
        this.grade = data;
        this.grade.scores.sort(compare);
      },
      err=>{},
      ()=>{}
    )
  }
}
  const compare = function(a:any,b:any){
    if(a.score < b.score){
      return -1;
    }
    if(a.score > b.score){
      return 1;
    }
    return 0 ; 
  }




