import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSectionComponent } from './dashboard-section.component';
import { Component, Input } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('DashboardSectionComponent', () => {
  let component: DashboardSectionComponent;
  let fixture: ComponentFixture<DashboardSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule
      ],
      declarations: [ DashboardSectionComponent, TaskCardComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
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
