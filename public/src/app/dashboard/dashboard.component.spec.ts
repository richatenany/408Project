import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
// import { DashboardSectionComponent } from '../dashboard-section/dashboard-section.component'
// import { AddTaskComponent } from '../add-task/add-task.component';
// import {TaskInfoComponent} from '../task-info/task-info.component'

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent,
      DashboardSectionComponent,
      AddTaskComponent,
      TaskInfoComponent
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
@Component({
  selector: 'app-dashboard-section',
  template: ''
})
class DashboardSectionComponent{}
@Component({
  selector: 'app-add-task',
  template: ''
})
class AddTaskComponent{}
@Component({
  selector: 'app-task-info',
  template: ''
})
class TaskInfoComponent{}
