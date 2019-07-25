import { Component,OnInit} from '@angular/core';
import { EmployeeService } from '../employees/employee.service';
//import { IEmployee } from './IEmployee';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';

import { PagerService } from '../_services/index';
import { BsModalService } from 'ngx-bootstrap/modal';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css'],
  providers:[EmployeeService]
})
export class NewOrderComponent implements OnInit {

 
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
	
	
	constructor(private Eservice:EmployeeService,private route:ActivatedRoute,private pagerService: PagerService,private modalService: BsModalService)
	{
		
		//this.employeeData=this.Eservice.getemployeeData();
	}
	ngOnInit()
	{
	
 	this.loginData = JSON.parse(localStorage.getItem('login_user'));
	this.loginUserId=this.loginData[0]["user_id"];
		
		
			this.Eservice.getProductCompany().subscribe((data)=>{this.companyList=data['bloodList']; 
																
														},
												 error=>{
														this.msg="please try again";
												});
		
			this.Eservice.getProductList().subscribe((data)=>{this.productList=data['bloodList']; 
																
														},
												 error=>{
														this.msg="please try again";
												});
		
			this.readCartData();
		
			
	
	}
	saveToCart(data:any):void{
		
		if(data.value.comp_id !="" && data.value.product_id !="" && data.value.qty !=0)
		{
			
			var formData: FormData= new FormData();
			formData.append("comp_id",data.value.comp_id);
			formData.append("product_id",data.value.product_id);
			formData.append("qty",data.value.qty);
			formData.append("loginUserId",this.loginUserId);
			
			this.Eservice.saveToCart(formData).subscribe((data)=>{
				
			
													if(data['Sucess']=='One Record sucessfully insereted.')
													{
														this.readCartData();
														this.tproduct_id="";
														this.tcompany_id="";
														this.qty=0;
														
													}
				
										
														},
													 error=>{
														this.msg="please try again";
												});
		}
		
	}
	changeProduct(company_id:any):void{
		
		
		this.Eservice.getProductListByCompany(company_id).subscribe((data)=>{this.productList=data['bloodList'];},
													 error=>{
														this.msg="please try again";
												});
		
		
	}
	removeCartData(cart_id:any):void{
		
		this.Eservice.removeCartData(cart_id).subscribe((data)=>{
			
													if(data['Sucess']=='Remove Sucessfully')
													{
														this.readCartData();
														
													}
													
		},
													 error=>{
														this.msg="please try again";
												});
		
			
	
	}
	
	readCartData():void{
		
		
		this.Eservice.getTempCart(this.loginUserId).subscribe((data)=>{
			
									
				
										this.tempCart=data['bloodList']; 
				
									}, 
									error=>{
												this.msg="please try again";
											});

		
	}
	saveOrder(orderOwner:any):void{
		
		
			this.Eservice.saveOrder(orderOwner.value,this.loginUserId).subscribe((data)=>{
				
											if(data['Sucess']=='One Record sucessfully insereted.')
											{
														//this.readCartData();
														
														alert("Order Place ");
												this.readCartData();
												
														
											}
				
									}, 
									error=>{
												this.msg="please try again";
											});
		
		
	}

}
