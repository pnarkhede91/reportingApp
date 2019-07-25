import { Component,OnInit} from '@angular/core';
import { EmployeeService } from '../employees/employee.service';
//import { TestDirectiveDirective } from './test-directive.directive';
//import { IEmployee } from './IEmployee';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';

import { PagerService } from '../_services/index';
import { BsModalService } from 'ngx-bootstrap/modal';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-dwr',
  templateUrl: './dwr.component.html',
  styleUrls: ['./dwr.component.css']
})
export class DWRComponent implements OnInit {
	
	loginData:any;
	loginId:any;
	districtList:any;
	talukaList:any;
	placeList:any;
	cropList:any;
	tempFarmerRecord:any;
	selectedFarmer:any;
	pager: any = {};
	// paged items
    pagedItems: any[];
	
	allItems:any[];
	
	modalRef:any;
	msg:any;
	openTab:string='FARMER';

  constructor(private Eservice:EmployeeService,private route:ActivatedRoute,private pagerService: PagerService,private modalService: 	BsModalService) { }

  ngOnInit() {
	  
	  this.loginData = JSON.parse(localStorage.getItem('login_user'));
	  this.loginId=this.loginData["login_id"];
	  	
	  
	  		this.Eservice.getDistrictList().subscribe((data)=>{
		  														if(data['result']=='success')
																{
																	this.districtList=data['data']; 
																}
		  												},
												 error=>{
														this.msg="please try again";
												});
	  
	  
	  		this.Eservice.getCropList().subscribe((data)=>{
																if(data['result']=='success')
																{
																		this.cropList=data['data']; 
																}
		  												  },
												 		error=>{
														                 this.msg="please try again";
												         });
	  
	  this.farmerRecordEntryList();
	  
	  
	  
 	}
	
	addFarmerRecord(template1:any):any{
		
		let config = { backdrop: true, ignoreBackdropClick: true };
		
		this.modalRef = this.modalService.show(template1, config);
		
	}
	updateFarmerRecord(farmer:any,template:any):any{
		
		let config = { backdrop: true, ignoreBackdropClick: true };
		
		this.modalRef = this.modalService.show(template, config);
		
		this.selectedFarmer=farmer;
		
		this.changeDistrict(this.selectedFarmer.dt_id);
		this.changeTaluka(this.selectedFarmer.tt_id);
		
	}
	
	
	changeDistrict(dt_id:any):any{
		
		this.Eservice.getTalukaList(dt_id).subscribe((data)=>{
		  														if(data['result']=='success')
																{
																	this.talukaList=data['data']; 
																}
		  												},
												 error=>{
														this.msg="please try again";
												});
	}
	changeTaluka(tt_id:any):any{
		
		this.Eservice.getPlaceList(tt_id).subscribe((data)=>{
		  														if(data['result']=='success')
																{
																	this.placeList=data['data']; 
																}
		  												},
												 error=>{
														this.msg="please try again";
												});
	}
	
	farmerRecordEntry(data:any):any{
		
		console.log(data.value);
		
		this.Eservice.farmerRecordEntry(data.value,this.loginId).subscribe((data)=>{
			
		  														if(data['result']=='success')
																{
																	this.farmerRecordEntryList();
																}
		  												},
												 error=>{
														console.log('there was an error!');
												});
		
		//console.log(data);
	}
	keyPress(event: any) 
	{
		const pattern = /[0-9\+\-\ ]/;

		let inputChar = String.fromCharCode(event.charCode);
		if (event.keyCode != 8 && !pattern.test(inputChar)) {
		  event.preventDefault();
		
    	}
		
  	}
	
	farmerRecordEntryList():any{
		
		
		
		this.Eservice.farmerRecordEntryList(this.loginId).subscribe((data)=>{
			if(data['result']=='success')
			{
				this.tempFarmerRecord=data['data']; 
				console.log(this.tempFarmerRecord);
			}
		},
			error=>{
						this.msg="please try again";
					}
		);
		//console.log(data);
	}
	RemoveFarmerRecord(tempf_id:any):any{
		
		
		
		this.Eservice.RemoveFarmerRecord(tempf_id).subscribe((data)=>{
			if(data['result']=='success')
			{
				this.farmerRecordEntryList();
			}
		},
			error=>{
						this.msg="please try again";
					}
		);
		//console.log(data);
	}
	
	farmerRecordUpdate(data:any):any{
		
		console.log(data.value);
		
		this.Eservice.farmerRecordUpdate(data.value).subscribe((data)=>{
			if(data['result']=='success')
			{
				this.farmerRecordEntryList();
				this.modalRef.hide();
			}
		});
		
		//console.log(data);
	}
	
	openTabFunction(str:string):any{
		
		this.openTab=str;
	}
	submitFarmerData(report_date:any):any{
		
		alert("save successfully");
		
		this.Eservice.submitFarmerData(report_date,this.loginId).subscribe((data)=>{
			if(data['result']=='success')
			{
				alert("save successfully");
				//this.farmerRecordEntryList();
				//this.modalRef.hide();
			}
		});
		
	}
	
	
	
	
	

}
