import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SitcomsDataService } from '../sitcoms-data-service.service';
import { Sitcom } from '../sitcoms/sitcoms.component';

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

  constructor(private formBuilder:FormBuilder,private sitcomService:SitcomsDataService,private router:Router) { 
    this.registrationForm = this.formBuilder.group({
      title: "",
      aired: "",
      imdbRating:"",
      totalSeasons: "",
      totalEpisodes: "",
      pTitle: "",
      pLocation: ""
    });
  }

  ngOnInit(): void {
  }

  register(registrationForm:FormGroup){
    console.log("Form Submitted");
    console.log(registrationForm.value);
    const newSitcom = {
      "title":registrationForm.value.title,
      "aired":registrationForm.value.aired,
      "imdbRating":registrationForm.value.imdbRating,
      "totalSeasons":registrationForm.value.totalSeasons,
      "totalEpisodes":registrationForm.value.totalEpisodes
    }
    const newProduction = {
      "productionTitle":registrationForm.value.pTitle,
      "location":registrationForm.value.pLocation
    }
    this.sitcomService.createSitcom(newSitcom).subscribe({
             next: (data) => {
              console.log("Data added",data);
              this.sitcomService.createProduction(newProduction,data._id).subscribe({
                next: (data) => { 
                  alert("Sitcom created successfully.")
                },
                error: err=>console.log(),
                complete: ()=>{
                  this.router.navigate(["sitcoms/",data._id]);
                }
              })
        },
        error: err => console.log("Service Error:", err),
        complete: () => {
      }
    })
  
  }

}
