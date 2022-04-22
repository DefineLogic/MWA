import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { Credentials } from '../login/login.component';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hasSuccess = false;
  hasError = false;
  registrationForm!: FormGroup;
  credentials !: Credentials;
  // constructor() { 
  //   this.registrationForm = new FormGroup({
  //     name: new FormControl("Jack"),
  //     username: new FormControl("a"),
  //     password: new FormControl("b"),
  //     repeatPassword: new FormControl("c")

  //   });
  // }

  constructor(private formBuilder:FormBuilder, private userService:UsersService) { 
    this.registrationForm = this.formBuilder.group({
      name: ["",Validators.required],
      username: ["",Validators.required],
      password: ["",Validators.required],
      repeatPassword: ["",Validators.required],
    });
  }

  ngOnInit(): void {
  }

  register(registrationForm:FormGroup){
    console.log("Form Submitted");
    console.log(registrationForm.value);
    const users = {
      name: registrationForm.value.name,
      username: registrationForm.value.username,
      password: registrationForm.value.password,
    }
    this.userService.addUser(users).subscribe(
      data=>{alert("Added user successfully.")
        console.log(data);},
      err=>{console.log(err)},
      ()=>{}
    );
    // this.userService.registerUser(users).then(data=>{
    //   console.log("Registered User",data)
    //   this.credentials = data;
    //   this.hasSuccess = true
    // });
  
  }


}
