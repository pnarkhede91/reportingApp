import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedInGuard } from './employees/login_check.service';
import { EmployeeService } from './employees/employee.service';
import { Observable } from 'rxjs/Rx';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',
			  './login.component.css'
			 ],
	providers:[EmployeeService]
})
export class AppComponent implements OnInit {
	
	loginStatus:any=false;
	mymodel:any=false;
	fullImagePath:string;
	isIn= false;  
	show:any = false;
	sideBarStatus:any=true;
	lastname:string="";
	loginData:string="";
	msg:string="";
	loginName:any;
	
	constructor(private _router:Router,private lgard:LoggedInGuard,private Eservice:EmployeeService) {
	
	}
	
	ngOnInit(){
		this.loginStatus=this.lgard.checkLogin();
		this.fullImagePath = '/assets/images';
		if(this.loginStatus==true)
		{
			this.loginData = JSON.parse(localStorage.getItem('login_user'));
			this.loginName=this.loginData["username"];
		}
	
		
	}
	
	
    toggleState() { // click handler
		
        let bool = this.isIn;
        this.isIn = bool === false ? true : false; 
    }
	
	toggleHome() { // click handler
         this.show = !this.show
    }
	logout():any
	{
		localStorage.clear();
		this.loginStatus=false;
		//this.nav.hide();
		//this._router.navigate(['login']);
		
	} 
	onSubmit(e:any){
		
		var username=e.target.elements[0].value;
		var password=e.target.elements[1].value;
		
		if(username !="" && password !="")
		{
			this.Eservice.checklogin(username,password).subscribe((data)=>{
				
					if(data['result']=='success')
					{
						this.loginData=data['Data'];
						localStorage.setItem('login_user',JSON.stringify(this.loginData));
						this.loginStatus=true;
						this.loginData = JSON.parse(localStorage.getItem('login_user'));
						this.loginName=this.loginData["username"];
						// this.LoginStatusChange.emit('true');
						//this.lGard.show();
					}
					else
					{
						this.lastname=data['message'];
					}
					
				},
					error=>{
								this.msg="please try again";
				});
				console.log(username+''+password);
		}
		else
			{
				this.lastname='Wrong Username And Password';
			}
	/*	
		if(username=='a' && password=="a")
		{
			this._router.navigate(['home']);
		}
		else
			{
				this.lastname='Wrong Username And Password';
			}
		*/
	}
	
 
}
