import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { HeaderComponent } from './header/header.component';
import { DashboardSectionComponent } from './dashboard-section/dashboard-section.component';
import { TaskInfoComponent } from './task-info/task-info.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    HeaderComponent,
    DashboardSectionComponent,
    TaskInfoComponent,
    TaskCardComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
