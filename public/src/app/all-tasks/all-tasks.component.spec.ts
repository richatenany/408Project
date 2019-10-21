import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { AllTasksComponent } from './all-tasks.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AllTasksComponent', () => {
  let component: AllTasksComponent;
  let fixture: ComponentFixture<AllTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      declarations: [ AllTasksComponent,
        TaskInfoComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTasksComponent);
    component = fixture.componentInstance;
    component.tasks=[{
      title: 'Test',
      _id: 'test123',
      category: 'Health',
      weight: 5,
      deadLine: '2020-01-19',
      dateCompleted: '2019-08-08'
    }]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have show task info when clicking on details', () => {
    spyOn(component, 'taskClicked');

    const button = fixture.debugElement.nativeElement.querySelector('a')
    button.click()
    fixture.whenStable().then(() => {
      expect(component.taskClicked('test123')).toHaveBeenCalled()
    })
  })
});

@Component({
  selector: 'app-task-info',
  template: ''
})
class TaskInfoComponent{
  @Input() taskID: string;
}
