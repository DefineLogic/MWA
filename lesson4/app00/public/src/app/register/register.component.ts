import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm!: FormGroup;
  // constructor() { 
  //   this.registrationForm = new FormGroup({
  //     name: new FormControl("Jack"),
  //     username: new FormControl("a"),
  //     password: new FormControl("b"),
  //     repeatPassword: new FormControl("c")

  //   });
  // }

  constructor(private formBuilder:FormBuilder) { 
    this.registrationForm = this.formBuilder.group({
      name: "jack ma",
      username: "jack123",
      password: "password1",
      repeatPassword: "password1"
    });
  }

  ngOnInit(): void {
  }

  register(registrationForm:FormGroup){
    console.log("Form Submitted");
    console.log(registrationForm.value);
  }

}
