import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { response } from 'express';
import { environment } from 'src/environments/environment';
import { UsersService } from '../users.service';

export class Credentials {
  name!:string;
  username!:string;
  password!:string;
  constructor(name:string,username:string,password:string){
    this.name = name;
    this.password = password;
    this.username = username;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials!:Credentials;
  #name!:string;

  set name(name){this.#name = name};
  get name(){
    const token:string = localStorage.getItem(environment.token_storage_key) as string;
    this.#name = this._jwtHelperService.decodeToken(token).name;
    return this.#name};


  @ViewChild('loginForm')
  loginForm!:NgForm;

  constructor(private _userService:UsersService, private _jwtHelperService:JwtHelperService) { 
    this.credentials = new Credentials("Jack Harper","Jack","Harper");
  }

  ngOnInit(): void {
    this.loginForm.setValue(this.credentials);
    console.log("foooorm",this.loginForm);
    setTimeout(() => {
      this.loginForm.setValue(this.credentials);
    }, 0);
  }

  login(loginForm:NgForm){
    console.log("login method");
    console.log(loginForm.value);
     const newCredentials = new Credentials("",this.loginForm.value.username, this.loginForm.value.password);
    this._userService.login()
    localStorage.setItem(environment.token_storage_key,loginResponse.token)
    const token:string = localStorage.getItem(environment.token_storage_key) as string;
    this.name = this._jwtHelperService.decodeToken(token).name;
  }

}
