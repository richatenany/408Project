import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskCardComponent } from './task-card.component';
import { By } from '@angular/platform-browser';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ TaskCardComponent ]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(TaskCardComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create', () => {
    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display the correct information', ()=>{
    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;

    component.taskName='This is my task'
    component.description='This is the description';
    component.currentStatus=0
    component.taskID = 'test420ID'

    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p.taskName').textContent).toContain("This is my task");
    expect(compiled.querySelector('p.taskDescription').textContent).toContain("This is the description");
    
  })

  it('should show call the remove function', () => {
    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    spyOn(component, 'removeClicked');

    const button = fixture.debugElement.nativeElement.querySelector('span')
    button.click()
    fixture.whenStable().then(() => {
      expect(component.removeClicked()).toHaveBeenCalled()
    })
  })
});
