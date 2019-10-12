import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
 //   @Input() sectionName;
 //   @Output() switchTo: EventEmitter<{newTab: string, section: number, taskID?: string}>;

//   title:string;
//   weight:number;
//   category:string;
//   description:string;
//   date:string;
    @Input() title:string;
    @Input() weight:number;
    @Input() category:string;
    @Input() description:string;
    @Input() date:string;


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
  }
  cancelPressed(){
    return this.switchTo.emit({success: false});
  }
  donePressed(){
    this._http.post('/createTask',{title: this.title, weight: this.weight, category:this.category, desc: this.description, date: this.date}).subscribe(data=>{
      console.log("Received response:", data);
      if(data['success'] === 1) {
        return this.switchTo.emit({success: true});
      }
    })
    
  }

}