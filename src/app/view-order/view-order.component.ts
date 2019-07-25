import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employees/employee.service';
//import { IEmployee } from './IEmployee';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';

import { PagerService } from '../_services/index';
import { BsModalService } from 'ngx-bootstrap/modal';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css','../../../node_modules/bootstrap/dist/css/bootstrap.min.css'],
  providers:[EmployeeService]
})
export class ViewOrderComponent implements OnInit  {

 
	//employeeData:IEmployee[]=null;
	companyList:any[]=null;
	productList:any[]=null;
	tempCart:any[]=null;
	selectedRecord:any[]=null;
	msg:string="No Record Found";
	loginData:any;
	loginUserId:any;
	tproduct_id:any;
	tcompany_id:any;
	qty:any;
	btnStatus:any=false;
		// pager object
    pager: any = {};
	// paged items
    pagedItems: any[];
	
	allItems:any[];
	modalRef:any;
	orderId:any;
	employeeData1:any;
	showDetails:any=false;
	
	constructor(private Eservice:EmployeeService,private route:ActivatedRoute,private pagerService: PagerService,private modalService: BsModalService)
	{
		
		//this.employeeData=this.Eservice.getemployeeData();
	}
	ngOnInit()
	{
	
		this.loginData = JSON.parse(localStorage.getItem('login_user'));
		this.loginUserId=this.loginData[0]["user_id"];
		
			this.Eservice.getOrderList(this.loginUserId).subscribe(
													(empData1)=>{this.employeeData1=empData1['bloodList']; 
																this.allItems = empData1['bloodList'];
													 			this.setPage(1);
											
														},
												 error=>{
														this.msg="please try again";
												});
		
		
			
	
	}
	 setPage(page: number) {
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page);

        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
	
	viewOrder(orderId:any)
	{
		this.showDetails=false;
		alert(orderId);
		this.orderId=orderId;
		this.showDetails=true;
			this.Eservice.getOrderListDetails(orderId).subscribe(
													(empData1)=>{this.selectedRecord=empData1['bloodList']; 
																
														},
												 error=>{
														this.msg="please try again";
												});
	}


}