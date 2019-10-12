import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EditTaskComponent } from '../edit-Task/edit-task.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      declarations: [ DashboardComponent,
      DashboardSectionComponent,
      AddTaskComponent,
      //added Edit
      EditTaskComponent,
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
//added
class EditTaskComponent {}
@Component({
  selector: 'app-edit-task',
  template: ''
})
class AddTaskComponent{}
@Component({
  selector: 'app-task-info',
  template: ''
})
class TaskInfoComponent{
  @Input() taskID: string;
}
