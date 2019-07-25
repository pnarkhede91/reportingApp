import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { EmployeeService } from '../employees/employee.service';
import { IEmployee } from '../employees/IEmployee';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	
	loginData:any;
	loginName:string;
	i:any;
	f1:any=0;
	f2:any=0;
	isValid:boolean=false;
	imgFile:File;
	imgUrl:string="";
	employee:IEmployee={
		id:1,
		name:'ooooo'
	}
	

  constructor(private _router:Router,private route:ActivatedRoute,private Eservice:EmployeeService,private permissionsService: NgxPermissionsService) { 
  
  //alert(route.snapshot.params['id1']);
  
  
  }

  ngOnInit() {
	  
	 // console.log(this.employee);
	  
	  const perm = ["ADMIN", "EDITOR"];
 	  this.permissionsService.loadPermissions(perm);
	  
	  this.Eservice.getPermission().subscribe((data)=>{
		  
		//  console.log(data);
		  this.permissionsService.loadPermissions(data);
		  
		 
		  
		  this.permissionsService.removePermission('ADMIN');
		  
		  this.permissionsService.flushPermissions();
		  
		  var permissions = this.permissionsService.getPermissions();
		  
		 // 	console.log(permissions);
	  });
	  
	  
	  
 

	  
	 // this.loginData = JSON.parse(localStorage.getItem('login_user'));
	 //this.loginName=this.loginData[0]["user_name"];
	  this.i=50;
	  
  }
	txt:string="Home Panel";
//	myItem:any = localStorage.getItem(key);
	//console.log("okkkkkkkkkkkkkkkk"+txt);
	
	gotoemployee(id:number):void {
			
			
			this._router.navigate(['/employee/'+id]);
	}
	openFormOne(form:any,act:any)
	{
		if(form =='form1')
		{
			this.f1=1;
			this.f2=0;
		}
		else
		{
			this.f2=1;
			this.f1=0;
		}
		
	}
	uploadFile(data:any){


		console.log(data.value);

		
	
		var formData:FormData=new FormData();
		formData.append("imageFile",this.imgFile);
		formData.append("dt_id1",JSON.stringify(data.value));
		//formData.append("dt_id",data.value.dt_id.join());
		
		//console.log(formData);
		this.Eservice.uploadFile(formData).subscribe();
		
	
		
	}
	fileChanged(e: Event) {
    var target: HTMLInputElement = e.target as HTMLInputElement;
	
    for(var i=0;i < target.files.length; i++) {
        //this.upload(target.files[i]);
		this.imgFile=target.files[i];
    }
		
		 var reader = new FileReader();
   
    reader.readAsDataURL(this.imgFile); 
    reader.onload = (_event) => { 
    this.imgUrl=reader.result; 
    }
		}

}
