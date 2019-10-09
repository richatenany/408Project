import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'public';
  currentTab:string;

  constructor(){
    this.currentTab='Dashboard';
  }

  ngOnInit(){
    console.log("Current Tab:", this.currentTab)
  }
  changeTab(newTab:string) {
    console.log("New Tab:", newTab)
    this.currentTab = newTab
  }
}
