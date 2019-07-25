import { Component,OnInit} from '@angular/core';
import { EmployeeService } from './employee.service';
//import { IEmployee } from './IEmployee';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';

import { PagerService } from '../_services/index';
import { BsModalService } from 'ngx-bootstrap/modal';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers:[EmployeeService]
})
export class EmployeesComponent implements OnInit {

  firstname:string="Prakash";
	lastname:string="Narkhede";
	salary:number=50000;
	department:string="Computer";
	btnText:string="Show Details";
	showDetails:boolean=false;
	//employeeData:IEmployee[]=null;
	employeeData1:any[]=null;
	selectedRecord:any[]=null;
	msg:string="No Record Found";
	id1='';
	name1='';
	// pager object
    pager: any = {};
	// paged items
    pagedItems: any[];
	
	allItems:any[];
	modalRef:any;
	
	
	deleteResult:any;
	
	
	constructor(private Eservice:EmployeeService,private route:ActivatedRoute,private pagerService: PagerService,private modalService: BsModalService)
	{
		
		//this.employeeData=this.Eservice.getemployeeData();
	}
	ngOnInit()
	{
		//this.id1=this.route.params.id1;
		//this.name1=this.route.params.name1;
		this.route.params.forEach((params: Params) => 
		{
      			this.id1 = params['id1'];
     			this.name1 = params['name1'];
 		});
 
		this.Eservice.getemployeeData1().subscribe(
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


	empName():string{
		
		return this.firstname+' '+this.lastname;
		
	}
	selectData(emp1:any,template:any):any{
		
		this.selectedRecord=emp1;
		this.modalRef = this.modalService.show(template);
		
	}
	NewEmployee(template1:any):any{
		
		let config = { backdrop: true, ignoreBackdropClick: true };
		
		this.modalRef = this.modalService.show(template1, config);
		
	}
	RemoveEmployee(employee_id:any):any{
		
		this.Eservice.deleteEmployee(employee_id).subscribe(data=>{this.deleteResult=data; });
																
	}
	searchDataFilter(searchData: NgForm)
	{
		let cname=searchData.value.cname;
		let cmobile=searchData.value.cmobile;
		this.Eservice.searchDataFilter(cname,cmobile).subscribe((empData1)=>{this.employeeData1=empData1['bloodList']; 
																			this.allItems = empData1['bloodList'];
																			this.setPage(1);

																				}
		
																);
		
	}
	
	
	displayTable():void{
		
		this.showDetails=!this.showDetails;
		this.btnText=this.showDetails==true?"Hide Details":"Show Details";
		
		
	}
	

}
