import { Component, OnInit } from '@angular/core';
import { GamesDataService } from '../games-data.service';


export class Game {
  #_id!: string;
  #title!: string;
  #year!: string;
  #rate!: number;
  #price!: number;
  #minPlayers !: number;  
  #maxPlayers !: number;
  #minAge !: number;
  constructor(rate:number){
    this.#rate = rate;
  }
  get _id(){return this.#_id;}
  get title(){return this.#title;}
  get year(){return this.#year;}
  get rate(){return this.#rate;}
  get price(){return this.#price;}
  get minPlayers(){return this.#minPlayers;}
  get maxPlayers(){return this.#maxPlayers;}
  get minAge(){return this.#minAge;}
}

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  
  games !: Game[];

  constructor(private gamesService:GamesDataService) { }

  ngOnInit(): void {  
    this.getGames();
  }

  getGames(){
    this.gamesService.getGames().subscribe(games=>{
      this.games = games;
      console.log(games);
  })}

  onDelete(gameId:any):void{
    this.gamesService.deleteGame(gameId).subscribe(
      data=>{alert("Game deleted successfully.")
        console.log(data);},
      err=>{console.log(err)},
      ()=>{this.getGames()}
    )
  }

}
