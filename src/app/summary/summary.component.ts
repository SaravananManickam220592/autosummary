import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  url:string ='http://127.0.0.1:5000/abstract';
  summary:any=null;
  extractError = false;

  constructor(private http:HttpClient,private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  getSummary(urlForm:NgForm){
    var me=this;
    this.spinner.show();
    me.summary='';
    this.http.post(this.url,urlForm.value, { responseType: 'text'}).subscribe((res)=>{
      me.summary=res;
      this.spinner.hide();
    },(err)=>{
      console.log('Error');
      this.spinner.hide();
      me.extractError = true;
      setTimeout(function(){
        me.extractError = false;
      },3000);
    })
  }

}
