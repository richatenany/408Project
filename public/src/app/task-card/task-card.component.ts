import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { stringify } from 'querystring';
import { $ } from 'protractor';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit {
  @Input() taskName: string;
  @Input() description: string;
  @Input() currentStatus: number;
  @Input() taskID: string
  @Input() category: string;

  //added
  @Input() weight: number;
  @Input() date: string;

  @Output() goToTask: EventEmitter<string>;
  @Output() removeTask: EventEmitter<string>;
  @Output() goToEditTask: EventEmitter<string>;
  @Output() switchTo: EventEmitter<{newTab: string, section: number, taskID?: string}>;

  constructor(private _http: HttpClient) { 
    this.goToTask = new EventEmitter<string>();
    this.goToEditTask = new EventEmitter<string>();
    this.removeTask =  new EventEmitter<string>();
    this.switchTo = new EventEmitter<{newTab: string, section: number, taskID?: string}>();
    
  }
  
  ngOnInit() {
    //this.date = this.date.substring(0,4);
    //this.date = this.date.substring(5,7);
    //console.log("what is the point of this");
    //this.dateToString(this.date);
    var newDate;
    var day;
    var year;
    var month;
    day = this.date.substring(8,10);
    year = this.date.substring(0,4);
    month = this.date.substring(5,7);

    var d = new Date();
    if(d.getFullYear() == year || d.getMonth() == month || d.getDay() == day){
      console.log("WARNING SIGN HAS BEEN TRIGGERED");
      document.getElementById("warning").classList.add("hidden");
      //  let currEl = document.querySelector("div").closest("#warning").classList.add('.hidden');
      let el = document.querySelector("span").closest("#warning")
      console.log(el);
      // $(".card").closest('#warning').addClass('hidden');
      // let el = document.getElementById("remove")
      // if(el != undefined){
      //   console.log("WHAT");
      //   el.classList.add(".hidden");
      //   console.log("CLASS HIDDEN");

      // }
      
    }

    if(this.date.substring(5,7) == "01"){
        newDate = "January ";
    }
    if(this.date.substring(5,7) == "02"){
      newDate = "February ";
    }
    if(this.date.substring(5,7) == ("03")){
      newDate = "March ";
    }
    if(this.date.substring(5,7) == "04"){
      newDate = "April ";
    }
    if(this.date.substring(5,7) == "05"){
      newDate = "May ";
    }
    if(this.date.substring(5,7) == "06"){
      newDate = "June ";
    }
    if(this.date.substring(5,7) == "07"){
      newDate = "July ";
    }
    if(this.date.substring(5,7) == "08"){
      newDate = "August ";
    }
    if(this.date.substring(5,7) == "09"){
      newDate = "September ";
    }
    if(this.date.substring(5,7) == "10"){
      newDate = "October ";
    }
    if(this.date.substring(5,7) == "11"){
      newDate = "November ";
    }
    if(this.date.substring(5,7) == "12"){
      newDate = "December ";
    }
    newDate = newDate.concat(day);
    newDate = newDate.concat(", ");
    newDate = newDate.concat(year);
    console.log("OVER HERE FAM CHECK IT");
    console.log(newDate);
    this.date = newDate;

  }

  taskClicked(){
    this.goToTask.emit(this.taskID);
  }

  getClassFromDate(date: Date) {
    console.log("hello");
    console.log(date);
    let curDate = new Date(date);
    let today = new Date();
    let tomorrow = new Date ();
    tomorrow.setDate(today.getDate()+1);
    tomorrow.setHours(0,0,0,0);
    let year = curDate.getFullYear();
    let month = curDate.getMonth();
    // let day = curDate.getDay();


    console.log(month);
    console.log(year);
    console.log("BELOW IS THE DATE");
    console.log(curDate);
    console.log(tomorrow)
    if(curDate.getTime() == tomorrow.getTime() || curDate.getTime() == today.getTime()){
      console.log("yuh")
      return '';
    }
    else{
      return 'hidden';
    }

    // return '';
    
    }
 

  removeClicked(){
    const doIt = confirm("Are you sure you want to delete this task?")
    if(doIt){
      this._http.post('/removeTask', {_id: this.taskID}).subscribe(data=>{
        console.log("Received response from remove:", data)
        if(data['success'] === 1){
          this.removeTask.emit(this.taskID);
        }
      })
    }
  }
  editClicked(){
    this.goToEditTask.emit(this.taskID);
  }
  statusChanged(newValue: number){
    this._http.post('/changeStatus', {taskID: this.taskID, status: newValue}).subscribe(data=>{
      console.log('Received status change response:', data)
      if(data['success']===1){
        window.location.reload();
      }
    })
  }
  
  
}


