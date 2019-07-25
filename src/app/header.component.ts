import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedInGuard } from './employees/login_check.service';
import { NgxPermissionsService } from 'ngx-permissions';


@Component({
  selector: 'header-menu',
  template: `<nav class="navbar navbar-inverse navbar-fixed-top" *ngIf="nav.visible">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" (click)="toggleState()">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button> <!-- #1 -->
            <a class="navbar-brand">Project Manager</a>
        </div>
         <div class="collapse navbar-collapse" [ngClass]="{ 'in': isIn }"> 
            <ul class="nav navbar-nav">

               	<li><a routerLink="home" >Home</a></li>
				<li   class="dropdown" dropdown *ngxPermissionsOnly="['ADMIN', 'GUEST1']"> <!-- {1} -->
               
                	<a dropdownToggle role="button"> <!-- {2} -->
                  		Master <span class="caret"></span></a>
                  
                  
						<ul *dropdownMenu class="dropdown-menu"> <!-- {3} -->

							<li><a routerLink="Customer">Customer</a></li>
							<li><a routerLink="staff">Staff</a></li>
							<li><a routerLink="shop">Shop Details</a></li>
							<li><a routerLink="company">Product Company</a></li>
							<li><a routerLink="product">Product</a></li>

						</ul>
                
                
            	</li>
				<li ><a routerLink="NewOrder" >New Order</a></li>
				<li ><a routerLink="ViewOrder" >Order List</a></li>

               
				
				<li ><a (click)="logout()">Logout</a></li>
            </ul>
        </div> <!-- #2 -->
    </div>
</nav>
<br><br><br><br>
`,
  styleUrls: ['./app.component.css']
})


          
           

            

			 

            

export class headerMenu implements OnInit {
	
	constructor(private _router:Router, public nav: LoggedInGuard,private permissionsService: NgxPermissionsService ) {}
	fullImagePath:string;

	ngOnInit(){
		this.fullImagePath = '/assets/images';
		 const perm = ["ADMIN", "EDITOR"];
 
    	this.permissionsService.loadPermissions(perm);
	}
	logout():any
	{
		localStorage.clear();
		this.nav.hide();
		this._router.navigate(['login']);
		
	} 
	isIn= false;   // store state
    toggleState() { // click handler
        let bool = this.isIn;
        this.isIn = bool === false ? true : false; 
    }
	
}
