import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { EditTaskComponent } from './edit-task.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EditTaskComponent', () => {
  let component: EditTaskComponent;
  let fixture: ComponentFixture<EditTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[FormsModule, 
        HttpClientTestingModule
      ],
      declarations: [ EditTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should edit', () => {
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