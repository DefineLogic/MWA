import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SitcomsDataService } from '../sitcoms-data-service.service';
import { Sitcom } from '../sitcoms/sitcoms.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  editForm!: FormGroup;
  sitcom!:Sitcom ;
  
  constructor(private formBuilder:FormBuilder,private route:ActivatedRoute,private router:Router,
    private sitcomService:SitcomsDataService) { 
      this.editForm = this.formBuilder.group({
        title: "",
        aired: "",
        imdbRating:"",
        totalSeasons: "",
        totalEpisodes: "",
        pTitle: "",
        pLocation: ""
      });

      const sitcomId = this.route.snapshot.params["sitcomId"];
      this.sitcomService.getSitcom(sitcomId).subscribe(
        data=>{
          console.log("Sitcom fetched successfully",data);
          this.sitcom = data;
          this.editForm.controls['title'].setValue(data.title);
          this.editForm.controls['aired'].setValue(data.aired);
          this.editForm.controls['imdbRating'].setValue(data.imdbRating);
          this.editForm.controls['totalSeasons'].setValue(data.totalSeasons);
          this.editForm.controls['totalEpisodes'].setValue(data.totalEpisodes);
          this.editForm.controls['pTitle'].setValue(data.production.productionTitle);
          this.editForm.controls['pLocation'].setValue(data.production.location);
          console.log("After set data",this.editForm.value)
        },
        err=>{console.log(err)},
        ()=>{}
      )
      
  }

  ngOnInit(): void {

    } 

    edit(editForm:FormGroup){
      console.log("Form Submitted");
      console.log(editForm.value);
      const editedSitcom = {
        "title":editForm.value.title,
        "aired":editForm.value.aired,
        "imdbRating":editForm.value.imdbRating,
        "totalSeasons":editForm.value.totalSeasons,
        "totalEpisodes":editForm.value.totalEpisodes
      }
      const newProduction = {
        "productionTitle":editForm.value.pTitle,
        "location":editForm.value.pLocation
      }
      this.sitcomService.updateSitcom(editedSitcom,this.sitcom._id).subscribe({
               next: (data) => {
                console.log("Data added",data);
                this.sitcomService.updateProduction(newProduction,data._id).subscribe({
                  next: (data) => { 
                    alert("Sitcom data updated successfully.")
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
