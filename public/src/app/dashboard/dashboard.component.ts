import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  addPressed:boolean;
  constructor() {
    this.addPressed = false;
   }

  ngOnInit() {
  }
  switchListener({newTab:string, section:number}) {
    console.log("Received event");
  }

}
