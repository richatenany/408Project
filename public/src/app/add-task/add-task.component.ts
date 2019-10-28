import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  title:string;
  weight:number;
  category:string;
  description:string;
  date:string;

  @Output() switchBack: EventEmitter<{success: boolean}>;

  constructor(private _http: HttpClient) { 
    this.title=''
    this.weight=0;
    this.category='';
    this.description=''
    this.date=''
    this.switchBack = new EventEmitter<{success: boolean}>();
  }

  ngOnInit() {
  }
  cancelPressed(){
    return this.switchBack.emit({success: false});
  }
  donePressed(){
    this._http.post('/createTask',{title: this.title, weight: this.weight-1, category:this.category, desc: this.description, date: this.date}).subscribe(data=>{
      console.log("Received response:", data);
      if(data['success'] === 1) {
        return this.switchBack.emit({success: true});
      }
    })
    
  }

}
