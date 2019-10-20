import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() currentTab:string;
  @Output() changeTab: EventEmitter<string>;

  constructor() {
    this.changeTab = new EventEmitter<string>();
  }

  ngOnInit() {
    console.log("CurrentTab:", this.currentTab)
  }
  sectionClicked(newSection: string) {
    console.log("Clicking on section:", newSection)
    return this.changeTab.emit(newSection)
  }
}
