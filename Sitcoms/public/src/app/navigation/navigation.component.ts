import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isLoggedIn(){
    return this._authService.isLoggedIn;
  }
  constructor(private _router:Router,private _authService:AuthenticationService) { }

  ngOnInit(): void {
  }

  onHome():void{
    this._router.navigate(['']);
  }

  onSitcoms():void{
    this._router.navigate(["sitcoms"]);
  }

  onAddSitcom():void{
    this._router.navigate(["addsitcom"]);
  }

  onRegisterUser():void{
    this._router.navigate(["register"]);
  }

}
