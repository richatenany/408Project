import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit {
  private _opened: boolean = false;

  private _toggleSidebar() {
    this._opened = !this._opened;
  }
  constructor() { }

  ngOnInit() {
  }

}
