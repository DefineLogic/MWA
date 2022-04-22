import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { SitcomsDataService } from '../sitcoms-data-service.service';
import { Sitcom } from '../sitcoms/sitcoms.component';

@Component({
  selector: 'app-sitcom',
  templateUrl: './sitcom.component.html',
  styleUrls: ['./sitcom.component.css']
})
export class SitcomComponent implements OnInit {
  isLoggedIn(){
    return this._authService.isLoggedIn;
  }
  sitcom:Sitcom = new Sitcom("","",0,0,0,"");
  constructor(private route:ActivatedRoute,private sitcomService:SitcomsDataService,private _authService:AuthenticationService){
  }

  ngOnInit(): void {
    const sitcomId = this.route.snapshot.params["sitcomId"];
    this.sitcomService.getSitcom(sitcomId).subscribe(
      data=>{
        console.log("Sitcom fetched successfully",data);
        this.sitcom = data;
      },
      err=>{console.log(err)},
      ()=>{}
    )
    } 
    
  
}
