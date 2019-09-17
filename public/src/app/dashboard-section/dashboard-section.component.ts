import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard-section',
  templateUrl: './dashboard-section.component.html',
  styleUrls: ['./dashboard-section.component.css']
})
// type SECTION_NAME = 'To-Do' | 'In-Progress' | 'Done';
export class DashboardSectionComponent implements OnInit {
  
  @Input() sectionName;
  @Output() switchTo: EventEmitter<{newTab: string, section: number, taskID?: number}>;

  showPlus: boolean;

  constructor() { 
    this.showPlus = false;
    this.switchTo = new EventEmitter<{newTab: string, section: number, taskID?: number}>();
  }

  ngOnInit() {
    if(this.sectionName === 'To-Do') {
      this.showPlus = true;
    }
  }
  plusClicked(){
    this.switchTo.emit({newTab:'addTask', section:0})
  }

  goToTaskInfo(taskID: number){
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
}
