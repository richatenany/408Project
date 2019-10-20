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
  @Input() fromSection?: number;
  @Input() category: string;
  
  task;
  @Output() returnToSection: EventEmitter<boolean>;

  constructor(private _http: HttpClient) { 
    this.returnToSection = new EventEmitter<boolean>();
  }
  
  
  ngOnInit() {
    this.fetchGetTasks();
  }
  fetchGetTasks() {
    this._http.post('/getTask', {taskID: this.taskID}).subscribe(data=>{
      console.log("Received response:", data);
      if(data['success'] === 1) {
        this.task=data['content']['tasks'][0];
      }
    })
  }
  backClicked(){
    this.returnToSection.emit(true);
    console.log("Back clicked");
  }
}
