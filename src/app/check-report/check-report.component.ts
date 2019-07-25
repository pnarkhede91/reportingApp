import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employees/employee.service';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';
import { PagerService } from '../_services/index';
import { BsModalService } from 'ngx-bootstrap/modal';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-check-report',
  templateUrl: './check-report.component.html',
  styleUrls: ['./check-report.component.css']
})
export class CheckReportComponent implements OnInit {
	
	loginData:any;
	loginId:any;
	tempFarmerRecord:any;
	msg:string;

  constructor(private Eservice:EmployeeService,private route:ActivatedRoute,private pagerService: PagerService,private modalService: 	BsModalService) { }

  ngOnInit() {
	  
	  this.loginData = JSON.parse(localStorage.getItem('login_user'));
	  this.loginId=this.loginData["login_id"];
	  this.checkReportList();
  }
	
	checkReportList():any{
		
		
		
		this.Eservice.checkReportList(this.loginId).subscribe((data)=>{
			if(data['result']=='success')
			{
				this.tempFarmerRecord=data['data']; 
			
			}
		},
			error=>{
						this.msg="please try again";
					}
		);
		//console.log(data);
	}
		

}
