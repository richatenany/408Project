import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard-section',
  templateUrl: './dashboard-section.component.html',
  styleUrls: ['./dashboard-section.component.css']
})
// type SECTION_NAME = 'To-Do' | 'In-Progress' | 'DONE';
export class DashboardSectionComponent implements OnInit {
  
  @Input() sectionName;
  @Output() switchTo: EventEmitter<{newTab: string, section: number}>;

  showPlus: boolean;

  constructor() { 
    this.showPlus = false;
    this.switchTo = new EventEmitter<{newTab: string, section: number}>();
  }

  ngOnInit() {
    if(this.sectionName === 'To-Do') {
      this.showPlus = true;
    }
  }
  plusClicked(){
    this.switchTo.emit({newTab:'addTask', section:0})
  }

}
