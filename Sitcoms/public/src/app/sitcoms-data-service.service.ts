import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sitcom } from './sitcoms/sitcoms.component';

@Injectable({
  providedIn: 'root'
})
export class SitcomsDataService{

  baseUrl = "http://localhost:3000/api";

  constructor(private http:HttpClient) { }

  public getSitcoms():Observable<Sitcom[]>{
    return this.http.get<Sitcom[]>(this.baseUrl+'/sitcoms');
  }

  getSitcom(sitcomId: string):Observable<Sitcom> {
    return this.http.get<Sitcom>(this.baseUrl+'/sitcoms/'+sitcomId);
  }

  deleteSitcom(sitcomId: string):Observable<any> {
    return this.http.delete<Sitcom>(this.baseUrl+'/sitcoms/'+sitcomId);
  }

  createSitcom(newSitcom:any):Observable<Sitcom>{
    console.log(this.baseUrl+'/sitcoms')
    return this.http.post<Sitcom>(this.baseUrl+'/sitcoms',newSitcom);
  }

  updateSitcom(updatedSitcom:any,sitcomId:string):Observable<Sitcom>{
    const url = this.baseUrl + '/sitcoms/' + sitcomId;
    return this.http.put<Sitcom>(url,updatedSitcom);
  }

  createProduction(newProduction:any,sitcomId:string):Observable<any>{
    const url = this.baseUrl + '/sitcoms/' + sitcomId +"/production"
    return this.http.post<any>(url,newProduction);
  }

  updateProduction(newProduction:any,sitcomId:string):Observable<any>{
    const url = this.baseUrl + '/sitcoms/' + sitcomId +"/production"
    return this.http.put<any>(url,newProduction);
  }

  deleteProduction(sitcomId:string):Observable<any>{
    const url = this.baseUrl + '/sitcoms/' + sitcomId +"/production"
    return this.http.delete<any>(url);
  }

  getProduction(sitcomId:string):Observable<any>{
    const url = this.baseUrl + '/sitcoms/' + sitcomId +"/production"
    return this.http.get<any>(url);
  }

}
