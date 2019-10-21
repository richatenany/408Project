import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-Task/edit-task.component';
import { HeaderComponent } from './header/header.component';
import { DashboardSectionComponent } from './dashboard-section/dashboard-section.component';
import { TaskInfoComponent } from './task-info/task-info.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { StatsComponent } from './stats/stats.component';



@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    EditTaskComponent,
    HeaderComponent,
    DashboardSectionComponent,
    TaskInfoComponent,
    TaskCardComponent,
    DashboardComponent,
    AllTasksComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
