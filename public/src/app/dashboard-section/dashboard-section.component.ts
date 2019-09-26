import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dashboard-section',
  templateUrl: './dashboard-section.component.html',
  styleUrls: ['./dashboard-section.component.css']
})
// type SECTION_NAME = 'To-Do' | 'In-Progress' | 'Done';
export class DashboardSectionComponent implements OnInit {
  
  @Input() sectionName;
  @Output() switchTo: EventEmitter<{newTab: string, section: number, taskID?: string}>;
  
  tasks;
  showPlus: boolean;

  constructor(private _http: HttpClient) { 
    this.showPlus = false;
    this.switchTo = new EventEmitter<{newTab: string, section: number, taskID?: string}>();
  }

  ngOnInit() {
    if(this.sectionName === 'To-Do') {
      this.showPlus = true;
      this.fetchToDo();
    }
    else if(this.sectionName==='In-Progress'){
      this.fetchInProgress()
    }
    else{
      this.fetchDone();
    }
  }
  plusClicked(){
    this.switchTo.emit({newTab:'addTask', section:0})
  }
  

  goToTaskInfo(taskID: string){
    var section;
    switch (this.sectionName){
      case 'To-Do':
        section=0;
        break;
      case 'In-Progress':
        section=1;
        break;
      case 'Done':
        section=2;
        break;
      default:
        section='ERROR'
        break;
    }
    this.switchTo.emit({newTab:'taskInfo', section: section, taskID: taskID})
  }

  removeTask(taskID: string){
    var i;
    for(i=0; i<this.tasks.length; i++){
      if (this.tasks[i]._id===taskID){
        break;
      }
    }
    this.tasks.splice(i, 1);
    console.log("Recieved request for remove:", taskID)
  }

  fetchToDo(){
    this._http.get('/getTasks/todo').subscribe(data=>{
      console.log("Received response:", data);
      if(data['success'] === 1) {
        this.tasks=data['content']['tasks']
      }
    })
  }

  fetchInProgress(){
    this._http.get('/getTasks/inProgress').subscribe(data=>{
      console.log("Received response:", data);
      if(data['success'] === 1) {
        this.tasks=data['content']['tasks']
      }
    })
  }
  fetchDone(){
    this._http.get('/getTasks/done').subscribe(data=>{
      console.log("Received response:", data);
      if(data['success'] === 1) {
        this.tasks=data['content']['tasks']
      }
    })
  }
}
