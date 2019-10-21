import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
//import { EditTaskComponent } from '../edit-task/edit-task.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        FormsModule
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
  selector: 'app-edit-task',
  template: ''
})
class EditTaskComponent {
  @Input() taskID: string;
}

@Component({
  selector: 'app-add-task',
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
