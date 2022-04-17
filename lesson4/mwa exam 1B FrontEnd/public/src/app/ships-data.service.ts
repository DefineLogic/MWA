import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Ship } from './ships/ships.component';

@Injectable({
  providedIn: 'root'
})
export class ShipsDataService {
  private apiBaseUrl: string= "http://localhost:3000/api"
  private separator:string = "/"

  constructor(private http:HttpClient) { }

  public getShips(): Promise<Ship[]> {
    const url: string= this.apiBaseUrl + "/ships";
    
    return this.http.get(url).toPromise()
                // .then(response => {console.log(response); response as Ship[]})
                .catch(this.handleError);
  }

  public getShip(shipId: string): Promise<Ship> {
    const url: string= this.apiBaseUrl + "/ships/" + shipId;
    
    return this.http.get(url).toPromise()
                // .then(response => {console.log(response); response as Ship})
                .catch(this.handleError);
  }

  public getShipByPagination(offset:number,count:number):Observable<Ship[]>{
    return this.http.get<Ship[]>(this.apiBaseUrl+"/ships/pagination/"+offset+"/"+count)
  }

  public getShipByGeoSearch(long:number,lat:number,distance:number):Observable<Ship[]>{
    return this.http.get<Ship[]>(this.apiBaseUrl+"/ships/geoSearch/"+long+"/"+lat+"/"+distance)
  }


  private handleError(error: any):Promise<any> {
    return Promise.reject(error.message || error);
  }
}
