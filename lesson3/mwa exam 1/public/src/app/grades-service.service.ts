import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grade } from './grades/grades.component';

@Injectable({
  providedIn: 'root'
})
export class GradesServiceService {

  baseUrl = "http://localhost:3000/api"

  constructor(private http:HttpClient) { }

  getGrades():Observable<Grade[]>{
    return this.http.get<Grade[]>(this.baseUrl+"/grades");
  }

  getOneGrade(gradeId:string):Observable<Grade>{
    return this.http.get<Grade>(this.baseUrl+"/grades/"+gradeId);
  }

  
}
