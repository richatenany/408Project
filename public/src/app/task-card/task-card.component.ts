import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit {
  @Input() taskName: string;
  @Input() description: string;
  @Input() currentStatus: string;
  constructor() { }

  ngOnInit() {
  }

}
