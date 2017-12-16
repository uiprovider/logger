import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  titles:any=[];
  constructor(private http:Http){}
  ngOnInit(){
    this.requestQuery();    
  }
  requestQuery(){
    let headers = new Headers({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*' });
    let options = new RequestOptions({ headers: headers });
    this.http.get("http://localhost:3000/example")
    .map((response: Response)=>response.text())
    .subscribe(result=>{  
      // this.titles=result;
      // this.requestQuery();
    });
  }

  insertQuery(data:any){
    data=[{
      "address" : [ 
        { "name" : "one"}, 
        {"name" : "two"}, 
        {"name" : "three"}, 
        {"name" : "four"}
    ]
    }]
    // let headers = new Headers({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*' });
    // let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(data);
    this.http.post("http://localhost:5000/getuser?"+data,body)
    .map((response: Response)=>response.json())
    .subscribe(result=>{
      // this.titles=result;
      console.log(result);
      // this.requestQuery();
    });
  }
}
