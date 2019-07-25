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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
	providers:[EmployeeService]
})
export class ProductComponent implements OnInit {

  employeeData1:any[]=null;
	selectedRecord:any[]=null;
	msg:string="No Record Found";
	imgFile:File=null;
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
	companyList:any[];
	deleteResult:any;
	constructor(private Eservice:EmployeeService,private route:ActivatedRoute,private pagerService: PagerService,private modalService: BsModalService)
	{
		
		//this.employeeData=this.Eservice.getemployeeData();
	}
	ngOnInit()
	{
		this.imgFile=null;
		
		this.Eservice.getProductList().subscribe(
													(empData1)=>{this.employeeData1=empData1['bloodList']; 
																this.allItems = empData1['bloodList'];
													 			this.setPage(1);
																
											
														},
												 error=>{
														this.msg="please try again";
												});
	
		this.Eservice.getProductCompany().subscribe((data)=>{this.companyList=data['bloodList']; 
																
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

	selectData(emp1:any,template:any):any{
		
		this.selectedRecord=emp1;
		this.modalRef = this.modalService.show(template);
		
	}
	new_staff_add(template1:any):any{
		this.imgFile=null;
		let config = { backdrop: true, ignoreBackdropClick: true };
		
		this.modalRef1 = this.modalService.show(template1, config);
		 
		
	}
	updateData(data:any,template:any):any{
		this.selectedRecord=data;
		this.imgFile=null;
		let config = { backdrop: true, ignoreBackdropClick: true };
		
		this.modalRef = this.modalService.show(template, config);
		
	}
	editNewStaff(data:any,template:any):any{
		console.log(data.value);
		var formData: FormData = new FormData();
		
    	formData.append("image", this.imgFile);
		formData.append("product_name", data.value.product_name);
		formData.append("product_rate", data.value.product_rate);
		formData.append("fk_comp_id", data.value.fk_comp_id);
		formData.append("product_id", data.value.product_id);
		
		this.Eservice.editProduct(formData).subscribe(data=>{
			
			if(data['Sucess']=='Update Successfully')
			{
				 this.modalRef.hide();
				this.displayTable();
			}
			
		})
	}
	
	
	
	
	
	RemoveStaff(employee_id:any):any{
		
		this.Eservice.RemoveProduct(employee_id).subscribe(data=>{this.deleteResult=data; 
															   
															   if(data['Sucess']=='Remove Sucessfully')
																{
																	 this.displayTable();
																}
															   
															   });
																
	}
	searchDataFilter(searchData: NgForm)
	{
		let cname=searchData.value.cname;
		let comp_id=searchData.value.comp_id;
		this.Eservice.searchProductFilter(cname,comp_id).subscribe((empData1)=>{this.employeeData1=empData1['bloodList']; 
																			this.allItems = empData1['bloodList'];
																			this.setPage(1);
																			}
		
																);
		
	}
	addNewStaff(data:any,template1:any){
	
		var formData: FormData = new FormData();
    	formData.append("image", this.imgFile);
		formData.append("product_name", data.value.product_name);
		formData.append("product_rate", data.value.product_rate);
		formData.append("fk_comp_id", data.value.fk_comp_id);
		console.log(formData);
		
	/*
		  var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", (ev: ProgressEvent) => {
        //You can handle progress events here if you want to track upload progress (I used an observable<number> to fire back updates to whomever called this upload)
    });
    xhr.open("post", "http://localhost/web_services/upload.php", true);
    xhr.send(formData);
		
		*/
	
		
		
		this.Eservice.addNewProduct(formData).subscribe((data1)=>{this.result=data1;
																  
																  //console.log(data1.Sucess);
																   if(data1['Sucess']=='One Record sucessfully insereted.')
																	  {
																		   this.modalRef1.hide();
																		   this.displayTable();
																	  }
																 }
														
														);
		
		
	}
	
	
	displayTable():void{
		
		 this.Eservice.getProductList().subscribe((empData1)=>{this.employeeData1=empData1['bloodList']; 
															 this.allItems = empData1['bloodList'];
															 this.setPage(1);
															},
															error=>{
																		this.msg="please try again";
																	});
		
		
	}
	
	fileChanged(e: Event) {
    var target: HTMLInputElement = e.target as HTMLInputElement;
    for(var i=0;i < target.files.length; i++) {
        //this.upload(target.files[i]);
		this.imgFile=target.files[i];
    }
		}
	

}
