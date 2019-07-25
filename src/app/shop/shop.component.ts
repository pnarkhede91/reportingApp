import { Component,OnInit} from '@angular/core';
import { EmployeeService } from '../employees/employee.service';
//import { IEmployee } from './IEmployee';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';

import { PagerService } from '../_services/index';
import { BsModalService } from 'ngx-bootstrap/modal';
import {NgForm} from '@angular/forms';
//import {dateFormatPipe} from '../employees/datePipe';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
	providers:[EmployeeService]
})
export class ShopComponent implements OnInit {

 employeeData1:any[];
	selectedRecord:any[]=null;
	msg:string="No Record Found";
	resultStatus:boolean=false;
	id1='';
	name1='';
	// pager object
    pager: any = {};
	// paged items
    pagedItems: any[];
	
	allItems:any[];
	modalRef:any;
	modalRef1:any;
	result:any;
	
	
	deleteResult:any;
	
	
	constructor(private Eservice:EmployeeService)
	{
		
		//this.employeeData=this.Eservice.getemployeeData();
	}
	ngOnInit()
	{
		
		this.Eservice.getCompanyRecord().subscribe(
													(empData1)=>{this.employeeData1=empData1['bloodList']; 
																
													console.log(this.employeeData1);
																 
														},
												 error=>{
														this.msg="please try again";
												});
		
	

	
	}
	updateShopDetails(data:any):any{
		console.log(data.value);
		
		this.Eservice.updateShopDetails(data.value).subscribe(data=>{
			
			if(data['Sucess']=='Update Successfully')
			{
				// this.modalRef.hide();
			//	this.displayTable();
				this.resultStatus=true;
				
				
			}
			
			
		});
		
	}
	
	

}
