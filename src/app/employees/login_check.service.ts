import { Injectable } from '@angular/core';
import { IEmployee } from './IEmployee';
import { Http,Headers,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import {CanActivate, Router} from "@angular/router";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';

@Injectable()
export class LoggedInGuard implements CanActivate {
visible: any;
	appBaseUrl:string="http://localhost:4200/";
	constructor(private router:Router) 
	{
		
		if (localStorage.length > 0) 
		{
			this.visible=true;	
		}
		else
		{
			this.visible=false;
		}
		
	}
	
	hide() { this.visible = false; }
	show() { this.visible = true; }

  	canActivate() 
	{
	  
				  if (localStorage.length > 0) 
				  {
					  this.visible=true;
					  return true;
					  
				  }
				  else
				  {
						//this.router.navigate(['login']);
					 return true;
				  }
  
  	}
	
	checkLogin() 
	{
	  
				  if (localStorage.length > 0) 
				  {
					  return true;
				  }
				  else
				  {
						return false;
				  }
  
  	}
	

}
