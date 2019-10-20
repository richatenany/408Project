//import { Component, OnInit, Input } from '@angular/core';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.css']
})
export class TaskInfoComponent implements OnInit {

  @Input() taskID: string;
  
  tasks;
  

  constructor(private _http: HttpClient) { 
  }

  
  
  ngOnInit() {
    this.fetchGetTasks();
  }
  fetchGetTasks() {
    this._http.post('/getTask', {taskID: this.taskID}).subscribe(data=>{
      console.log("Received response:", data);
      if(data['success'] === 1) {
        this.tasks=data['content']['tasks'];
      }
    })
  }
}
