import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  addPressed:boolean;
  sectionToSwitch: number;
  showingTaskID: string;
  toDo:Object;
  inProgress:Object
  done:Object

  constructor(private _http: HttpClient) {
    this.addPressed = false;
    this.sectionToSwitch = -1;
    this.showingTaskID = '';
  }

  ngOnInit() {
  }

  switchListener(info: {newTab:string, section:number, taskID?:string}) {
    const {newTab, section} = info;
    if(newTab === "addTask" && section === 0){
      this.addPressed = true;
      return;
    }
    if(newTab === 'taskInfo' && info.taskID) {
      this.showingTaskID = info.taskID;
      this.sectionToSwitch = section;
    }
    
    console.log("Received event:", info);
  }

  switchBackListener(info: {success: boolean}){
    this.addPressed = false;
  }

}
