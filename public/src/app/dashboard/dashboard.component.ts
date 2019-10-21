import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  addPressed:boolean;
  editPressed:boolean;
  sectionToSwitch: number;
  showingTaskID: string;
  title: string;
  weight: number;
  category: string;
  description: string;
  date: string;

  constructor(private _http: HttpClient) {
    this.addPressed = false;
    this.editPressed = false;
    this.sectionToSwitch = -1;
    this.showingTaskID = '';
    this.title = '';
    this.weight = -1;
    this.category = '';
    this.description = '';
    this.date = '';

  }

  ngOnInit() {
  }
  backListener(success:boolean){
    console.log("Received Event:", success);
    this.sectionToSwitch = -1;
  }

  switchListener(info: {newTab:string, section:number, taskID?:string, title?:string, weight?:number}) {
    const {newTab, section} = info;
    if(newTab === "addTask" && section === 0){
      this.addPressed = true;
      return;
    }
    //added tings
    if( newTab === "editTask"){
      console.log("EDIT PRESSED");
      console.log("info:", info);
      //this.editPressed = true;
      //this.showingTaskID = edit.taskID; // THIS SHOULD BE CHANGED FOR EDIT and look at dashboard.component.html to implement further for <app-edit-Task>
      this.showingTaskID = info.taskID;
      this.sectionToSwitch = section;
      this.title = info.title;
      //this.weight = info.weight;
      //this.category = info.taskInfo.category;
      //this.description = info.taskInfo.description;
      //this.date = info.taskInfo.date;
      
      return;
    }


    if(newTab === 'taskInfo' && info.taskID) {
      this.showingTaskID = info.taskID;
      this.sectionToSwitch = section;
    }
    if(newTab === 'exitInfo') {
      this.sectionToSwitch = -1;
    }
    
    console.log("Received event:", info);
  }

  switchBackListener(info: {success: boolean}){
    this.addPressed = false;
    this.sectionToSwitch = -1;
  }

}
