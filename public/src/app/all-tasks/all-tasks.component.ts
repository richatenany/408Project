import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit {
  tasks;
  selectedTask: string;
  constructor(private _http: HttpClient) {
    this.selectedTask="-1";
   }

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks(){
    this._http.get('/getTasks/all_done').subscribe(data => {
      if(data['success'] === 1){
        this.tasks=data['content']['tasks'];
      }
    })
  }

  taskClicked(taskID: string){
    this.selectedTask = taskID === this.selectedTask ? '-1' : taskID;
  }

}
