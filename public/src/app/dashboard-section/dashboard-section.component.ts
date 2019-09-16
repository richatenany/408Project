import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-section',
  templateUrl: './dashboard-section.component.html',
  styleUrls: ['./dashboard-section.component.css']
})
// type SECTION_NAME = 'To-Do' | 'In-Progress' | 'DONE';
export class DashboardSectionComponent implements OnInit {
  
  @Input() sectionName;
  showPlus: boolean;

  constructor() { 
    this.showPlus = false;
  }

  ngOnInit() {
    if(this.sectionName === 'To-Do') {
      this.showPlus = true;
    }
  }

}
