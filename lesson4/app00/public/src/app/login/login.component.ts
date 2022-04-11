import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

class Credentials {
  username!:string;
  password!:string;
  constructor(username:string,password:string){
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

  @ViewChild('loginForm')
  loginForm!:NgForm;

  constructor() { 
    this.credentials = new Credentials("Jack","Harper");
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
    console.log(loginForm.value)
  }

}
