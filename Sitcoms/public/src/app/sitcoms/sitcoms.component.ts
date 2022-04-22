import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { SitcomsDataService } from '../sitcoms-data-service.service';

export class Sitcom {
  #_id!: string;
  #title!:string;
  #aired!: string;
  #imdbRating!: number;
  #totalSeasons!: number;
  #totalEpisodes!: number;
  production!:any;

  constructor(title:string,aired:string,imdbRating:number,totalSeasons:number,totalEpisodes:number,production:any){
    this.#title = title;
    this.#aired = aired;
    this.#imdbRating = imdbRating;
    this.#totalSeasons = totalSeasons;
    this.#totalEpisodes = totalEpisodes;
    this.production  = production;
  }

  get _id(){return this.#_id;}
  get title(){return this.#title};
    get aired(){return this.#aired;}
  get imdbRating(){return this.#imdbRating;}
  get totalSeasons(){return this.#totalSeasons;}
  get totalEpisodes(){return this.#totalEpisodes;}
}

@Component({
  selector: 'app-sitcoms',
  templateUrl: './sitcoms.component.html',
  styleUrls: ['./sitcoms.component.css']
})
export class SitcomsComponent implements OnInit {

  isLoggedIn(){
    return this._authService.isLoggedIn;
  }
  sitcoms !: Sitcom[];
  searchText!:string;

  constructor(private sitcomService:SitcomsDataService,private _authService:AuthenticationService) { }

  ngOnInit(): void {
    this.getSitcoms();
  }

  getSitcoms(){
    this.sitcomService.getSitcoms().subscribe(sitcoms=>{
      this.sitcoms = sitcoms;
      console.log(sitcoms);
  })}

  onDelete(sitcomId:any):void{
    this.sitcomService.deleteSitcom(sitcomId).subscribe(
      data=>{  
          console.log("Sitcom with id ", sitcomId ," deleted successfully.")
        alert("Sitcom deleted successfully.")
        console.log(data);},
      err=>{console.log(err)},
      ()=>{this.getSitcoms()}
    )
  }

  // onClick(): void {
  //   console.log("deleting game with id ", this.gameId)
  //   this.gamesData.deleteOne(this.gameId).subscribe(
  //     {
  //       next: () => {
  //         this.gamesData.getGames()
  //         this.route.navigate(["games"]).then(()=>this.gamesData.getGames())
  //       },
  //       error: err => console.log("Service Error:", err),
  //       complete: () => console.log("Game deleted",this.gameId)
  //     }
  //   )
  // }


}
