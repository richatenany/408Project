import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.css']
})
export class TaskInfoComponent implements OnInit {

  @Input() taskID: string;
  
  constructor() { }

  ngOnInit() {
  }

}
