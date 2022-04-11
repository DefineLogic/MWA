import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Game } from './games/games.component';

@Injectable({
  providedIn: 'root'
})
export class GamesDataService {


  baseUrl = "http://localhost:3000/api";

  constructor(private http:HttpClient) { }

  public getGames():Observable<Game[]>{
    return this.http.get<Game[]>(this.baseUrl+'/games');
  }

  getGame(gameId: string):Observable<Game> {
    return this.http.get<Game>(this.baseUrl+'/games/'+gameId);
  }

  deleteGame(gameId: string):Observable<any> {
    return this.http.delete<Game>(this.baseUrl+'/games/'+gameId);
  }
}
