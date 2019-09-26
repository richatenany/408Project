import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit {
  @Input() taskName: string;
  @Input() description: string;
  @Input() currentStatus: number;
  @Input() taskID: string

  @Output() goToTask: EventEmitter<string>;
  @Output() removeTask: EventEmitter<string>;

  constructor(private _http: HttpClient) { 
    this.goToTask = new EventEmitter<string>();
    this.removeTask =  new EventEmitter<string>();
  }

  ngOnInit() {
  }

  taskClicked(){
    this.goToTask.emit(this.taskID);
  }
  removeClicked(){
    const doIt = confirm("Are you sure you want to delete this task?")
    if(doIt){
      this._http.post('/removeTask', {_id: this.taskID}).subscribe(data=>{
        console.log("Received response from remove:", data)
        if(data['success'] === 1){
          this.removeTask.emit(this.taskID);
        }
      })
    }
  }

  statusChanged(newValue: number){
    this._http.post('/changeStatus', {taskID: this.taskID, status: newValue}).subscribe(data=>{
      console.log('Received status change response:', data)
      if(data['success']===1){

      }
    })
  }

}
