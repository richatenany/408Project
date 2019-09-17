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
  switchListener(info: {newTab:string, section:number}) {
    const {newTab, section} = info;
    if(newTab === "addTask" && section === 0){
      this.addPressed = true;
    }
    console.log("Received event:", info);
  }

}
