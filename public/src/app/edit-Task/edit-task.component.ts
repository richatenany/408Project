import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  title:string;
  weight:number;
  category:string;
  description:string;
  date:string;
  @Input() taskID: string;


  @Output() switchTo: EventEmitter<{success: boolean}>;

  constructor(private _http: HttpClient) { 
    this.title=''
    this.weight=0;
    this.category='';
    this.description=''
    this.date=''
    this.switchTo = new EventEmitter<{success: boolean}>();
  }

  ngOnInit() {
    this.fetchTaskInfo()
  }
  cancelPressed(){
    return this.switchTo.emit({success: false});
  }
  donePressed(){
    this._http.post('/editTask',{title: this.title, weight: this.weight, category: this.category, desc: this.description, date: this.date, taskID: this.taskID}).subscribe(data=>{
      console.log("Received response:", data);
      if(data['success'] === 1) {
        return this.switchTo.emit({success: true});
      }
    })
    
  }
  fetchTaskInfo(){
    this._http.post('/getTask', {taskID: this.taskID}).subscribe(data=> {
      console.log("Data:", data)
      this.title = data['content']['tasks']['0'].title;
      this.weight = data['content']['tasks']['0'].weight;
      this.category = data['content']['tasks']['0'].category;
      this.description = data['content']['tasks']['0'].desc;
      this.date = data['content']['tasks']['0'].deadLine.substring(0,10);
    })
  }

}
