import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit {
  @Input() taskName: string;
  @Input() description: string;
  @Input() currentStatus: string;
  // @Input() taskID: string
  taskID: string

  @Output() goToTask: EventEmitter<string>;

  constructor() { 
    this.goToTask = new EventEmitter<string>();
    this.taskID='abc123';
  }

  ngOnInit() {
  }

  taskClicked(){
    this.goToTask.emit(this.taskID);
  }

}
