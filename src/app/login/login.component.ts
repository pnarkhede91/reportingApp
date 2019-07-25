import { Component, OnInit,Output,EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { Params } from '@angular/router';
import { EmployeeService } from '../employees/employee.service';
import { LoggedInGuard } from '../employees/login_check.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [EmployeeService]

})
export class LoginComponent implements OnInit {

  	constructor(private _router:Router,private Eservice:EmployeeService,private lGard:LoggedInGuard) { }
	//@Output() LoginStatusChange = new EventEmitter();

  
  	firstname:string="Prakash";
	lastname:string="";
	loginData:any;
	msg:any;

	ngOnInit(){
		
		

		if(this.lGard.checkLogin())
		{
			this._router.navigate(['home']);
			// this.LoginStatusChange.emit('true');
			this.lGard.show();
		}

	}
	
	onSubmit(e:any){
		
		var username=e.target.elements[0].value;
		var password=e.target.elements[1].value;
		
		if(username !="" && password !="")
		{
			this.Eservice.checklogin(username,password).subscribe((data)=>{

					if(data['result']=='Sucessfull')
					{
						this.loginData=data['data1'];
						localStorage.setItem('login_user', JSON.stringify(this.loginData));
						this._router.navigate(['home']);
						// this.LoginStatusChange.emit('true');
						this.lGard.show();
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
