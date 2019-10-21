import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'public';
  currentTab:string;

  constructor(private _http: HttpClient){
    this.currentTab='Dashboard';
  }

  ngOnInit(){
    console.log("Current Tab:", this.currentTab)
    this.checkLoggedIn();
  }
  changeTab(newTab:string) {
    console.log("New Tab:", newTab)
    this.currentTab = newTab
  }

  checkLoggedIn() {
    this._http.get('/isLoggedIn').subscribe(data => {
      if(data['loggedIn'] === false) {
        window.location.href = '/login';
      }
    })
  }
}
