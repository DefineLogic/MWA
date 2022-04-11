import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {

  _rating!:number;
  stars!:number[];
  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  set rating(rating:number){
    this._rating = rating;
    this.stars = new Array<number>(rating);
  }

  
}
