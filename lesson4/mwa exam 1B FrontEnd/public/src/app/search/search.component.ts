import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ShipsDataService } from '../ships-data.service';
import { Ship } from '../ships/ships.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  ships!:Ship[];
  searchForm!:FormGroup;
  constructor(private formBuilder:FormBuilder,private shipService:ShipsDataService,private router:Router) { 
    
    this.searchForm = this.formBuilder.group({
      latitude:"",
      longitude:"",
      distance:""
    })

  }
  ngOnInit(): void {
  
  }

  onSubmit(searchForm:FormGroup){
    const lat = this.searchForm.value.latitude;
    const long = this.searchForm.value.longitude;
    const distance = this.searchForm.value.distance;
    console.log("lat long dist",lat,long,distance)
    this.shipService.getShipByGeoSearch(long,lat,distance).subscribe(
      data=>{
        this.ships = data;
        console.log("Found ships",data);
      },
      err=>{},
      ()=>{}
    )
  }


}
