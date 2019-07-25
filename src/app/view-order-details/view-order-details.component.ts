import { Component, OnInit,Input } from '@angular/core';
import { EmployeeService } from '../employees/employee.service';
//import { IEmployee } from './IEmployee';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';

import { PagerService } from '../_services/index';
import { BsModalService } from 'ngx-bootstrap/modal';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-view-order-details',
  templateUrl: './view-order-details.component.html',
  styleUrls: ['./view-order-details.component.css'],
	providers:[EmployeeService]
	
})
export class ViewOrderDetailsComponent implements OnInit  {

 
	//employeeData:IEmployee[]=null;
	companyList:any[]=null;
	productList:any[]=null;
	tempCart:any[]=null;
	total:any;
	
	msg:string="No Record Found";
	loginData:any;
	loginUserId:any;
	tproduct_id:any;
	tcompany_id:any;
	qty:any;
	btnStatus:any=false;
	employeeData1:any;
		// pager object
    pager: any = {};
	// paged items
    pagedItems: any[];
	
	allItems:any[];
	modalRef:any;
	//total:any=0;
	
	@Input() selectedRecord : any;  

	
	
	constructor(private Eservice:EmployeeService,private route:ActivatedRoute,private pagerService: PagerService,private modalService: BsModalService)
	{
		
		//this.employeeData=this.Eservice.getemployeeData();
	}
	ngOnInit()
	{
	
		
		
		/*
		for(let i=0; i < this.selectedRecord.length; i++)
		{
			this.total +=this.selectedRecord[i]['cod_qty'] * this.selectedRecord[i]['cod_rate'];
		}
		*/
	
	}
	get_total(){
		this.total=0;
		for(let i=0; i < this.selectedRecord.length; i++)
		{
			this.total +=this.selectedRecord[i]['cod_qty'] * this.selectedRecord[i]['cod_rate'];
		}
		return this.total;
	}


}