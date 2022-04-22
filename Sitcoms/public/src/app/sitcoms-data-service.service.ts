import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Sitcom } from './sitcoms/sitcoms.component';

@Injectable({
  providedIn: 'root'
})
export class SitcomsDataService{

  baseUrl = "http://localhost:3000/api";

  constructor(private http:HttpClient,private _authService:AuthenticationService) { }

  public getSitcoms():Observable<Sitcom[]>{
    return this.http.get<Sitcom[]>(this.baseUrl+'/sitcoms');
  }

  getSitcom(sitcomId: string):Observable<Sitcom> {
    return this.http.get<Sitcom>(this.baseUrl+'/sitcoms/'+sitcomId);
  }

  deleteSitcom(sitcomId: string):Observable<any> {
    return this.http.delete<Sitcom>(this.baseUrl+'/sitcoms/'+sitcomId,this._authService.geTokenHeader());
  }

  createSitcom(newSitcom:any):Observable<Sitcom>{
    console.log(this.baseUrl+'/sitcoms')
    return this.http.post<Sitcom>(this.baseUrl+'/sitcoms',newSitcom,this._authService.geTokenHeader());
  }

  updateSitcom(updatedSitcom:any,sitcomId:string):Observable<Sitcom>{
    const url = this.baseUrl + '/sitcoms/' + sitcomId;
    return this.http.put<Sitcom>(url,updatedSitcom,this._authService.geTokenHeader());
  }

  createProduction(newProduction:any,sitcomId:string):Observable<any>{
    const url = this.baseUrl + '/sitcoms/' + sitcomId +"/production"
    return this.http.post<any>(url,newProduction,this._authService.geTokenHeader());
  }

  updateProduction(newProduction:any,sitcomId:string):Observable<any>{
    const url = this.baseUrl + '/sitcoms/' + sitcomId +"/production"
    return this.http.put<any>(url,newProduction,this._authService.geTokenHeader());
  }

  deleteProduction(sitcomId:string):Observable<any>{
    const url = this.baseUrl + '/sitcoms/' + sitcomId +"/production"
    return this.http.delete<any>(url,this._authService.geTokenHeader());
  }

  getProduction(sitcomId:string):Observable<any>{
    const url = this.baseUrl + '/sitcoms/' + sitcomId +"/production"
    return this.http.get<any>(url);
  }

}
