import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClientModule
      ],
      declarations: [
        AppComponent, 
        HeaderComponent, 
        DashboardComponent,
        AllTasksComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

@Component({
  selector: 'app-dashboard',
  template: ''
})
class DashboardComponent {
}

@Component({
  selector: 'app-header',
  template: ''
})
class HeaderComponent{
  @Input() currentTab:string;
}

@Component({
  selector: 'app-all-tasks',
  template: ''
})
class AllTasksComponent{}
