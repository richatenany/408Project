import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TaskInfoComponent } from './task-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TaskInfoComponent', () => {
  let component: TaskInfoComponent;
  let fixture: ComponentFixture<TaskInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[FormsModule, 
        HttpClientTestingModule
      ],
      declarations: [ TaskInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskInfoComponent);
    component = fixture.componentInstance;
    component.task={};
    component.task.title='This is my task';
    component.task.desc='This is the description';
    component.taskID = 'test420ID';
    component.task.date='2020-01-19';
    component.task.category = 'Health';
    component.task.weight = 3;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
