import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSectionComponent } from './dashboard-section.component';
import { Component, Input } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DashboardSectionComponent', () => {
  let component: DashboardSectionComponent;
  let fixture: ComponentFixture<DashboardSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      declarations: [ DashboardSectionComponent, TaskCardComponent]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(DashboardSectionComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
    
  // });

  it('should create', () => {
    fixture = TestBed.createComponent(DashboardSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have plus on todo', ()=>{
    fixture = TestBed.createComponent(DashboardSectionComponent);
    component = fixture.componentInstance;
    component.sectionName = 'To-Do'
    fixture.detectChanges();
    expect(component.showPlus).toBe(true)
  })
  it('should not have plus on other section', ()=>{
    fixture = TestBed.createComponent(DashboardSectionComponent);
    component = fixture.componentInstance;
    component.sectionName = 'In-Progress'
    fixture.detectChanges();
    expect(component.showPlus).toBe(false)
  })
});



@Component({
  selector:'app-task-card',
  template:''
})
class TaskCardComponent{
  @Input() taskID:string;
  @Input() taskName: string;
  @Input() currentStatus: string;
  @Input() description: string
}
