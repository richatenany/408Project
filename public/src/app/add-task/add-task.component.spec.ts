import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AddTaskComponent } from './add-task.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[FormsModule, 
        HttpClientTestingModule
      ],
      declarations: [ AddTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the done function when the done button is pressed', ()=>{
    spyOn(component, 'donePressed');

    const button = fixture.debugElement.nativeElement.querySelector('#btn2')
    button.click()
    fixture.whenStable().then(() => {
      expect(component.donePressed()).toHaveBeenCalled()
    })
  })
  it('should call the cancel function when the done button is pressed', ()=>{
    spyOn(component, 'cancelPressed');

    const button = fixture.debugElement.nativeElement.querySelector('#btn1')
    button.click()
    fixture.whenStable().then(() => {
      expect(component.cancelPressed()).toHaveBeenCalled()
    })
  })
});
