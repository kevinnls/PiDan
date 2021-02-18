import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: HttpClient){
    if(this.on == false){
      this.status = "The light is off";
    }
    else{
      this.status = "The light is ON"
    }
  }

  status: string = "";
  title = 'PiDan';

  on:boolean = false;

  switchOn(){
    this.on = true;
    this.http.post<{message: string}>("http://localhost:3000/lights", this.status).subscribe((response) => {
      console.log(response)
    })
    this.status = "The light is ON"
  }

  switchOff(){
    this.on = true;
    this.http.post("http://localhost:3000/lights", this.status).subscribe(() => {

    })
    this.status = "The light is OFF"
  }
}
