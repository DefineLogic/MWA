import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup } from '@angular/forms';
import {  Router } from '@angular/router';
import { SitcomsDataService } from '../sitcoms-data-service.service';

@Component({
  selector: 'app-addSitcom',
  templateUrl: './addSitcom.component.html',
  styleUrls: ['./addSitcom.component.css']
})
export class AddSitcomComponent implements OnInit {
  addSitcomForm!: FormGroup;
  // constructor() { 
  //   this.registrationForm = new FormGroup({
  //     name: new FormControl("Jack"),
  //     username: new FormControl("a"),
  //     password: new FormControl("b"),
  //     repeatPassword: new FormControl("c")

  //   });
  // }

  constructor(private formBuilder:FormBuilder,private sitcomService:SitcomsDataService,private router:Router) {
    this.addSitcomForm = this.formBuilder.group({
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

  addSitcom(sitcomForm:FormGroup){
    console.log("Form Submitted");
    console.log(sitcomForm.value);
    const newSitcom = {
      "title":sitcomForm.value.title,
      "aired":sitcomForm.value.aired,
      "imdbRating":sitcomForm.value.imdbRating,
      "totalSeasons":sitcomForm.value.totalSeasons,
      "totalEpisodes":sitcomForm.value.totalEpisodes
    }
    const newProduction = {
      "productionTitle":sitcomForm.value.pTitle,
      "location":sitcomForm.value.pLocation
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
